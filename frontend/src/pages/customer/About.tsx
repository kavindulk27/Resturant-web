import { motion } from 'framer-motion';
import { Heart, Users, Leaf } from 'lucide-react';

export default function About() {
    const values = [
        {
            icon: Heart,
            title: 'Made with Passion',
            description: 'Every dish is crafted with love and attention to detail by our dedicated team.',
            color: 'from-red-500 to-orange-500',
        },
        {
            icon: Leaf,
            title: 'Fresh & Local',
            description: 'We partner with local farmers to bring you the freshest, highest-quality ingredients.',
            color: 'from-emerald-500 to-teal-500',
        },
        {
            icon: Users,
            title: 'Community First',
            description: 'Building connections through food – your satisfaction is our greatest reward.',
            color: 'from-blue-500 to-cyan-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6"
                    >
                        About{' '}
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Foodie
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
                    >
                        Where passion meets flavor – crafting unforgettable meals since 2020
                    </motion.p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl group"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                            alt="Our passionate chefs at work"
                            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white">
                            <p className="text-lg font-medium opacity-90">Our team in action</p>
                        </div>
                    </motion.div>

                    {/* Story Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                            Our Story
                        </h2>
                        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            <p>
                                Foodie was born in 2020 from a simple dream: to bring people together through exceptional food. What started as a small family kitchen has grown into a beloved community hub.
                            </p>
                            <p>
                                Our founders – a passionate chef and a food-loving entrepreneur – wanted to create a place where quality never compromises convenience. Every dish on our menu reflects this commitment.
                            </p>
                            <p>
                                Today, we continue to source fresh, local ingredients and prepare every meal with care, creativity, and love – because we believe good food should be accessible to everyone.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            What Drives Us
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            The core values behind every dish we serve
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.7 }}
                                className="group relative p-8 rounded-3xl bg-white dark:bg-gray-900/50 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} />

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} p-0.5 mb-6`}>
                                    <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                                        <value.icon size={32} className="text-white" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}