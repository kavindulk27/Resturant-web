import { create } from 'zustand';
import api from '../api/axios';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled' | 'ready-for-pickup' | 'picked-up';

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface Order {
    id: string;
    items: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    status: OrderStatus;
    customerName: string;
    phone: string;
    address: string;
    deliveryMethod: 'delivery' | 'pickup';
    paymentMethod: 'cash' | 'card';
    location?: { lat: number; lng: number; address?: string };
    createdAt: string;
    estimatedArrival: string;
}

interface OrderState {
    orders: Order[];
    isLoading: boolean;
    error: string | null;
    activeOrderId: string | null;
    fetchOrders: () => Promise<void>;
    addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => Promise<void>;
    updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
    setActiveOrder: (orderId: string | null) => void;
    getOrder: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>((set, get) => ({
    orders: [],
    isLoading: false,
    error: null,
    activeOrderId: null,

    fetchOrders: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('orders/');
            const mappedData = response.data.map((o: any) => ({
                id: o.id.toString(),
                items: (o.items || []).map((item: any) => ({
                    ...item,
                    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price
                })),
                subtotal: parseFloat(o.subtotal || 0),
                deliveryFee: parseFloat(o.delivery_fee || 0),
                total: parseFloat(o.total || 0),
                status: o.status,
                customerName: o.customer_name,
                phone: o.phone,
                address: o.address,
                deliveryMethod: o.delivery_method,
                paymentMethod: o.payment_method,
                createdAt: o.created_at,
                estimatedArrival: o.estimated_arrival
            }));
            set({ orders: mappedData, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    addOrder: async (orderData) => {
        set({ isLoading: true });
        try {
            const response = await api.post('orders/', {
                customer_name: orderData.customerName,
                phone: orderData.phone,
                address: orderData.address,
                delivery_method: orderData.deliveryMethod,
                payment_method: orderData.paymentMethod,
                subtotal: orderData.subtotal,
                delivery_fee: orderData.deliveryFee,
                total: orderData.total,
                // Items would usually be sent here too if processed individually
            });
            set((state) => ({
                orders: [response.data, ...state.orders],
                activeOrderId: response.data.id.toString(),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateOrderStatus: async (orderId, status) => {
        set({ isLoading: true });
        try {
            await api.patch(`orders/${orderId}/`, { status });
            set((state) => ({
                orders: state.orders.map((o) => o.id === orderId ? { ...o, status } : o),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    setActiveOrder: (orderId) => set({ activeOrderId: orderId }),
    getOrder: (orderId) => get().orders.find((o) => o.id === orderId),
}));
