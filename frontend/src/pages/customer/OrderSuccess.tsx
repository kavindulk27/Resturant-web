import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight, Truck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useOrderStore } from '../../store/useOrderStore';

export default function OrderSuccess() {
    const { orders, activeOrderId } = useOrderStore();
    const order = orders.find(o => o.id === activeOrderId) || orders[0];
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f97316', '#ef4444', '#ffffff']
        });

        // Show cleanup popup after delay
        const timer = setTimeout(() => setShowPopup(true), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center p-6 text-center">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
            </div>

            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-orange-500/20 border border-gray-100 dark:border-gray-800 p-8 md:p-12 max-w-2xl w-full relative z-10"
                    >
                        {/* Status Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                            className="w-24 h-24 bg-gradient-to-tr from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
                        >
                            <CheckCircle size={48} className="text-white" />
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            Thank You!
                        </h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                            Your order has been placed successfully and is being prepared by our chefs.
                        </p>

                        {/* Order Number Badge */}
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-2xl mb-12">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Order ID:</span>
                            <span className="text-lg font-black text-orange-600">{order?.id || '#ORD-00000'}</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-12">
                            {[
                                { label: 'Time', val: order?.estimatedArrival || '25 min', color: 'text-blue-500' },
                                { label: 'Reward', val: '+50 pts', color: 'text-green-500' },
                                { label: 'Status', val: order?.status.replace(/-/g, ' ') || 'Preparing', color: 'text-orange-500' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</p>
                                    <p className={`font-black ${stat.color}`}>{stat.val}</p>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link
                                to="/track-order"
                                className="flex-1 px-8 py-5 bg-orange-500 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 group"
                            >
                                <Truck size={24} />
                                Track Order
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/"
                                className="flex-1 px-8 py-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-700 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                <ShoppingBag size={24} />
                                Home
                            </Link>
                        </div>

                        {/* Rating Teaser */}
                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-4">
                            <span className="text-sm font-bold text-gray-400">Rate your experience</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={20} className="text-orange-200 hover:text-orange-400 cursor-pointer transition-colors" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
