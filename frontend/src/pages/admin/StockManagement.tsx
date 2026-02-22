import { useEffect, useState } from 'react';
import { useStockStore, type StockItem } from '../../store/useStockStore';
import { AlertTriangle, Plus, Search, X, Trash2, Package, Layers, Info, CheckCircle2, MoreVertical, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function StockManagement() {
    const { items, addItem, updateStock, removeItem, fetchStock } = useStockStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchStock();
    }, [fetchStock]);

    const filteredItems = (items || []).filter(item =>
        (item?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        addItem({
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            quantity: parseFloat(formData.get('quantity') as string),
            unit: formData.get('unit') as string,
            threshold: parseFloat(formData.get('threshold') as string)
        });

        toast.success('Stock item added', {
            style: { borderRadius: '16px', background: '#1e293b', color: '#fff', fontSize: '12px', fontWeight: '900' },
        });
        setIsAddModalOpen(false);
    };

    const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedItem) return;

        const formData = new FormData(e.currentTarget);
        const newQuantity = parseFloat(formData.get('quantity') as string);

        updateStock(selectedItem.id, newQuantity);
        toast.success('Stock level updated', {
            style: { borderRadius: '16px', background: '#1e293b', color: '#fff', fontSize: '12px', fontWeight: '900' },
        });
        closeUpdateModal();
    };

    const openUpdateModal = (item: StockItem) => {
        setSelectedItem(item);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setSelectedItem(null);
        setIsUpdateModalOpen(false);
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const row = {
        hidden: { x: -10, opacity: 0 },
        show: { x: 0, opacity: 1 }
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Stock Inventory</h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Monitor and manage raw materials and supplies</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAddModalOpen(true)}
                    className="group bg-slate-900 dark:bg-orange-500 text-white px-8 py-4 rounded-[22px] font-black text-[10px] uppercase tracking-[2px] flex items-center gap-3 shadow-xl shadow-slate-900/20 dark:shadow-none hover:bg-orange-600 dark:hover:bg-orange-600 transition-all"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Entry</span>
                </motion.button>
            </div>

            {/* Stats Overview Mini */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center">
                        <Package size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Total Items</p>
                        <p className="text-xl font-black text-slate-800 dark:text-white">{(items || []).length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center">
                        <AlertTriangle size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Low Stock</p>
                        <p className="text-xl font-black text-slate-800 dark:text-white">{(items || []).filter(i => (i?.quantity || 0) <= (i?.threshold || 0)).length}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <Layers size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Categories</p>
                        <p className="text-xl font-black text-slate-800 dark:text-white">{new Set((items || []).map(i => i?.category).filter(Boolean)).size}</p>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search by ingredient or supply name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500 outline-none transition-all font-medium text-slate-600 dark:text-slate-300 placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
            </div>

            {/* Main Inventory Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/30 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="px-10 py-6">Item Information</th>
                                <th className="px-10 py-6">Stock Status</th>
                                <th className="px-10 py-6">Minimum Alert</th>
                                <th className="px-10 py-6">Health</th>
                                <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="divide-y divide-slate-50"
                        >
                            {(filteredItems || []).map((item) => {
                                const isLowStock = item.quantity <= item.threshold;
                                return (
                                    <motion.tr
                                        key={item.id}
                                        variants={row}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-300 group"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:scale-110 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-all">
                                                    <Package size={22} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 dark:text-white text-sm uppercase tracking-tight leading-none mb-1">{item.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-baseline gap-1">
                                                <span className="font-black text-2xl text-slate-900 dark:text-white tracking-tighter">{item.quantity}</span>
                                                <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{item.unit}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                                                <Info size={14} className="text-slate-200 dark:text-slate-700" />
                                                <span className="text-[11px] font-black uppercase tracking-widest">{item.threshold} {item.unit}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            {isLowStock ? (
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20 shadow-sm shadow-rose-500/5">
                                                    <AlertTriangle size={12} /> Refill Required
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 shadow-sm shadow-emerald-500/5">
                                                    <CheckCircle2 size={12} /> Optimal
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => openUpdateModal(item)}
                                                    className="p-3 bg-white dark:bg-slate-800 text-orange-500 hover:bg-orange-500 hover:text-white rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all active:scale-90"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Delete this stock item?')) {
                                                            removeItem(item.id);
                                                            toast.success('Item moved to trash');
                                                        }
                                                    }}
                                                    className="p-3 bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-rose-500 hover:text-white rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all active:scale-90"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="group-hover:hidden transition-all">
                                                <MoreVertical size={20} className="text-slate-200 dark:text-slate-700 ml-auto" />
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </motion.tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-none border border-white dark:border-slate-800"
                        >
                            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-800/30">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Create Stock Entry</h2>
                                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">Add a new item to your kitchen inventory</p>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-500 rounded-full transition-all border border-slate-100 dark:border-slate-700 shadow-sm">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleAddSubmit} className="p-10 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Item Designation</label>
                                    <input name="name" required placeholder="e.g. Fresh Tomatoes" className="w-full px-6 py-4 rounded-[18px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-4 focus:ring-slate-900/5 dark:focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white" />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Classification</label>
                                        <input name="category" required placeholder="Vegetables" className="w-full px-6 py-4 rounded-[18px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-4 focus:ring-slate-900/5 dark:focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Unit Type</label>
                                        <input name="unit" required placeholder="kg / pcs / liters" className="w-full px-6 py-4 rounded-[18px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-4 focus:ring-slate-900/5 dark:focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Initial Quantity</label>
                                        <input name="quantity" type="number" step="any" required className="w-full px-6 py-4 rounded-[18px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-4 focus:ring-slate-900/5 dark:focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Alert Threshold</label>
                                        <input name="threshold" type="number" step="any" required className="w-full px-6 py-4 rounded-[18px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 focus:ring-4 focus:ring-slate-900/5 dark:focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white" />
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-5 bg-slate-900 dark:bg-orange-500 text-white font-black text-[10px] uppercase tracking-[3px] rounded-[22px] hover:bg-orange-500 dark:hover:bg-orange-600 transition-all shadow-xl shadow-slate-900/10 dark:shadow-none active:scale-[0.98] mt-4">
                                    Register Inventory Item
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Update Modal */}
            <AnimatePresence>
                {isUpdateModalOpen && selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-white"
                        >
                            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                <div>
                                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Adjust Balance</h2>
                                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{selectedItem.name}</p>
                                </div>
                                <button onClick={closeUpdateModal} className="w-10 h-10 flex items-center justify-center bg-white hover:bg-rose-50 hover:text-rose-500 rounded-full transition-all border border-slate-100 shadow-sm">
                                    <X size={20} />
                                </button>
                            </div>
                            <form onSubmit={handleUpdateSubmit} className="p-10 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">New Inventory Level</label>
                                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest pr-1">Measured in {selectedItem.unit}</span>
                                    </div>
                                    <input
                                        name="quantity"
                                        type="number"
                                        step="any"
                                        required
                                        autoFocus
                                        defaultValue={selectedItem.quantity}
                                        className="w-full px-8 py-6 rounded-[24px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-center text-3xl font-black text-slate-900 dark:text-white"
                                    />
                                </div>
                                <button type="submit" className="w-full py-5 bg-orange-500 text-white font-black text-[10px] uppercase tracking-[3px] rounded-[22px] hover:bg-slate-900 dark:hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/30 dark:shadow-none active:scale-[0.98]">
                                    Log Deployment / Restock
                                </button>
                                <p className="text-center text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-[1px]">Updating this will immediately affect inventory health status</p>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Live Indicator */}
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[3px]">
                <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <span>Inventory Synchronization Live</span>
            </div>
        </div>
    );
}
