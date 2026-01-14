import { useState } from 'react';
import { useBookingStore, type BookingStatus } from '../../store/useBookingStore';
import { Check, X, Clock, Calendar, Users, Phone, Mail, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BookingManagement() {
    const { bookings, updateBookingStatus } = useBookingStore();
    const [filter, setFilter] = useState<BookingStatus | 'all'>('all');

    const filteredBookings = bookings.filter(booking =>
        filter === 'all' ? true : booking.status === filter
    );

    const handleStatusUpdate = (id: string, status: BookingStatus) => {
        updateBookingStatus(id, status);
        toast.success(`Booking ${status}`);
    };

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20',
        confirmed: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20',
        rejected: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20',
        cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-400 border border-gray-200 dark:border-gray-500/20'
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookings</h1>

                <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50">
                    {(['all', 'pending', 'confirmed', 'rejected'] as const).map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${filter === s
                                ? 'bg-orange-500 text-white shadow-md'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredBookings.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                        <Calendar size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No bookings found</h3>
                        <p className="text-gray-500 dark:text-gray-400">There are no bookings with this status.</p>
                    </div>
                ) : (
                    filteredBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                {/* Info Section */}
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{booking.customerName}</h3>
                                            <p className="text-xs text-gray-400">ID: {booking.id}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors[booking.status]}`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                <Calendar size={18} className="text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase">Date</p>
                                                <p className="font-medium text-gray-900 dark:text-gray-200">{new Date(booking.date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                <Clock size={18} className="text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase">Time</p>
                                                <p className="font-medium text-gray-900 dark:text-gray-200">{booking.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                <Users size={18} className="text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase">Guests</p>
                                                <p className="font-medium text-gray-900 dark:text-gray-200">{booking.guests} People</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                <Phone size={18} className="text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase">Contact</p>
                                                <p className="font-medium text-gray-900 dark:text-gray-200">{booking.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {booking.specialRequest && (
                                        <div className="flex items-start gap-3 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30">
                                            <MessageSquare size={18} className="text-orange-500 mt-1" />
                                            <div>
                                                <p className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase mb-1">Special Request</p>
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">{booking.specialRequest}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Status Actions */}
                                <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-700/50 pt-4 lg:pt-0 lg:pl-6 min-w-[200px]">
                                    <div className="grid grid-cols-1 gap-2">
                                        {(['pending', 'confirmed', 'rejected', 'cancelled'] as const).map((status) => (
                                            <button
                                                key={status}
                                                onClick={() => handleStatusUpdate(booking.id, status)}
                                                disabled={booking.status === status}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between
                                                    ${booking.status === status
                                                        ? 'bg-gray-100 dark:bg-gray-800/50 text-gray-400 cursor-not-allowed border border-transparent'
                                                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border border-transparent dark:hover:border-gray-600'
                                                    }
                                                `}
                                            >
                                                <span>{status}</span>
                                                {booking.status === status && <Check size={14} className="text-green-500" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
