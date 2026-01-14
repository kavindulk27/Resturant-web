import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';

import Logo from '../ui/Logo';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-b from-gray-950 to-black text-gray-300 overflow-hidden">
            {/* Subtle background pattern/gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Logo & Description - Wider column */}
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Logo />
                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">

                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Taste the difference with our premium ingredients and passionate chefs.
                            Crafting unforgettable dining experiences since 2020.
                        </p>

                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="group p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                                >
                                    <Icon size={20} className="text-gray-400 group-hover:text-orange-500 transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-2">
                        <h3 className="text-white font-semibold text-lg mb-3 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-orange-500">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {['Home', 'Menu', 'Track Order', 'About Us', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a
                                        href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-400 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-4 h-0.5 bg-orange-500 transition-all duration-300" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-3">
                        <h3 className="text-white font-semibold text-lg mb-3 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-orange-500">
                            Contact
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                                <span>123 Food Street, New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone size={20} className="text-orange-500 flex-shrink-0" />
                                <a href="tel:+12345678900" className="hover:text-orange-500 transition-colors">+1 234 567 8900</a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={20} className="text-orange-500 flex-shrink-0" />
                                <a href="mailto:hello@foodie.com" className="hover:text-orange-500 transition-colors">hello@foodie.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div className="md:col-span-3">
                        <h3 className="text-white font-semibold text-lg mb-3 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-orange-500">
                            Opening Hours
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between">
                                <span className="text-gray-400 flex items-center gap-3">
                                    <Clock size={20} className="text-orange-500" />
                                    Mon - Fri
                                </span>
                                <span className="text-white font-medium">8am - 10pm</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-400 flex items-center gap-3">
                                    <Clock size={20} className="text-orange-500" />
                                    Sat - Sun
                                </span>
                                <span className="text-white font-medium">9am - 11pm</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {currentYear} Foodie Restaurant. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}