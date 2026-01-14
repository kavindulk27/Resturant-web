import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookingStore } from '../../store/useBookingStore';
import toast from 'react-hot-toast';

type BookingForm = {
    name: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    request?: string;
};

export default function BookTable() {
    const { addBooking } = useBookingStore();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<BookingForm>({
        defaultValues: {
            guests: 2
        }
    });

    const onSubmit = async (data: BookingForm) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newBooking = {
            id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
            customerName: data.name,
            phone: data.phone,
            email: data.email,
            date: data.date,
            time: data.time,
            guests: data.guests,
            status: 'pending' as const,
            createdAt: new Date().toISOString(),
            specialRequest: data.request
        };

        addBooking(newBooking);
        setIsSubmitting(false);
        setIsSubmitted(true);
        toast.success('Booking Request Sent!');
        reset();
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl w-full text-center space-y-6"
                >
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-green-500">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white">Request Received!</h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        We have received your table reservation request. You will receive a confirmation SMS/Email shortly once our team approves it.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            Book Another
                        </button>
                        <Link
                            to="/menu"
                            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                        >
                            Browse Menu
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-20 px-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">Book A Table</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Reserve your spot at Foodie's Paradise. Perfect for romantic dates, family dinners, and business meetings.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Visual Side */}
                    <div className="hidden lg:block space-y-8">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] group">
                            <img
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
                                alt="Restaurant Interior"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-12 flex flex-col justify-end text-white">
                                <h3 className="text-3xl font-black mb-2">Premium Dining</h3>
                                <p className="text-white/80">Experience world-class service and ambiance.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100 dark:border-gray-800"
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="date"
                                            {...register('date', { required: 'Date is required' })}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 dark:text-white"
                                        />
                                    </div>
                                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Time</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <select
                                            {...register('time', { required: 'Time is required' })}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 dark:text-white appearance-none"
                                        >
                                            <option value="">Select Time</option>
                                            {['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map(t => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Number of Guests</label>
                                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-800">
                                        <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                                            <User size={20} className="text-orange-500" />
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            {...register('guests')}
                                            className="flex-1 accent-orange-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <span className="w-12 text-center font-black text-xl text-gray-900 dark:text-white">
                                            {/* Get value from range using watch */}
                                            <GuestsDisplay control={control} />
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                {...register('name', { required: 'Name is required' })}
                                                placeholder="John Doe"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="tel"
                                                {...register('phone', { required: 'Phone is required' })}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            {...register('email', { required: 'Email is required' })}
                                            placeholder="john@example.com"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-2">Special Request (Optional)</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <textarea
                                            rows={3}
                                            {...register('request')}
                                            placeholder="Birthday, Anniversary, Allergy information..."
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 dark:text-white resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-orange-500 text-white rounded-xl font-black text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Reservation'}
                                {!isSubmitting && <ChevronRight className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Helper component to display watched value properly
function GuestsDisplay({ control }: { control: any }) {
    const guests = useWatch({
        control,
        name: 'guests',
        defaultValue: 2
    });
    return <>{guests}</>;
}
