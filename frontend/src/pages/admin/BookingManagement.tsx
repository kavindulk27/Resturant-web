import { useEffect, useState } from 'react';
import { useBookingStore, type BookingStatus } from '../../store/useBookingStore';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Clock, Check, XCircle, Calendar, User, Phone, Users, MessageSquare, MoreVertical } from 'lucide-react';

export default function BookingManagement() {
    const { bookings, updateBookingStatus, fetchBookings } = useBookingStore();
    const [filter, setFilter] = useState<BookingStatus | 'all'>('all');

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const filteredBookings = (bookings || []).filter(booking => {
        if (!booking) return false;
        return filter === 'all' ? true : booking.status === filter;
    });

    const handleStatusUpdate = (id: string, status: BookingStatus) => {
        updateBookingStatus(id, status);
        toast.success(`Booking ${status.toUpperCase()}`, {
            style: {
                borderRadius: '16px',
                background: '#1e293b',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '900',
            },
        });
    };

    const statusConfig = {
        pending: { label: 'Pending Arrival', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-100' },
        confirmed: { label: 'Confirmed', icon: Check, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
        rejected: { label: 'Rejected', icon: XCircle, color: 'text-rose-600 bg-rose-50 border-rose-100' },
        cancelled: { label: 'Cancelled', icon: XCircle, color: 'text-slate-400 bg-slate-50 border-slate-100' }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="space-y-8 max-w-[1400px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Booking Management</h1>
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Coordinate table reservations and guest experiences</p>
                </div>

                <div className="flex bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[24px] p-1.5 border border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-hide max-w-full w-full lg:w-auto">
                    {(['all', 'pending', 'confirmed', 'rejected', 'cancelled'] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-5 py-2.5 rounded-[18px] text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0 ${filter === s
                                ? 'bg-slate-900 dark:bg-orange-500 text-white shadow-lg shadow-slate-900/20'
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-6"
            >
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/30 dark:shadow-none">
                        <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar size={48} className="text-slate-200 dark:text-slate-700" />
                        </div>
                        <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase tracking-widest">No reservations found</h3>
                        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium italic mt-1">Bookings for the selected criteria will appear here</p>
                    </div>
                ) : (
                    (filteredBookings || []).filter(b => b && b.id).map((booking) => (
                        <motion.div
                            key={booking.id}
                            variants={item}
                            className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-2xl shadow-slate-200/20 dark:shadow-none border border-slate-50 dark:border-slate-800 hover:border-orange-100 dark:hover:border-orange-500/50 hover:shadow-orange-200/20 transition-all group"
                        >
                            <div className="flex flex-col xl:flex-row justify-between gap-10">
                                {/* Guest Info Card */}
                                <div className="flex-1 space-y-8">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-[24px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 shadow-sm border border-white dark:border-slate-700 group-hover:scale-110 group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-500 transition-all duration-300">
                                                <User size={28} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-2">{booking?.customerName || 'Unknown Guest'}</h3>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                        UID-{booking?.id ? booking.id.slice(-6).toUpperCase() : 'UNKNOWN'}
                                                    </span>
                                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                                                        <Phone size={12} className="text-orange-500" />
                                                        <span className="text-[10px] font-bold tracking-widest">{booking?.phone || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 shadow-sm ${statusConfig[booking?.status || 'pending']?.color || 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                                            <div className="flex items-center gap-2">
                                                {(() => {
                                                    const config = statusConfig[booking?.status || 'pending'];
                                                    const Icon = config?.icon || Clock;
                                                    return <Icon size={14} />;
                                                })()}
                                                {statusConfig[booking?.status || 'pending']?.label || 'Unknown Status'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                        <div className="bg-slate-50 p-6 rounded-[24px] border border-transparent group-hover:bg-white group-hover:border-slate-100 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white rounded-2xl shadow-sm text-orange-500 group-hover:scale-110 transition-transform">
                                                    <Calendar size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Reservation Date</p>
                                                    <p className="font-black text-slate-800 dark:text-white">{booking?.date ? new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-[24px] border border-transparent group-hover:bg-white group-hover:border-slate-100 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white rounded-2xl shadow-sm text-blue-500 group-hover:scale-110 transition-transform">
                                                    <Clock size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Dining Time</p>
                                                    <p className="font-black text-slate-800 dark:text-white">{booking?.time || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-[24px] border border-transparent group-hover:bg-white group-hover:border-slate-100 transition-colors sm:col-span-2 md:col-span-1">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white rounded-2xl shadow-sm text-purple-500 group-hover:scale-110 transition-transform">
                                                    <Users size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-1">Group Size</p>
                                                    <p className="font-black text-slate-800 dark:text-white">{booking?.guests || 0} {(booking?.guests || 0) === 1 ? 'Guest' : 'Guests'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {booking?.specialRequest && (
                                        <div className="relative overflow-hidden bg-slate-900 p-6 rounded-[24px] shadow-xl group/note">
                                            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 group-hover/note:rotate-0 transition-transform">
                                                <MessageSquare size={64} className="text-white" />
                                            </div>
                                            <div className="relative flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                                    <MessageSquare size={18} className="text-orange-400" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] text-orange-400 font-black uppercase tracking-[2px]">Special Request</p>
                                                    <p className="text-white text-sm font-medium leading-relaxed">"{booking.specialRequest}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Status Transitions */}
                                <div className="xl:w-80 flex flex-col justify-center border-t xl:border-t-0 xl:border-l border-slate-100 pt-8 xl:pt-0 xl:pl-10">
                                    <div className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[3px] mb-6 text-center xl:text-left">Workflow Controls</div>
                                    <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
                                        {(['pending', 'confirmed', 'rejected', 'cancelled'] as const).map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(booking.id, status)}
                                                disabled={booking.status === status}
                                                className={`group/btn px-6 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between border-2
                                                    ${booking.status === status
                                                        ? 'bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 border-slate-50 dark:border-slate-800 cursor-not-allowed'
                                                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-orange-500 hover:text-orange-500 hover:shadow-lg hover:shadow-orange-500/10 active:scale-95'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {status === 'pending' && <Clock size={16} className={`${booking.status === status ? 'opacity-30' : 'group-hover/btn:text-amber-500'}`} />}
                                                    {status === 'confirmed' && <Check size={16} className={`${booking.status === status ? 'opacity-30' : 'group-hover/btn:text-emerald-500'}`} />}
                                                    {status === 'rejected' && <XCircle size={16} className={`${booking.status === status ? 'opacity-30' : 'group-hover/btn:text-rose-500'}`} />}
                                                    {status === 'cancelled' && <XCircle size={16} className={`${booking.status === status ? 'opacity-30' : 'group-hover/btn:text-slate-400'}`} />}
                                                    <span>{status}</span>
                                                </div>
                                                {booking.status === status && <Check size={14} className="text-emerald-500" />}
                                            </button>
                                        ))}
                                    </div>

                                    <button className="mt-8 w-full py-4 rounded-[20px] bg-slate-900 dark:bg-orange-500 text-white text-[10px] font-black uppercase tracking-[2px] flex items-center justify-center gap-2 hover:bg-orange-500 dark:hover:bg-orange-600 transition-colors shadow-xl shadow-slate-900/10 dark:shadow-none active:scale-95">
                                        <MoreVertical size={16} />
                                        Full Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Live Indicator */}
            <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-[3px]">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <span>Monitoring Incoming Reservations</span>
            </div>
        </div>
    );
}
