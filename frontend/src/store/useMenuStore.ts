import { create } from 'zustand';
import api from '../api/axios';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    available: boolean;
}

interface MenuState {
    items: MenuItem[];
    isLoading: boolean;
    error: string | null;
    fetchItems: () => Promise<void>;
    addItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
    updateItem: (id: string, updates: Partial<MenuItem>) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
    getItem: (id: string) => MenuItem | undefined;
}

export const useMenuStore = create<MenuState>((set, get) => ({
    items: [],
    isLoading: false,
    error: null,

    fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get('menu/items/');
            const mappedData = response.data.map((item: {
                id: number;
                name: string;
                description: string;
                price: string | number;
                category: string;
                image: string;
                available: boolean;
            }) => ({
                id: item.id.toString(),
                name: item.name,
                description: item.description,
                price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                category: item.category,
                image: item.image,
                available: item.available
            }));
            set({ items: mappedData, isLoading: false });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: message, isLoading: false });
        }
    },

    addItem: async (item) => {
        set({ isLoading: true });
        try {
            const response = await api.post('menu/items/', item);
            set((state) => ({ items: [...state.items, response.data], isLoading: false }));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: message, isLoading: false });
        }
    },

    updateItem: async (id, updates) => {
        set({ isLoading: true });
        try {
            const response = await api.patch(`menu/items/${id}/`, updates);
            set((state) => ({
                items: state.items.map((item) => item.id === id ? response.data : item),
                isLoading: false
            }));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: message, isLoading: false });
        }
    },

    deleteItem: async (id) => {
        set({ isLoading: true });
        try {
            await api.delete(`menu/items/${id}/`);
            set((state) => ({
                items: state.items.filter((item) => item.id !== id),
                isLoading: false
            }));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            set({ error: message, isLoading: false });
        }
    },

    getItem: (id) => get().items.find((item) => item.id === id),
}));
