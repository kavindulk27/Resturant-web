import { DollarSign, ShoppingBag, Users, AlertTriangle, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const stats = [
        { title: 'Total Revenue', value: '$12,845.50', icon: DollarSign, trend: '+12.5%', isPositive: true, color: 'from-emerald-500 to-teal-600' },
        { title: 'Active Orders', value: '156', icon: ShoppingBag, trend: '+5.2%', isPositive: true, color: 'from-blue-500 to-indigo-600' },
        { title: 'New Customers', value: '24', icon: Users, trend: '+18.1%', isPositive: true, color: 'from-orange-500 to-red-600' },
        { title: 'Low Stock', value: '4 items', icon: AlertTriangle, trend: '-2', isPositive: false, color: 'from-rose-500 to-pink-600' },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={item}
                        className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300 group overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full -mr-12 -mt-12 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors duration-500"></div>

                        <div className="flex justify-between items-start mb-6 relative">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon size={22} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                {stat.trend}
                            </div>
                        </div>

                        <div className="relative">
                            <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.title}</h3>
                            <p className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">Recent Orders</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Monitoring latest customer activities</p>
                        </div>
                        <button className="flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-600 bg-orange-50 dark:bg-orange-950/30 px-4 py-2 rounded-xl transition-all h-fit self-center">
                            VIEW REPORT <ArrowRight size={14} />
                        </button>
                    </div>
                    <div className="p-2">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                        <th className="px-4 py-4 truncate">Order ID</th>
                                        <th className="px-4 py-4 truncate">Customer</th>
                                        <th className="px-4 py-4 truncate">Amount</th>
                                        <th className="px-4 py-4 truncate">Status</th>
                                        <th className="px-4 py-4 truncate">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                            <td className="px-4 py-4">
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-400">#ORD-{1200 + i}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-[10px]">JD</div>
                                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">John Doe</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-xs font-black text-slate-700 dark:text-slate-300">$45.00</td>
                                            <td className="px-4 py-4">
                                                <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600">
                                                    Delivered
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <button className="p-1.5 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all">
                                                    <ArrowRight size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Popular Items */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                    <div className="mb-8">
                        <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">Top Performance</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Menu item sales distribution</p>
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Spicy Chicken Burger', sold: 124, percentage: 85, color: 'bg-orange-500' },
                            { name: 'Margherita Pizza', sold: 98, percentage: 70, color: 'bg-blue-500' },
                            { name: 'Pasta Carbonara', sold: 76, percentage: 55, color: 'bg-indigo-500' },
                            { name: 'Iced Coffee', sold: 54, percentage: 40, color: 'bg-rose-500' }
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-orange-500 transition-colors line-clamp-1">{item.name}</span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1 uppercase tracking-tighter">{item.sold} Units Sold</span>
                                    </div>
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{item.percentage}%</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                        className={`${item.color} h-full rounded-full`}
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-10 py-3 border border-slate-100 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 transition-all">
                        GENERATE FULL INVENTORY
                    </button>
                </div>
            </div>
        </div>
    );
}
