import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Clock, Truck, ChefHat, MoreVertical, ShoppingBag } from 'lucide-react';
import { useOrderStore, type OrderStatus } from '../../store/useOrderStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Orders() {
    const { orders, updateOrderStatus } = useOrderStore();
    const [filter, setFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

    const STATUS_OPTIONS: { value: OrderStatus; label: string; icon: any; color: string }[] = [
        { value: 'pending', label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-100' },
        { value: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'text-blue-600 bg-blue-100' },
        { value: 'preparing', label: 'Preparing', icon: ChefHat, color: 'text-orange-600 bg-orange-100' },
        { value: 'ready-for-pickup', label: 'Ready for Pickup', icon: ShoppingBag, color: 'text-indigo-600 bg-indigo-100' },
        { value: 'out-for-delivery', label: 'Out for Delivery', icon: Truck, color: 'text-purple-600 bg-purple-100' },
        { value: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
        { value: 'picked-up', label: 'Picked Up', icon: CheckCircle, color: 'text-teal-600 bg-teal-100' },
        { value: 'cancelled', label: 'Cancelled', icon: XCircle, color: 'text-red-600 bg-red-100' },
    ];

    const filteredOrders = filter === 'All'
        ? orders
        : orders.filter(o => o.status === filter.toLowerCase().replace(/ /g, '-'));

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">Order Management</h1>
                <div className="flex bg-white shadow-sm rounded-2xl p-1 border border-gray-100 overflow-x-auto scrollbar-hide max-w-full w-full md:w-auto">
                    {['All', 'Pending', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered', 'Picked Up', 'Cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${filter === f ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-gray-50/50 text-gray-400 font-bold text-xs uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Order</th>
                                <th className="px-8 py-5">Customer</th>
                                <th className="px-8 py-5">Value</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-gray-400 font-medium">
                                        No orders found in this category
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-black text-gray-900">{order.id}</span>
                                                <span className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleTimeString()}</span>
                                                <div className="mt-1">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${order.deliveryMethod === 'pickup'
                                                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                                                        : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                                        }`}>
                                                        {order.deliveryMethod}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col text-sm">
                                                <span className="font-bold text-gray-900">{order.customerName}</span>
                                                <span className="text-gray-500">{order.phone}</span>
                                                {order.deliveryMethod === 'delivery' && (
                                                    <span className="text-[10px] text-gray-400 truncate max-w-[150px]" title={order.address}>
                                                        {order.address}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-black text-orange-600 text-sm">${order.total.toFixed(2)}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all ${STATUS_OPTIONS.find(s => s.value === order.status)?.color || 'bg-gray-100 text-gray-600'
                                                        }`}
                                                >
                                                    {order.status.replace(/-/g, ' ')}
                                                    <MoreVertical size={14} />
                                                </button>

                                                <AnimatePresence>
                                                    {selectedOrder === order.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
                                                            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
                                                            exit={{ opacity: 0, scale: 0.95, y: 10, x: '-50%' }}
                                                            className="absolute z-50 mt-2 left-1/2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2"
                                                        >
                                                            {STATUS_OPTIONS.filter(option => {
                                                                // Always allow common statuses
                                                                const common = ['pending', 'confirmed', 'preparing', 'cancelled'];
                                                                if (common.includes(option.value)) return true;

                                                                // Filter by delivery method
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
                                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                                                                >
                                                                    <status.icon size={16} />
                                                                    {status.label}
                                                                </button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-3 bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-2xl transition-all">
                                                <Eye size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
