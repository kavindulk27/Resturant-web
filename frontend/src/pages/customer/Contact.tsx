import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Calendar, Users, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface ReservationFormData {
    name: string;
    email: string;
    phone: string;
    guests: number;
    date: string;
    time: string;
    message: string;
}

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ReservationFormData>();

    const onSubmit = async (data: ReservationFormData) => {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Reservation Data:', data);
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-500">
            {/* Refined Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Hero Section - Balanced Center */}
            <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
                            Plan Your <span className="font-bold border-b-2 border-orange-500/30">Dining</span> Experience
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto leading-relaxed">
                            Whether it’s a romantic evening or a group celebration, we’ve crafted a space for your most memorable moments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Symmetric Content */}
            <section className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200 dark:bg-gray-800 rounded-[3rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">

                    {/* Left Side: Reservation Form (Entrance from Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white dark:bg-[#0f0f0f] p-8 md:p-12 lg:p-16"
                    >
                        <div className="max-w-md mx-auto h-full flex flex-col justify-center">
                            <div className="mb-12">
                                <span className="text-orange-600 dark:text-orange-500 text-xs font-black uppercase tracking-[0.2em] mb-4 block">Table Booking</span>
                                <h2 className="text-3xl font-bold mb-4 tracking-tight">Reserve a Table</h2>
                                <div className="w-12 h-1 bg-orange-500 rounded-full" />
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="group">
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            placeholder="Full Name"
                                            className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-4 outline-none focus:border-orange-500 transition-colors dark:text-white placeholder:text-gray-400 font-medium text-lg"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div className="group">
                                        <input
                                            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                                            placeholder="Email Address"
                                            className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-4 outline-none focus:border-orange-500 transition-colors dark:text-white placeholder:text-gray-400 font-medium text-lg"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="group">
                                            <select
                                                {...register('guests')}
                                                className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-4 outline-none focus:border-orange-500 transition-colors dark:text-white appearance-none cursor-pointer font-medium text-lg"
                                            >
                                                {[1, 2, 4, 6, 8, 10].map(n => <option key={n} value={n} className="dark:bg-[#0f0f0f]">{n} Guests</option>)}
                                            </select>
                                        </div>
                                        <div className="group">
                                            <input type="time" {...register('time')} className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-4 outline-none focus:border-orange-500 transition-colors dark:text-white font-medium text-lg lg:[color-scheme:dark]" />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <input type="date" {...register('date')} className="w-full bg-transparent border-b border-gray-200 dark:border-gray-800 py-4 outline-none focus:border-orange-500 transition-colors dark:text-white font-medium text-lg lg:[color-scheme:dark]" />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        disabled={isSubmitting}
                                        className="w-full py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-3 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Book Now
                                                <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-[2] transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {isSuccess && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center text-green-600 dark:text-green-500 font-bold"
                                        >
                                            Booking confirmed. See you soon!
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Side: Information Stack (Entrance from Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-[#fcfcfc] dark:bg-[#141414] p-8 md:p-12 lg:p-16 flex flex-col"
                    >
                        <div className="max-w-md mx-auto w-full h-full flex flex-col">
                            <div className="mb-12">
                                <span className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-4 block">Information</span>
                                <h2 className="text-3xl font-bold mb-4 tracking-tight">How to Find Us</h2>
                                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                            </div>

                            <div className="space-y-12 flex-grow">
                                {/* Contact Rows */}
                                <div className="grid grid-cols-1 gap-10">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500">Address</p>
                                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200 leading-tight">123 Culinary Haven,<br />Manhattan, NY 10001</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone</p>
                                            <a href="tel:+1234567890" className="text-lg font-bold hover:text-orange-500 transition-colors">+1 234 567 89</a>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Email</p>
                                            <a href="mailto:hello@foodie.com" className="text-lg font-bold hover:text-orange-500 transition-colors">hello@foodie.com</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Opening Hours Balanced Card */}
                                <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/[0.02]">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                                            <Clock size={20} className="text-orange-500" />
                                        </div>
                                        <h4 className="font-bold">Opening Hours</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-500">Mon - Fri</span>
                                            <span className="font-bold">08 AM - 10 PM</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-500">Sat - Sun</span>
                                            <span className="font-bold">09 AM - 11 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Socials - Balanced Horizontal */}
                            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-8">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Follow Us</span>
                                    <div className="flex gap-6">
                                        {[Facebook, Instagram, Twitter].map((S, i) => (
                                            <a key={i} href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                                <S size={20} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Minimalist Centered Map - Balanced Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-24 rounded-[3rem] overflow-hidden group h-[400px] relative shadow-2xl"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s"
                        className="absolute inset-0 w-full h-full grayscale opacity-60 dark:invert group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                        style={{ border: 0 }}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent opacity-40 group-hover:opacity-0 transition-opacity" />
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl rounded-full shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                        <MapPin size={18} className="text-orange-500" />
                        <span className="font-bold text-sm">Open in Maps</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}