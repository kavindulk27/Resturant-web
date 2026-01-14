import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    activeOrderId: string | null;
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
    setActiveOrder: (orderId: string | null) => void;
    getOrder: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [],
            activeOrderId: null,
            addOrder: (order) => set((state) => ({
                orders: [order, ...state.orders],
                activeOrderId: order.id
            })),
            updateOrderStatus: (orderId, status) => set((state) => ({
                orders: state.orders.map((o) => o.id === orderId ? { ...o, status } : o)
            })),
            setActiveOrder: (orderId) => set({ activeOrderId: orderId }),
            getOrder: (orderId) => get().orders.find((o) => o.id === orderId),
        }),
        {
            name: 'order-storage',
        }
    )
);
