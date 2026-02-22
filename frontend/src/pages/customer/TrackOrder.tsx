import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Check, Clock, MapPin, Phone, ChefHat,
    Truck, ChevronLeft,
    Timer, AlertCircle, ShoppingBag, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrderStore, type OrderStatus } from '../../store/useOrderStore';

export default function TrackOrder() {
    const { orders, activeOrderId, fetchOrders, isLoading } = useOrderStore();

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-6">
                <Loader2 className="animate-spin text-orange-500" size={48} />
            </div>
        );
    }
    const order = orders.find(o => o.id === activeOrderId) || orders[0];

    const DELIVERY_STAGES: { id: OrderStatus; label: string; icon: any; color: string; desc: string }[] = [
        { id: 'pending', label: 'Order Received', icon: Clock, color: 'bg-blue-500', desc: 'We have received your order' },
        { id: 'confirmed', label: 'Confirmed', icon: Check, color: 'bg-indigo-500', desc: 'Kitchen has accepted your order' },
        { id: 'preparing', label: 'In the Kitchen', icon: ChefHat, color: 'bg-orange-500', desc: 'Our chefs are cooking your meal' },
        { id: 'out-for-delivery', label: 'Heading Your Way', icon: Truck, color: 'bg-purple-500', desc: 'Driver is on the way' },
        { id: 'delivered', label: 'Delivered', icon: Check, color: 'bg-green-500', desc: 'Enjoy your meal!' },
    ];

    const PICKUP_STAGES: { id: OrderStatus; label: string; icon: any; color: string; desc: string }[] = [
        { id: 'pending', label: 'Order Received', icon: Clock, color: 'bg-blue-500', desc: 'We have received your order' },
        { id: 'confirmed', label: 'Confirmed', icon: Check, color: 'bg-indigo-500', desc: 'Kitchen has accepted your order' },
        { id: 'preparing', label: 'In the Kitchen', icon: ChefHat, color: 'bg-orange-500', desc: 'Our chefs are cooking your meal' },
        { id: 'ready-for-pickup', label: 'Ready for Pickup', icon: ShoppingBag, color: 'bg-teal-500', desc: 'Your order is ready at the counter' },
        { id: 'picked-up', label: 'Picked Up', icon: Check, color: 'bg-green-500', desc: 'Thank you for dining with us!' },
    ];

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-400">
                        <AlertCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-bold">No Active Order</h2>
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                    <Link to="/menu" className="inline-block px-8 py-3 bg-orange-500 text-white rounded-xl font-bold">Browse Menu</Link>
                </div>
            </div>
        );
    }

    const isPickup = order.deliveryMethod === 'pickup';
    const stages = isPickup ? PICKUP_STAGES : DELIVERY_STAGES;
    const currentStageIndex = stages.findIndex(s => s.id === order.status);
    const progress = Math.max(0, ((currentStageIndex + 1) / stages.length) * 100);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:scale-110 transition-transform">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Track Order</h1>
                        <p className="text-gray-500 dark:text-gray-400">Order ID: #{order.id}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Tracking View */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden relative">
                            {/* Visual Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                                        {isPickup ? 'Estimated Readiness' : 'Estimated Arrival'}
                                    </p>
                                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
                                        {order.estimatedArrival || 'TBD'}
                                    </h2>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase mt-3 ${isPickup ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {isPickup ? <ShoppingBag size={14} /> : <Truck size={14} />}
                                        {isPickup ? 'Pickup Order' : 'Delivery Order'}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full">
                                    <Timer className="text-orange-500 animate-pulse" size={32} />
                                </div>
                            </div>

                            {/* Progress Bar Container */}
                            <div className="relative h-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-12 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-red-500"
                                />
                            </div>

                            {/* Timeline */}
                            <div className="space-y-8 relative">
                                <div className="absolute left-[1.65rem] top-4 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-800" />
                                {stages.map((stage, idx) => {
                                    const isActive = idx <= currentStageIndex;
                                    const isCurrent = idx === currentStageIndex;
                                    const Icon = stage.icon;

                                    return (
                                        <div key={stage.id} className="flex gap-6 items-start relative z-10 group">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white dark:border-gray-900 ${isCurrent ? `${stage.color} text-white shadow-xl scale-110` :
                                                isActive ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600'
                                                }`}>
                                                {isActive && !isCurrent ? <Check size={24} strokeWidth={3} /> : <Icon size={24} className={isCurrent ? 'animate-pulse' : ''} />}
                                            </div>
                                            <div className={`flex-1 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                                <h3 className={`font-bold text-lg mb-1 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                                                    {stage.label}
                                                </h3>
                                                <p className="text-sm text-gray-500 font-medium">{stage.desc}</p>
                                            </div>
                                            {isCurrent && (
                                                <motion.div
                                                    layoutId="active-indicator"
                                                    className="absolute -right-2 top-4 px-3 py-1 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/30"
                                                >
                                                    Current Status
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Order Details Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Delivery/Pickup Info */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-black mb-6 text-gray-900 dark:text-white">
                                {isPickup ? 'Pickup Details' : 'Delivery Details'}
                            </h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin className="text-orange-500" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                                            {isPickup ? 'Pickup Location' : 'Delivery Address'}
                                        </p>
                                        <p className="font-bold text-sm text-gray-900 dark:text-white">
                                            {isPickup ? '123 Restaurant Street, City Center' : order.address}
                                        </p>
                                        {!isPickup && order.location && typeof order.location.lat === 'number' && typeof order.location.lng === 'number' && (
                                            <p className="text-[10px] text-orange-500 font-bold mt-1">
                                                Pinned: {order.location.lat.toFixed(4)}, {order.location.lng.toFixed(4)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-4 border-t border-gray-50 dark:border-gray-800 pt-6">
                                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shrink-0">
                                        <Phone className="text-blue-500" size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Contact Info</p>
                                        <p className="font-bold text-sm text-gray-900 dark:text-white">{order.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Summary */}
                        <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 shadow-xl border border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-black mb-4 text-gray-900 dark:text-white">Order Summary</h3>
                            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                                {order.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center rounded-lg text-xs font-bold">
                                                {item.quantity}x
                                            </span>
                                            <span className="font-semibold text-gray-900 dark:text-white">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white">
                                            ${(parseFloat(item.price as any || 0) * (item.quantity || 0)).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-100 dark:border-gray-800 mt-4 pt-4 flex justify-between items-center">
                                <span className="font-bold text-gray-500">Total Amount</span>
                                <span className="text-xl font-black text-orange-600">
                                    ${parseFloat(order.total as any || 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
