import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950">
            {/* Hero Header */}
            <section className="relative py-32 overflow-hidden">
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
                        Get in{' '}
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            Touch
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                    >
                        We'd love to hear from you! Whether it's feedback, reservations, or just saying hi.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Info & Hours */}
                    <div className="space-y-10">
                        {/* Get in Touch Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-white dark:bg-gray-900/50 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Contact Information</h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-0.5 flex-shrink-0">
                                        <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                                            <Phone size={22} className="text-orange-600 dark:text-orange-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Phone</h4>
                                        <a href="tel:+12345678900" className="block text-lg text-gray-600 dark:text-gray-300 hover:text-orange-600 transition-colors">+1 234 567 8900</a>
                                        <a href="tel:+12345678901" className="block text-lg text-gray-600 dark:text-gray-300 hover:text-orange-600 transition-colors">+1 234 567 8901</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5 flex-shrink-0">
                                        <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                                            <Mail size={22} className="text-blue-600 dark:text-blue-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email</h4>
                                        <a href="mailto:hello@foodie.com" className="block text-lg text-gray-600 dark:text-gray-300 hover:text-orange-600 transition-colors">hello@foodie.com</a>
                                        <a href="mailto:support@foodie.com" className="block text-lg text-gray-600 dark:text-gray-300 hover:text-orange-600 transition-colors">support@foodie.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-0.5 flex-shrink-0">
                                        <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center">
                                            <MapPin size={22} className="text-green-600 dark:text-green-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Location</h4>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                            123 Food Street,<br />
                                            New York, NY 10001
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Follow Us</p>
                                <div className="flex gap-4">
                                    {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="group p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300"
                                        >
                                            <Icon size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Opening Hours Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="bg-gradient-to-br from-orange-500 to-red-500 p-10 rounded-3xl shadow-2xl text-white"
                        >
                            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Clock size={30} /> Opening Hours
                            </h3>
                            <div className="space-y-6 text-lg">
                                <div className="flex justify-between">
                                    <span className="font-medium">Monday - Friday</span>
                                    <span className="font-bold">8:00 AM - 10:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Saturday - Sunday</span>
                                    <span className="font-bold">9:00 AM - 11:00 PM</span>
                                </div>
                            </div>
                            <p className="mt-8 text-orange-100">
                                We're open every day to serve you the best food in town!
                            </p>
                        </motion.div>
                    </div>

                    {/* Location Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px] lg:h-full min-h-[500px] bg-gray-100 dark:bg-gray-800"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(0.2) contrast(1.2) opacity(0.9)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Restaurant Location"
                            className="absolute inset-0 w-full h-full"
                        ></iframe>

                        {/* Overlay Card */}
                        <div className="absolute bottom-6 left-6 right-6 md:auto md:right-auto md:w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                            <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <MapPin size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm">123 Food Street,<br />New York, NY 10001</p>
                            </div>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 block w-full text-center py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors text-sm"
                            >
                                Get Directions
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}