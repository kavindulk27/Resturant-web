import { useState } from 'react';
import { useStockStore, type StockItem } from '../../store/useStockStore';
import { AlertTriangle, Plus, Search, X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function StockManagement() {
    const { items, addItem, updateStock, removeItem } = useStockStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        addItem({
            id: Math.random().toString(36).substr(2, 9),
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            quantity: parseFloat(formData.get('quantity') as string),
            unit: formData.get('unit') as string,
            threshold: parseFloat(formData.get('threshold') as string)
        });

        toast.success('Stock item added');
        setIsAddModalOpen(false);
    };

    const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedItem) return;

        const formData = new FormData(e.currentTarget);
        const newQuantity = parseFloat(formData.get('quantity') as string);

        updateStock(selectedItem.id, newQuantity);
        toast.success('Stock level updated');
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-black text-gray-900">Stock Management</h1>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
                >
                    <Plus size={20} /> Add New Stock
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search stock items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none transition-all"
                />
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="bg-gray-50/50 text-gray-400 font-bold text-xs uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Item Name</th>
                                <th className="px-8 py-5">Current Stock</th>
                                <th className="px-8 py-5">Min. Level</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredItems.map((item) => {
                                const isLowStock = item.quantity <= item.threshold;
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6 font-bold text-gray-900">{item.name}</td>
                                        <td className="px-8 py-6">
                                            <span className="font-black text-lg text-gray-900">{item.quantity}</span>
                                            <span className="text-sm text-gray-500 ml-1">{item.unit}</span>
                                        </td>
                                        <td className="px-8 py-6 text-gray-500 font-medium">{item.threshold} {item.unit}</td>
                                        <td className="px-8 py-6">
                                            {isLowStock ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
                                                    <AlertTriangle size={12} /> Low Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                                                    In Stock
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openUpdateModal(item)}
                                                    className="text-orange-600 font-bold hover:text-orange-700 hover:underline px-2"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Delete this stock item?')) {
                                                            removeItem(item.id);
                                                            toast.success('Item moved to trash');
                                                        }
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h2 className="text-xl font-black text-gray-900">Add New Stock Item</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-1">Item Name</label>
                                    <input name="name" required className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-500 mb-1">Category</label>
                                        <input name="category" required className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-500 mb-1">Unit (e.g., kg, pcs)</label>
                                        <input name="unit" required className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-500 mb-1">Initial Quantity</label>
                                        <input name="quantity" type="number" step="any" required className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-500 mb-1">Low Stock Threshold</label>
                                        <input name="threshold" type="number" step="any" required className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20">
                                    Add Item
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Update Modal */}
            <AnimatePresence>
                {isUpdateModalOpen && selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900">Update Stock Level</h2>
                                    <p className="text-sm text-gray-500">{selectedItem.name}</p>
                                </div>
                                <button onClick={closeUpdateModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 mb-1">New Quantity ({selectedItem.unit})</label>
                                    <input
                                        name="quantity"
                                        type="number"
                                        step="any"
                                        required
                                        defaultValue={selectedItem.quantity}
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-900 outline-none text-xl font-bold"
                                    />
                                </div>
                                <button type="submit" className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30">
                                    Update Quantity
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
