from django.db import models

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('preparing', 'Preparing'),
        ('out-for-delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('ready-for-pickup', 'Ready for Pickup'),
        ('picked-up', 'Picked Up'),
    ]

    METHODS = [
        ('delivery', 'Delivery'),
        ('pickup', 'Pickup'),
    ]

    PAYMENT = [
        ('cash', 'Cash'),
        ('card', 'Card'),
    ]

    customer_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)
    delivery_method = models.CharField(max_length=20, choices=METHODS)
    payment_method = models.CharField(max_length=20, choices=PAYMENT)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    estimated_arrival = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    image = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return f"{self.quantity}x {self.name} (Order #{self.order.id})"
