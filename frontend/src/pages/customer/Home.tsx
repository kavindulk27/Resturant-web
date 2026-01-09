import { ArrowRight, Clock, Truck, Percent, ShieldCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/shared/ProductCard';
import { motion } from 'framer-motion';

const MOCK_POPULAR_ITEMS = [
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
];

const features = [
    {
        icon: Truck,
        color: 'from-orange-500 to-red-500',
        title: 'Lightning Fast Delivery',
        description: 'Hot & fresh food delivered in 30 minutes or less',
    },
    {
        icon: Percent,
        color: 'from-emerald-500 to-teal-500',
        title: 'Exclusive Deals',
        description: 'Daily discounts and combo offers just for you',
    },
    {
        icon: ShieldCheck,
        color: 'from-purple-500 to-pink-500',
        title: 'Premium Quality',
        description: 'Hand-picked ingredients & chef-crafted recipes',
    },
];

export default function Home() {
    const isOpen = true; // Mock status

    return (
        <div className="min-h-screen">
            {/* Hero Section - Modern & Captivating */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
                {/* Background Image with Parallax Feel */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="Delicious food spread"
                        className="w-full h-full object-cover scale-110 transform-gpu transition-transform duration-1000 hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-red-600/20" />
                </div>

                {/* Floating particles/decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-10 backdrop-blur-xl border ${
                                isOpen 
                                    ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                            }`}
                        >
                            <span className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse shadow-lg`} />
                            <Clock size={18} />
                            <span className="font-semibold tracking-wider uppercase">
                                {isOpen ? 'Open Now • Ready to serve!' : 'Closed • See you tomorrow'}
                            </span>
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-tight">
                            Crave It?<br />
                            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                                Get It Delivered.
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Premium flavors crafted by master chefs. Fresh, hot, and delivered straight to your door in minutes.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                to="/menu"
                                className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/40 transform hover:scale-105 transition-all duration-300"
                            >
                                <span className="relative flex items-center gap-3">
                                    Order Now <ArrowRight className="group-hover:translate-x-2 transition-transform" size={22} />
                                </span>
                                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full" />
                            </Link>

                            <Link
                                to="/menu"
                                className="px-10 py-5 border-2 border-white/30 backdrop-blur-xl text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                            >
                                Explore Menu <ChevronRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Popular Items Section - Sleek & Engaging */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Customer Favorites
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Our top-rated dishes loved by thousands. Don't miss out!
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {MOCK_POPULAR_ITEMS.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                            >
                                <ProductCard {...item} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link
                            to="/menu"
                            className="inline-flex items-center gap-3 text-orange-600 dark:text-orange-500 font-bold text-lg hover:gap-5 transition-all duration-300"
                        >
                            View Full Menu <ArrowRight size={24} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section - Modern Cards */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="group relative p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 overflow-hidden backdrop-blur-xl hover:border-orange-500/50 transition-all duration-500"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-6`}>
                                    <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center">
                                        <feature.icon size={32} className="text-white" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}