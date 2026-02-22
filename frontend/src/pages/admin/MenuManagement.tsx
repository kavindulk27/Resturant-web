import { useEffect, useState } from 'react';
import { useMenuStore, type MenuItem } from '../../store/useMenuStore';
import { Plus, Edit3, Trash2, Search, X, Image as ImageIcon, Filter, MoreVertical, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function MenuManagement() {
    const { items, addItem, updateItem, deleteItem, fetchItems } = useMenuStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('All');

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // Get unique categories for filter
    const categories = ['All', ...new Set((items || []).map(item => item?.category).filter(Boolean))];

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const newItem = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as string,
            price: parseFloat(formData.get('price') as string),
            image: formData.get('image') as string || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
            available: formData.get('available') === 'on'
        };

        await addItem(newItem);
        toast.success('Menu item added successfully');
        setIsAddModalOpen(false);
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedItem) return;

        const formData = new FormData(e.currentTarget);

        updateItem(selectedItem.id, {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as string,
            price: parseFloat(formData.get('price') as string),
            image: formData.get('image') as string,
            available: formData.get('available') === 'on'
        });

        toast.success('Menu item updated successfully');
        setIsEditModalOpen(false);
        setSelectedItem(null);
    };

    const handleDelete = (id: string) => {
        toast((t) => (
            <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-slate-800">Delete this item?</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            deleteItem(id);
                            toast.success('Deleted successfully');
                            toast.dismiss(t.id);
                        }}
                        className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 4000 });
    };

    const openEditModal = (item: MenuItem) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto text-slate-800 dark:text-slate-100">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Menu Management</h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Create, edit and manage your restaurant menu items</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAddModalOpen(true)}
                    className="group bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>ADD NEW ITEM</span>
                </motion.button>
            </div>

            {/* Main Content Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                        <input
                            type="text"
                            className="w-full bg-white dark:bg-slate-900 pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-sm font-medium dark:text-slate-100 placeholder:dark:text-slate-600"
                            placeholder="Search by name or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        <div className="flex items-center gap-2 text-slate-400 mr-2">
                            <Filter size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Category:</span>
                        </div>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setFilterCategory(category)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all whitespace-nowrap ${filterCategory === category
                                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-500/5'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                                <th className="px-8 py-5">Item Information</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Price</th>
                                <th className="px-8 py-5">Availability</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                            {(filteredItems || []).map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                                                />
                                                {!item.available && (
                                                    <div className="absolute inset-0 bg-slate-900/40 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
                                                        <X size={16} className="text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="font-black text-slate-800 dark:text-white group-hover:text-orange-500 transition-colors uppercase tracking-tight">{item.name}</div>
                                                <div className="text-xs text-slate-400 font-medium line-clamp-1 max-w-[250px] italic">"{item.description}"</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-wider group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-slate-800 dark:text-white">${(item?.price || 0).toFixed(2)}</span>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tighter">per unit</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full w-fit ${item.available
                                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                            : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${item.available ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-wider">
                                                {item.available ? 'Active' : 'Hidden'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openEditModal(item)}
                                                className="p-2.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-xl transition-all shadow-sm active:scale-90"
                                                title="Edit Item"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-xl transition-all shadow-sm active:scale-90"
                                                title="Delete Item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="opacity-100 group-hover:opacity-0 transition-opacity">
                                            <MoreVertical size={20} className="text-slate-300 dark:text-slate-700 ml-auto" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredItems.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-200 dark:text-slate-700">
                                                <Search size={40} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-slate-800 dark:text-white font-black uppercase tracking-widest text-sm">No items found</p>
                                                <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">Try adjusting your filters or search terms</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals Container */}
            <AnimatePresence>
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/5"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                                        {isAddModalOpen ? 'New Menu Item' : 'Update Menu Item'}
                                    </h2>
                                    <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
                                        Admin Configuration
                                    </p>
                                </div>
                                <button
                                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setSelectedItem(null); }}
                                    className="p-3 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-2xl transition-all active:scale-90"
                                >
                                    <X size={24} className="text-slate-400 dark:text-slate-500" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form
                                onSubmit={isAddModalOpen ? handleAddSubmit : handleEditSubmit}
                                className="p-10 space-y-8"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Item Name</label>
                                        <input
                                            name="name"
                                            defaultValue={selectedItem?.name}
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 px-5 py-4 rounded-2xl focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                            placeholder="e.g. Signature Truffle Pizza"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                        <textarea
                                            name="description"
                                            defaultValue={selectedItem?.description}
                                            required
                                            rows={3}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 px-5 py-4 rounded-2xl focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 resize-none"
                                            placeholder="Tell us about this delicious item..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                        <input
                                            name="category"
                                            defaultValue={selectedItem?.category}
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 px-5 py-4 rounded-2xl focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300"
                                            placeholder="Main Course"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
                                        <input
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            defaultValue={selectedItem?.price}
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 px-5 py-4 rounded-2xl focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none font-black text-slate-800 dark:text-white"
                                            placeholder="12.99"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Image URL</label>
                                        <div className="relative group">
                                            <input
                                                name="image"
                                                defaultValue={selectedItem?.image}
                                                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 pl-12 pr-5 py-4 rounded-2xl focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none font-bold text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-tight">Active Status</span>
                                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">Visibility to customers</span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="available"
                                            defaultChecked={isAddModalOpen ? true : selectedItem?.available}
                                            className="sr-only peer"
                                        />
                                        <div className="w-14 h-7 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setSelectedItem(null); }}
                                        className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black uppercase tracking-[2px] rounded-3xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <span>Cancel</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-5 bg-slate-900 dark:bg-orange-500 text-white font-black uppercase tracking-[2px] rounded-3xl hover:bg-orange-500 dark:hover:bg-orange-600 shadow-xl hover:shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        {isAddModalOpen ? <Plus size={20} /> : <Save size={20} />}
                                        <span>{isAddModalOpen ? 'Submit New Item' : 'Save Changes'}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
