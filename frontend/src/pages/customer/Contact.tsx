import { MapPin, Clock, Facebook, Instagram, Twitter, Calendar, Users, ChevronRight, ChevronLeft, Check, Sparkles, Phone, Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
import { useBookingStore } from '../../store/useBookingStore';
import toast from 'react-hot-toast';

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
    const { addBooking } = useBookingStore();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        trigger,
        formState: { errors },
    } = useForm<ReservationFormData>({
        defaultValues: {
            guests: 2,
            date: new Date().toISOString().split('T')[0],
            time: '19:00'
        }
    });

    const watchedGuests = useWatch({ control, name: 'guests' });
    const watchedName = useWatch({ control, name: 'name' });

    const onSubmit = async (data: ReservationFormData) => {
        setIsSubmitting(true);
        try {
            await addBooking({
                customerName: data.name,
                phone: data.phone,
                email: data.email,
                date: data.date,
                time: data.time,
                guests: data.guests,
                specialRequest: data.message
            });
            setIsSuccess(true);
            toast.success('Reservation Request Sent!');
            reset();
            setStep(1);
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            toast.error('Failed to send reservation request');
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = async () => {
        let fields: (keyof ReservationFormData)[] = [];
        if (step === 1) fields = ['date', 'time', 'guests'];
        if (step === 2) fields = ['name', 'email', 'phone'];

        const isValid = await trigger(fields);
        if (isValid) setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

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

                    {/* Left Side: Modern Reservation Flow */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white dark:bg-[#0f0f0f] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden"
                    >
                        {/* Progress Header */}
                        <div className="mb-10 flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] block">Step {step} of 3</span>
                                <h2 className="text-3xl font-black tracking-tighter">
                                    {step === 1 && "Select Slot"}
                                    {step === 2 && "Your Details"}
                                    {step === 3 && "Final Touch"}
                                </h2>
                            </div>
                            <div className="flex gap-1.5">
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        className={`w-8 h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-orange-500' : 'bg-gray-100 dark:bg-gray-800'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex-grow">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-6">
                                            <div className="group relative">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Choose Date</label>
                                                <div className="relative">
                                                    <Calendar size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500" />
                                                    <input
                                                        type="date"
                                                        {...register('date', { required: true })}
                                                        className="w-full bg-transparent border-b border-gray-100 dark:border-gray-800 pl-8 py-4 outline-none focus:border-orange-500 transition-all font-bold text-lg lg:[color-scheme:dark]"
                                                    />
                                                </div>
                                            </div>

                                            <div className="group relative">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Number of Guests</label>
                                                <div className="flex items-center gap-6 pt-2">
                                                    <Users size={20} className="text-orange-500" />
                                                    <div className="flex-1 space-y-4">
                                                        <input
                                                            type="range"
                                                            min="1"
                                                            max="10"
                                                            {...register('guests')}
                                                            className="w-full accent-orange-500 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer"
                                                        />
                                                        <div className="flex justify-between text-[10px] font-black text-gray-400">
                                                            <span>1 GUEST</span>
                                                            <span className="text-orange-500 text-sm">{watchedGuests} GUESTS</span>
                                                            <span>10+ GUESTS</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="group relative">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Preferred Time</label>
                                                <div className="grid grid-cols-4 gap-2 pt-2">
                                                    {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'].map(t => (
                                                        <label key={t} className="relative cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                value={t}
                                                                {...register('time')}
                                                                className="sr-only peer"
                                                            />
                                                            <div className="py-2.5 text-center text-[11px] font-black rounded-lg border border-gray-200 dark:border-gray-800 peer-checked:bg-orange-500 peer-checked:text-white peer-checked:border-orange-500 transition-all hover:bg-orange-50 dark:hover:bg-orange-500/10">
                                                                {t}
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-6">
                                            <div className="group space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                                <div className="relative">
                                                    <User size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500/50 group-focus-within:text-orange-500 transition-colors" />
                                                    <input
                                                        {...register('name', { required: 'Name is required' })}
                                                        placeholder="e.g. Alexander Pierce"
                                                        className="w-full bg-transparent border-b border-gray-100 dark:border-gray-800 pl-8 py-4 outline-none focus:border-orange-500 transition-colors font-bold text-lg"
                                                    />
                                                </div>
                                                {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.name.message}</p>}
                                            </div>

                                            <div className="group space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                                <div className="relative">
                                                    <Mail size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500/50 group-focus-within:text-orange-500 transition-colors" />
                                                    <input
                                                        {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                                                        placeholder="alex@example.com"
                                                        className="w-full bg-transparent border-b border-gray-100 dark:border-gray-800 pl-8 py-4 outline-none focus:border-orange-500 transition-colors font-bold text-lg"
                                                    />
                                                </div>
                                                {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.email.message}</p>}
                                            </div>

                                            <div className="group space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                <div className="relative">
                                                    <Phone size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500/50 group-focus-within:text-orange-500 transition-colors" />
                                                    <input
                                                        {...register('phone', { required: 'Phone is required' })}
                                                        placeholder="+1 (555) 000-0000"
                                                        className="w-full bg-transparent border-b border-gray-100 dark:border-gray-800 pl-8 py-4 outline-none focus:border-orange-500 transition-colors font-bold text-lg"
                                                    />
                                                </div>
                                                {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-widest">{errors.phone.message}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-6">
                                            <div className="bg-orange-50/50 dark:bg-orange-500/5 p-6 rounded-3xl border border-orange-100 dark:border-orange-500/10 mb-8">
                                                <div className="flex items-center gap-4 text-orange-600 dark:text-orange-500 mb-2">
                                                    <Sparkles size={20} />
                                                    <span className="font-black text-xs uppercase tracking-widest">Guest Memo</span>
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium">Any special occasions or dietary requirements? Let us know to make your evening perfect.</p>
                                            </div>

                                            <div className="group">
                                                <textarea
                                                    {...register('message')}
                                                    rows={4}
                                                    placeholder="Birthday surprise? Allergies? Window seat preference? We'll do our best."
                                                    className="w-full bg-gray-50/50 dark:bg-gray-800/20 border-2 border-gray-100 dark:border-gray-800 p-6 rounded-[2rem] outline-none focus:border-orange-500 focus:bg-white dark:focus:bg-gray-800/40 transition-all font-medium text-lg resize-none"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="pt-4 flex gap-4">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <ChevronLeft size={16} />
                                        Back
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={step === 3 ? handleSubmit(onSubmit) : nextStep}
                                    disabled={isSubmitting}
                                    className="flex-1 py-5 bg-gray-900 dark:bg-orange-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-black/10 hover:shadow-orange-500/30 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {step === 3 ? "Complete Booking" : "Continue"}
                                            {step === 3 ? <Check size={18} /> : <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                        </>
                                    )}
                                </button>
                            </div>

                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20"
                                    >
                                        <p className="text-emerald-600 dark:text-emerald-400 font-black text-xs uppercase tracking-widest">
                                            Booking Confirmed! See you soon {watchedName?.split(' ')[0]}.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
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