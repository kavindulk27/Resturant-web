import { useEffect, useState } from 'react';
import { Eye, CheckCircle, XCircle, Clock, Truck, ChefHat, MoreVertical, ShoppingBag, Calendar, User, Phone, MapPin } from 'lucide-react';
import { useOrderStore, type OrderStatus } from '../../store/useOrderStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Orders() {
    const { orders, updateOrderStatus, fetchOrders } = useOrderStore();
    const [filter, setFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const STATUS_OPTIONS: { value: OrderStatus; label: string; icon: any; color: string }[] = [
        { value: 'pending', label: 'Pending', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-100' },
        { value: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'text-blue-600 bg-blue-50 border-blue-100' },
        { value: 'preparing', label: 'Preparing', icon: ChefHat, color: 'text-orange-600 bg-orange-50 border-orange-100' },
        { value: 'ready-for-pickup', label: 'Ready for Pickup', icon: ShoppingBag, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
        { value: 'out-for-delivery', label: 'Out for Delivery', icon: Truck, color: 'text-purple-600 bg-purple-50 border-purple-100' },
        { value: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
        { value: 'picked-up', label: 'Picked Up', icon: CheckCircle, color: 'text-teal-600 bg-teal-50 border-teal-100' },
        { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'text-rose-600 bg-rose-50 border-rose-100' },
    ];

    const filteredOrders = (orders || []).filter(o => {
        if (filter === 'All') return true;
        const statusValue = o?.status || '';
        return statusValue === filter.toLowerCase().replace(/ /g, '-');
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const item = {
        hidden: { y: 10, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Order Management</h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Real-time monitoring and processing of customer orders</p>
                </div>

                <div className="flex bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[24px] p-1.5 border border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-hide max-w-full w-full lg:w-auto">
                    {['All', 'Pending', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered', 'Cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2.5 rounded-[18px] text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${filter === f
                                ? 'bg-slate-900 dark:bg-orange-500 text-white shadow-lg shadow-slate-900/20'
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Table Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/30 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="px-10 py-6">Order ID & Timing</th>
                                <th className="px-10 py-6">Customer Profile</th>
                                <th className="px-10 py-6">Revenue</th>
                                <th className="px-10 py-6">Progress Status</th>
                                <th className="px-10 py-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="divide-y divide-slate-50 dark:divide-slate-800"
                        >
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-10 py-32 text-center text-slate-300">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center">
                                                <ShoppingBag size={48} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-slate-800 font-black uppercase tracking-widest text-sm">No Active Orders</p>
                                                <p className="text-slate-400 text-xs font-medium italic">Orders in this category will appear here</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                (filteredOrders || []).filter(o => o && o.id).map((order) => (
                                    <motion.tr
                                        key={order.id}
                                        variants={item}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-300 group"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col gap-2">
                                                <span className="font-black text-slate-800 dark:text-white group-hover:text-orange-500 transition-colors">
                                                    #ORD-{order.id ? order.id.slice(-6).toUpperCase() : 'UNKNOWN'}
                                                </span>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <Calendar size={12} className="text-orange-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-tighter">
                                                            {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <Clock size={12} className="text-blue-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-tighter">
                                                            {order?.createdAt ? new Date(order.createdAt).toLocaleTimeString() : 'N/A'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[1px] border ${order.deliveryMethod === 'pickup'
                                                        ? 'bg-sky-50 text-sky-600 border-sky-100'
                                                        : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                        }`}>
                                                        {order.deliveryMethod === 'pickup' ? <ShoppingBag size={10} className="mr-1.5" /> : <Truck size={10} className="mr-1.5" />}
                                                        {order?.deliveryMethod || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 shadow-sm border border-white dark:border-slate-700 group-hover:scale-110 transition-transform">
                                                        <User size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-slate-800 dark:text-white text-sm uppercase tracking-tight leading-none mb-1">{order?.customerName || 'Unknown Customer'}</span>
                                                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                                                            <Phone size={10} className="text-slate-300 dark:text-slate-600" />
                                                            <span className="text-[10px] font-bold tracking-widest">{order?.phone || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {order?.deliveryMethod === 'delivery' && (
                                                    <div className="pl-1 text-[10px] font-medium text-slate-400 flex items-start gap-2 max-w-[200px]">
                                                        <MapPin size={12} className="text-orange-500 mt-0.5 shrink-0" />
                                                        <span className="line-clamp-2 leading-relaxed italic">"{order?.address || 'No address provided'}"</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-3xl w-fit group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors border border-transparent group-hover:border-slate-100 dark:group-hover:border-slate-600">
                                                <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 leading-none">Total Value</div>
                                                <span className="font-black text-slate-900 dark:text-white text-xl tracking-tighter">${(order?.total || 0).toFixed(2)}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="relative">
                                                <button
                                                    onClick={() => {
                                                        const id = order?.id;
                                                        if (id) setSelectedOrder(selectedOrder === id ? null : id);
                                                    }}
                                                    className={`group/status px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between gap-4 transition-all w-full min-w-[180px] border-2 ${STATUS_OPTIONS.find(s => s.value === order?.status)?.color || 'bg-slate-50 text-slate-600 border-slate-100'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {(() => {
                                                            const iconConfig = STATUS_OPTIONS.find(s => s.value === order?.status);
                                                            const Icon = iconConfig?.icon || Clock;
                                                            return <Icon size={14} />;
                                                        })()}
                                                        <span>{(order?.status || 'pending').replace(/-/g, ' ')}</span>
                                                    </div>
                                                    <MoreVertical size={16} className="opacity-40 group-hover/status:opacity-100 transition-opacity" />
                                                </button>

                                                <AnimatePresence>
                                                    {selectedOrder === order.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                            className="absolute z-50 mt-3 right-0 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] dark:shadow-none border border-slate-100 dark:border-slate-800 p-2 overflow-hidden"
                                                        >
                                                            <div className="px-4 py-2 text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[2px] mb-1">Update Transition</div>
                                                            {STATUS_OPTIONS.filter(option => {
                                                                const common = ['pending', 'confirmed', 'preparing', 'cancelled'];
                                                                if (common.includes(option.value)) return true;
                                                                if (order.deliveryMethod === 'pickup') {
                                                                    return ['ready-for-pickup', 'picked-up'].includes(option.value);
                                                                } else {
                                                                    return ['out-for-delivery', 'delivered'].includes(option.value);
                                                                }
                                                            }).map((status) => (
                                                                <button
                                                                    key={status.value}
                                                                    onClick={() => {
                                                                        updateOrderStatus(order.id, status.value);
                                                                        setSelectedOrder(null);
                                                                    }}
                                                                    className="w-full flex items-center justify-between px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-orange-500 rounded-xl transition-all"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <status.icon size={16} className="opacity-70" />
                                                                        {status.label}
                                                                    </div>
                                                                    {order.status === status.value && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />}
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <button className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-white hover:bg-slate-900 dark:hover:bg-orange-500 rounded-2xl transition-all shadow-sm active:scale-90 ml-auto group/eye">
                                                <Eye size={20} className="group-hover/eye:scale-125 transition-transform" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            {/* Real-time Indicator */}
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-[3px]">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Order Stream Active</span>
            </div>
        </div>
    );
}
