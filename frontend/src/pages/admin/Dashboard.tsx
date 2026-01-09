import { DollarSign, ShoppingBag, Users, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { title: 'Total Sales', value: '$12,345', icon: DollarSign, trend: '+12%', color: 'bg-green-100 text-green-600' },
        { title: 'Total Orders', value: '156', icon: ShoppingBag, trend: '+5%', color: 'bg-blue-100 text-blue-600' },
        { title: 'Active Customers', value: '2,345', icon: Users, trend: '+18%', color: 'bg-orange-100 text-orange-600' },
        { title: 'Low Stock Items', value: '4', icon: AlertTriangle, trend: '-2', color: 'bg-red-100 text-red-600' },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                        <button className="text-sm text-orange-600 font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-500">
                                        #{1000 + i}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Customer Name</p>
                                        <p className="text-xs text-gray-500">2 items • $24.00</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                                    Completed
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Items Chart Mock */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Top Selling Items</h3>
                        <button className="text-sm text-gray-400 hover:text-gray-600">This Week</button>
                    </div>
                    <div className="space-y-6">
                        {['Spicy Chicken Burger', 'Margherita Pizza', 'Pasta Carbonara', 'Iced Coffee'].map((item, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-gray-700">{item}</span>
                                    <span className="text-gray-500">{100 - i * 15} sold</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${80 - i * 15}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
