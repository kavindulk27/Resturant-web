import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BookingStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled';

export interface Booking {
    id: string;
    customerName: string;
    phone: string;
    email: string;
    date: string;
    time: string;
    guests: number;
    status: BookingStatus;
    createdAt: string;
    specialRequest?: string;
}

interface BookingState {
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    updateBookingStatus: (id: string, status: BookingStatus) => void;
    getBooking: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            bookings: [],
            addBooking: (booking) => set((state) => ({
                bookings: [booking, ...state.bookings]
            })),
            updateBookingStatus: (id, status) => set((state) => ({
                bookings: state.bookings.map((b) => b.id === id ? { ...b, status } : b)
            })),
            getBooking: (id) => get().bookings.find((b) => b.id === id),
        }),
        {
            name: 'booking-storage',
        }
    )
);
