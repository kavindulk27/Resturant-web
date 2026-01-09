import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function Orders() {
    const [filter, setFilter] = useState('All');

    const orders = [
        { id: 'ORD-12345', customer: 'John Doe', items: 'Spicy Chicken Burger x2, Coke x2', total: 35.98, status: 'Pending', time: '10:30 AM' },
        { id: 'ORD-12346', customer: 'Sarah Smith', items: 'Margherita Pizza x1', total: 14.99, status: 'Preparing', time: '10:45 AM' },
        { id: 'ORD-12347', customer: 'Mike Johnson', items: 'Pasta Carbonara x2', total: 33.98, status: 'Completed', time: '09:15 AM' },
        { id: 'ORD-12348', customer: 'Emily Davis', items: 'Iced Coffee x1, Cheese Cake x1', total: 11.98, status: 'Cancelled', time: '11:00 AM' },
    ];

    const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                <div className="flex bg-white rounded-lg p-1 border border-gray-200">
                    {['All', 'Pending', 'Preparing', 'Completed', 'Cancelled'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === f ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-900">{order.customer}</td>
                                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{order.items}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                                                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                                    order.status === 'Preparing' ? 'bg-blue-100 text-blue-600' :
                                                        'bg-red-100 text-red-600'
                                            }`}>
                                            {order.status === 'Completed' && <CheckCircle size={12} />}
                                            {order.status === 'Pending' && <Clock size={12} />}
                                            {order.status === 'Preparing' && <Clock size={12} />}
                                            {order.status === 'Cancelled' && <XCircle size={12} />}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">{order.time}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
