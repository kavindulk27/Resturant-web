import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { motion } from 'framer-motion';
import { Truck, Store, CreditCard, Wallet, Loader2 } from 'lucide-react';

type CheckoutForm = {
    name: string;
    phone: string;
    deliveryMethod: 'delivery' | 'pickup';
    address: string;
    paymentMethod: 'cash' | 'card';
};

export default function Checkout() {
    const { items, getTotal, clearCart } = useCartStore();
    const navigate = useNavigate();
    const subtotal = getTotal();
    const [isProcessing, setIsProcessing] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CheckoutForm>({
        defaultValues: {
            deliveryMethod: 'delivery',
            paymentMethod: 'cash',
        },
    });

    const deliveryMethod = watch('deliveryMethod');
    const deliveryFee = deliveryMethod === 'delivery' ? 5 : 0;
    const total = subtotal + deliveryFee;

    const onSubmit = async (data: CheckoutForm) => {
        setIsProcessing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API

        console.log('Order placed:', { ...data, items, subtotal, deliveryFee, total });
        clearCart();
        navigate('/order-success');
    };

    if (items.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950 py-16 px-6">
            {/* Hero Header */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                    Complete Your Order
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-600 dark:text-gray-400"
                >
                    Just a few details and your delicious meal will be on its way
                </motion.p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Personal Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        {...register('name', { required: 'Name is required' })}
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 dark:text-white"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        {...register('phone', { required: 'Phone is required' })}
                                        type="tel"
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-900 dark:text-white"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                    {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone.message}</p>}
                                </div>
                            </div>
                        </motion.div>

                        {/* Delivery Method */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Delivery Method</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label
                                    className={`relative cursor-pointer rounded-3xl p-8 border-4 transition-all duration-300 ${
                                        deliveryMethod === 'delivery'
                                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 shadow-xl'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                >
                                    <input type="radio" value="delivery" {...register('deliveryMethod')} className="sr-only" />
                                    <div className="flex flex-col items-center text-center">
                                        <Truck size={48} className="text-orange-600 mb-4" />
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">Delivery</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">$5.00 fee • 30-45 min</span>
                                    </div>
                                </label>

                                <label
                                    className={`relative cursor-pointer rounded-3xl p-8 border-4 transition-all duration-300 ${
                                        deliveryMethod === 'pickup'
                                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 shadow-xl'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                                >
                                    <input type="radio" value="pickup" {...register('deliveryMethod')} className="sr-only" />
                                    <div className="flex flex-col items-center text-center">
                                        <Store size={48} className="text-orange-600 mb-4" />
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">Pickup</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">Free • Ready in 20 min</span>
                                    </div>
                                </label>
                            </div>

                            {deliveryMethod === 'delivery' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8"
                                >
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Delivery Address
                                    </label>
                                    <textarea
                                        {...register('address', { required: 'Address is required for delivery' })}
                                        rows={4}
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none text-gray-900 dark:text-white"
                                        placeholder="123 Food Street, Apt 4B, New York, NY 10001"
                                    />
                                    {errors.address && <p className="mt-2 text-sm text-red-500">{errors.address.message}</p>}
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Payment Method */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2>
                            <div className="space-y-4">
                                <label className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500/50 cursor-pointer transition-all">
                                    <input type="radio" value="cash" {...register('paymentMethod')} className="w-6 h-6 text-orange-600" />
                                    <Wallet size={32} className="text-green-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">Cash on Delivery</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Pay with cash when your order arrives</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500/50 cursor-pointer transition-all">
                                    <input type="radio" value="card" {...register('paymentMethod')} className="w-6 h-6 text-orange-600" />
                                    <CreditCard size={32} className="text-blue-600" />
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">Credit / Debit Card</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Secure payment powered by Stripe</p>
                                    </div>
                                </label>
                            </div>
                        </motion.div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl shadow-2xl text-white p-8 sticky top-24"
                        >
                            <h3 className="text-3xl font-extrabold mb-8">Order Summary</h3>

                            <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-white/20 last:border-0">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">
                                                {item.quantity}x
                                            </div>
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-white/30">
                                <div className="flex justify-between text-lg">
                                    <span className="opacity-90">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg">
                                    <span className="opacity-90">Delivery Fee</span>
                                    <span>${deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="pt-6 border-t border-white/30">
                                    <div className="flex justify-between text-3xl font-extrabold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full mt-10 py-6 bg-white text-gray-900 font-bold text-xl rounded-2xl shadow-2xl hover:shadow-inner transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 group"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={28} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Place Order
                                        <CreditCard className="group-hover:translate-x-1 transition-transform" size={28} />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </form>
        </div>
    );
}