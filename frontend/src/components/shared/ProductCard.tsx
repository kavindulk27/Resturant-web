import { Plus, Check } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProductProps {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

export default function ProductCard({ id, name, price, image, description, category }: ProductProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({ id, name, price, image });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group"
        >
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 shadow-sm">
                    {category}
                </div>

                {/* Overlay for "Added" state */}
                <AnimatePresence>
                    {isAdded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-orange-500/20 backdrop-blur-[2px] flex items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-white dark:bg-gray-900 p-4 rounded-full shadow-2xl"
                            >
                                <Check size={32} className="text-orange-500" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-orange-500 transition-colors line-clamp-1">
                        {name || 'Unnamed Item'}
                    </h3>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px] font-medium leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center justify-between gap-4">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                        ${typeof price === 'number' ? price.toFixed(2) : parseFloat(price || '0').toFixed(2)}
                    </span>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`relative flex items-center justify-center px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 overflow-hidden
                            ${isAdded
                                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                                : 'bg-gray-900 dark:bg-orange-500 text-white shadow-lg shadow-gray-900/10 dark:shadow-orange-500/20 hover:bg-orange-500 dark:hover:bg-orange-600'
                            }`}
                    >
                        <AnimatePresence mode="wait">
                            {isAdded ? (
                                <motion.div
                                    key="added"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <Check size={16} strokeWidth={3} />
                                    <span>Added</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="add"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <Plus size={16} strokeWidth={3} />
                                    <span>Add</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
