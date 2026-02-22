import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from orders.models import Order
from .models import Payment

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreatePaymentIntentView(APIView):
    def post(self, request, *args, **kwargs):
        order_id = request.data.get('order_id')
        try:
            order = Order.objects.get(id=order_id)
            
            intent = stripe.PaymentIntent.create(
                amount=int(order.total * 100),
                currency='usd',
                metadata={'order_id': order.id}
            )

            # Update or create Payment record
            payment, created = Payment.objects.update_or_create(
                order=order,
                defaults={
                    'stripe_session_id': intent.id, # We reuse this field for intent ID
                    'amount': order.total,
                    'status': 'pending'
                }
            )

            return Response({
                'clientSecret': intent.client_secret
            }, status=status.HTTP_201_CREATED)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class StripeWebhookView(APIView):
    def post(self, request, *args, **kwargs):
        payload = request.body
        sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
        event = None

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except ValueError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if event['type'] == 'checkout.session.completed':
            session = event['data']['object']
            order_id = session.get('metadata').get('order_id')
            
            try:
                payment = Payment.objects.get(stripe_session_id=session.id)
                payment.status = 'completed'
                payment.save()
                
                order = Order.objects.get(id=order_id)
                order.status = 'confirmed' # Or whatever status signifies payment success
                order.save()
            except (Payment.DoesNotExist, Order.DoesNotExist):
                pass

        return Response(status=status.HTTP_200_OK)
