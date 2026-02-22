import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Store, CreditCard, Wallet, Loader2, ChevronRight, ChevronLeft, MapPin, Phone, User, CheckCircle2, Info } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import api from '../../api/axios';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_placeholder');

type CheckoutForm = {
    name: string;
    phone: string;
    deliveryMethod: 'delivery' | 'pickup';
    address: string;
    paymentMethod: 'cash' | 'card';
    cardNumber?: string;
    cardExpiry?: string;
    cardCVC?: string;
    cardName?: string;
    location?: { lat: number; lng: number };
};

const STEPS = [
    { id: 'method', title: 'Service', icon: Truck },
    { id: 'details', title: 'Details', icon: User },
    { id: 'payment', title: 'Payment', icon: CreditCard },
];

function CheckoutContent() {
    const { items, getTotal, clearCart } = useCartStore();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const subtotal = getTotal();
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setValue,
        formState: { errors },
    } = useForm<CheckoutForm>({
        defaultValues: {
            deliveryMethod: 'delivery',
            paymentMethod: 'cash',
        },
    });

    const [showMap, setShowMap] = useState(false);
    const orderLocation = watch('location');

    const deliveryMethod = watch('deliveryMethod');
    const paymentMethod = watch('paymentMethod');
    const total = subtotal;

    const nextStep = async () => {
        let fieldsToValidate: (keyof CheckoutForm)[] = [];
        if (currentStep === 0) fieldsToValidate = ['deliveryMethod'];
        if (currentStep === 1) {
            fieldsToValidate = ['name', 'phone'];
            if (deliveryMethod === 'delivery') fieldsToValidate.push('address');
        }

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = async (data: CheckoutForm) => {
        if (currentStep < STEPS.length - 1) {
            nextStep();
            return;
        }
        setIsProcessing(true);

        try {
            // 1. Create Order in Backend
            const orderResponse = await api.post('orders/', {
                customer_name: data.name,
                phone: data.phone,
                address: data.deliveryMethod === 'delivery' ? data.address : 'Store Pickup',
                delivery_method: data.deliveryMethod,
                payment_method: data.paymentMethod,
                subtotal: subtotal,
                delivery_fee: 0,
                total: total,
            });

            const createdOrderId = orderResponse.data.id;

            if (data.paymentMethod === 'card') {
                if (!stripe || !elements) return;

                // 2. Create Payment Intent
                const intentResponse = await api.post('payments/create-intent/', {
                    order_id: createdOrderId
                });

                const clientSecret = intentResponse.data.clientSecret;

                // 3. Confirm Payment
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement)!,
                        billing_details: {
                            name: data.name,
                            phone: data.phone,
                        },
                    },
                });

                if (result.error) {
                    alert(result.error.message);
                    setIsProcessing(false);
                    return;
                }
            }

            // 4. Success
            clearCart();
            navigate('/order-success');
        } catch (error: any) {
            console.error('Checkout error:', error);
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <Link to="/menu" className="text-orange-500 hover:underline">Back to Menu</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 -z-10" />
                        <div
                            className="absolute top-1/2 left-0 h-0.5 bg-orange-500 -translate-y-1/2 -z-10 transition-all duration-500"
                            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                        />
                        {STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            const isActive = idx <= currentStep;
                            const isCurrent = idx === currentStep;
                            return (
                                <div key={step.id} className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCurrent ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110' :
                                        isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                                        }`}>
                                        <Icon size={20} />
                                    </div>
                                    <span className={`mt-2 text-sm font-bold ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {currentStep === 0 && (
                                    <motion.div
                                        key="step0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800"
                                    >
                                        <h2 className="text-2xl font-bold mb-6">How would you like your food?</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { id: 'delivery' as const, icon: Truck, label: 'Delivery', desc: 'Free • 30-45 min' },
                                                { id: 'pickup' as const, icon: Store, label: 'Pickup', desc: 'Free • Ready in 20 min' }
                                            ].map((method) => (
                                                <label
                                                    key={method.id}
                                                    className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${deliveryMethod === method.id
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                                                        : 'border-gray-100 dark:border-gray-800 hover:border-orange-200'
                                                        }`}
                                                >
                                                    <input type="radio" value={method.id} {...register('deliveryMethod')} className="sr-only" />
                                                    <method.icon size={32} className={deliveryMethod === method.id ? 'text-orange-500' : 'text-gray-400'} />
                                                    <p className="mt-4 font-bold text-lg">{method.label}</p>
                                                    <p className="text-sm text-gray-500">{method.id === 'delivery' ? method.desc : 'Ready in 20 min'}</p>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold mb-2">{deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'} Details</h2>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        {...register('name', { required: 'Name is required' })}
                                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        {...register('phone', { required: 'Phone is required' })}
                                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                </div>
                                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                            </div>
                                            {deliveryMethod === 'delivery' && (
                                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                                                        <textarea
                                                            {...register('address', { required: 'Address is required for delivery' })}
                                                            rows={3}
                                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500"
                                                            placeholder="Enter your full street address..."
                                                        />
                                                    </div>
                                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 space-y-6"
                                    >
                                        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                                        <div className="space-y-4">
                                            {[
                                                { id: 'cash' as const, icon: Wallet, label: 'Cash on Delivery', desc: 'Pay when food arrives' },
                                                { id: 'card' as const, icon: CreditCard, label: 'Credit / Debit Card', desc: 'Secure online payment' }
                                            ].map((method) => (
                                                <label
                                                    key={method.id}
                                                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === method.id
                                                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/10'
                                                        : 'border-gray-100 dark:border-gray-800'
                                                        }`}
                                                >
                                                    <input type="radio" value={method.id} {...register('paymentMethod')} className="sr-only" />
                                                    <div className={`p-3 rounded-xl ${paymentMethod === method.id ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                                        <method.icon size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold">{method.label}</p>
                                                        <p className="text-xs text-gray-500">{method.desc}</p>
                                                    </div>
                                                    {paymentMethod === method.id && <CheckCircle2 className="text-orange-500" size={24} />}
                                                </label>
                                            ))}

                                            {paymentMethod === 'card' && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4"
                                                >
                                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Card Details</label>
                                                    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                                                        <CardElement
                                                            options={{
                                                                style: {
                                                                    base: {
                                                                        fontSize: '16px',
                                                                        color: '#32325d',
                                                                        '::placeholder': { color: '#aab7c4' },
                                                                    },
                                                                    invalid: { color: '#fa755a' },
                                                                },
                                                            }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex gap-4 pt-4">
                                {currentStep > 0 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 py-4 px-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 font-bold flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all"
                                    >
                                        <ChevronLeft size={20} /> Back
                                    </button>
                                )}
                                {currentStep < STEPS.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-[2] py-4 px-6 rounded-2xl bg-orange-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30"
                                    >
                                        Continue <ChevronRight size={20} />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="flex-[2] py-4 px-6 rounded-2xl bg-orange-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50"
                                    >
                                        {isProcessing ? <Loader2 className="animate-spin" /> : 'Confirm Order'}
                                        {!isProcessing && <CheckCircle2 size={20} />}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                                            <div>
                                                <p className="text-sm font-bold truncate w-24">{item.name}</p>
                                                <p className="text-xs text-gray-500">{item.quantity}x</p>
                                            </div>
                                        </div>
                                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-500">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500">
                                    <span>{deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                                    <span className="text-green-500 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-extrabold pt-2">
                                    <span>Total</span>
                                    <span className="text-orange-500">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showMap && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Checkout() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutContent />
        </Elements>
    );
}