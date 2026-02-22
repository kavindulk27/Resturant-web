import { create } from 'zustand';
import api from '../api/axios';

export interface StockItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    threshold: number;
    category: string;
}

interface StockState {
    items: StockItem[];
    isLoading: boolean;
    error: string | null;
    fetchStock: () => Promise<void>;
    addItem: (item: Omit<StockItem, 'id'>) => Promise<void>;
    updateStock: (id: string, quantity: number) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
}

export const useStockStore = create<StockState>((set) => ({
    items: [],
    isLoading: false,
    error: null,

    fetchStock: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('stock/items/');
            const mappedData = response.data.map((item: any) => ({
                id: item.id.toString(),
                name: item.name,
                quantity: parseFloat(item.quantity),
                unit: item.unit,
                threshold: item.threshold,
                category: item.category_name || item.category
            }));
            set({ items: mappedData, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    addItem: async (item) => {
        set({ isLoading: true });
        try {
            const response = await api.post('stock/items/', item);
            set((state) => ({ items: [...state.items, response.data], isLoading: false }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateStock: async (id, quantity) => {
        set({ isLoading: true });
        try {
            await api.patch(`stock/items/${id}/`, { quantity });
            set((state) => ({
                items: state.items.map((item) => item.id === id ? { ...item, quantity } : item),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    removeItem: async (id) => {
        set({ isLoading: true });
        try {
            await api.delete(`stock/items/${id}/`);
            set((state) => ({
                items: state.items.filter((item) => item.id !== id),
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
