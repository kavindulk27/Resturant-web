import { Trash2, Plus, Minus, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { motion } from 'framer-motion';

export default function Cart() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();
    const navigate = useNavigate();
    const subtotal = getTotal();
    const deliveryFee = 5.0;
    const total = subtotal + deliveryFee;

    // Empty Cart State
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-md"
                >
                    <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center shadow-xl">
                        <ShoppingBag size={56} className="text-orange-600" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Your cart is empty
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
                        Discover delicious meals waiting just for you!
                    </p>
                    <Link
                        to="/menu"
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300"
                    >
                        Browse Menu
                        <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={22} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950 py-16 px-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4"
                >
                    Your Cart
                </motion.h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    {items.length} {items.length === 1 ? 'item' : 'items'} ready for checkout
                </p>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex items-center gap-6 p-6">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-28 h-28 object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 rounded-2xl ring-2 ring-orange-500/20 ring-inset opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-2xl font-extrabold text-orange-600">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="p-2 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                                            >
                                                <Minus size={18} className="text-gray-700 dark:text-gray-300" />
                                            </button>
                                            <span className="font-bold text-lg w-10 text-center text-gray-900 dark:text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                                            >
                                                <Plus size={18} className="text-gray-700 dark:text-gray-300" />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-3 rounded-xl text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
                                        >
                                            <Trash2 size={22} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl shadow-2xl text-white p-8 sticky top-24"
                        >
                            <h3 className="text-3xl font-extrabold mb-8">Order Summary</h3>

                            <div className="space-y-5 mb-8 text-lg">
                                <div className="flex justify-between">
                                    <span className="opacity-90">Subtotal</span>
                                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-90">Delivery Fee</span>
                                    <span className="font-bold">${deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="pt-6 border-t border-white/20">
                                    <div className="flex justify-between text-2xl font-extrabold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full py-5 bg-white text-gray-900 font-bold text-xl rounded-2xl shadow-xl hover:shadow-inner transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                            >
                                Proceed to Checkout
                                <CreditCard size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <Link
                                to="/menu"
                                className="block text-center mt-6 text-white/80 hover:text-white font-medium text-lg flex items-center justify-center gap-2 group"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                Continue Shopping
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}