import { useState } from 'react';
import ProductCard from '../../components/shared/ProductCard';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Burger', 'Pizza', 'Pasta', 'Beverages', 'Desserts'];

const MOCK_MENU_ITEMS = [
    {
        id: '1',
        name: 'Spicy Chicken Burger',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Crispy chicken fillet with spicy sauce, lettuce, and cheese.',
        category: 'Burger',
    },
    {
        id: '2',
        name: 'Margherita Pizza',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Classic tomato sauce, fresh mozzarella, and basil.',
        category: 'Pizza',
    },
    {
        id: '3',
        name: 'Pasta Carbonara',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Creamy sauce with bacon, egg, and parmesan cheese.',
        category: 'Pasta',
    },
    {
        id: '4',
        name: 'Double Cheeseburger',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Two beef patties, cheddar cheese, pickles, and onions.',
        category: 'Burger',
    },
    {
        id: '5',
        name: 'Pepperoni Pizza',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Spicy pepperoni, mozzarella cheese, and tomato sauce.',
        category: 'Pizza',
    },
    {
        id: '6',
        name: 'Iced Coffee',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd73ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Cold brewed coffee with milk and ice.',
        category: 'Beverages',
    },
    {
        id: '7',
        name: 'Chocolate Cake',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Rich chocolate cake with ganache topping.',
        category: 'Desserts',
    }
];

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = MOCK_MENU_ITEMS.filter((item) => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
            {/* Hero Header */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6"
                    >
                        Our Delicious{' '}
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Menu
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                    >
                        Handcrafted with love using the finest ingredients. Find your perfect craving below.
                    </motion.p>
                </div>
            </section>

            {/* Search & Filters */}
            <section className="sticky top-16 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        {/* Category Pills */}
                        <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                            {CATEGORIES.map((category) => (
                                <motion.button
                                    key={category}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px - 6 py - 3 rounded - full font - medium whitespace - nowrap transition - all duration - 300 ${activeCategory === category
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/30'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        } `}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                            <input
                                type="text"
                                placeholder="Search for delicious food..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 text-gray-900 dark:text-white transition-all duration-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Grid */}
            <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
                {filteredItems.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                            >
                                <ProductCard {...item} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-32">
                        <div className="text-6xl mb-6">🍽️</div>
                        <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
                            No items found
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                            Try adjusting your search or category filter to discover more delicious options.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}