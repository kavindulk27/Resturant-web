import { create } from 'zustand';
import api from '../api/axios';

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
    isLoading: boolean;
    error: string | null;
    fetchBookings: () => Promise<void>;
    addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => Promise<void>;
    updateBookingStatus: (id: string, status: BookingStatus) => Promise<void>;
    getBooking: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingState>((set, get) => ({
    bookings: [],
    isLoading: false,
    error: null,

    fetchBookings: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('bookings/');
            const mappedData = response.data.map((b: {
                id: number;
                customer_name: string;
                phone: string;
                email: string;
                date: string;
                time: string;
                guests: number;
                status: BookingStatus;
                created_at: string;
                special_request?: string;
            }) => ({
                id: b.id.toString(),
                customerName: b.customer_name,
                phone: b.phone,
                email: b.email,
                date: b.date,
                time: b.time,
                guests: b.guests,
                status: b.status,
                createdAt: b.created_at,
                specialRequest: b.special_request
            }));
            set({ bookings: mappedData, isLoading: false });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: message, isLoading: false });
        }
    },

    addBooking: async (bookingData) => {
        set({ isLoading: true });
        try {
            const response = await api.post('bookings/', {
                customer_name: bookingData.customerName,
                phone: bookingData.phone,
                email: bookingData.email,
                date: bookingData.date,
                time: bookingData.time,
                guests: bookingData.guests,
                special_request: bookingData.specialRequest
            });
            const newBooking: Booking = {
                id: response.data.id.toString(),
                customerName: response.data.customer_name,
                phone: response.data.phone,
                email: response.data.email,
                date: response.data.date,
                time: response.data.time,
                guests: response.data.guests,
                status: response.data.status,
                createdAt: response.data.created_at,
                specialRequest: response.data.special_request
            };
            set((state) => ({ bookings: [newBooking, ...state.bookings], isLoading: false }));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: message, isLoading: false });
        }
    },

    updateBookingStatus: async (id, status) => {
        set({ isLoading: true });
        try {
            await api.patch(`bookings/${id}/`, { status });
            set((state) => ({
                bookings: state.bookings.map((b) => b.id === id ? { ...b, status } : b),
                isLoading: false
            }));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: message, isLoading: false });
        }
    },

    getBooking: (id) => get().bookings.find((b) => b.id === id),
}));
