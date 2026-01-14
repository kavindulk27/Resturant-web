import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    addItem: (item: StockItem) => void;
    updateStock: (id: string, quantity: number) => void;
    removeItem: (id: string) => void;
}

export const useStockStore = create<StockState>()(
    persist(
        (set) => ({
            items: [
                { id: '1', name: 'Burger Buns', quantity: 150, unit: 'pcs', threshold: 50, category: 'Bakery' },
                { id: '2', name: 'Beef Patties', quantity: 80, unit: 'pcs', threshold: 40, category: 'Meat' },
                { id: '3', name: 'Tomatoes', quantity: 25, unit: 'kg', threshold: 10, category: 'Vegetables' },
                { id: '4', name: 'Lettuce', quantity: 15, unit: 'kg', threshold: 5, category: 'Vegetables' },
                { id: '5', name: 'Cheese Slices', quantity: 200, unit: 'slices', threshold: 50, category: 'Dairy' },
                { id: '6', name: 'Pizza Dough', quantity: 40, unit: 'balls', threshold: 15, category: 'Bakery' },
                { id: '7', name: 'Mozzarella', quantity: 12, unit: 'kg', threshold: 5, category: 'Dairy' },
                { id: '8', name: 'Sushi Rice', quantity: 45, unit: 'kg', threshold: 10, category: 'Grains' },
                { id: '9', name: 'Fresh Salmon', quantity: 8, unit: 'kg', threshold: 3, category: 'Seafood' },
                { id: '10', name: 'Pasta', quantity: 30, unit: 'kg', threshold: 10, category: 'Grains' },
            ],
            addItem: (item) => set((state) => ({ items: [...state.items, item] })),
            updateStock: (id, quantity) => set((state) => ({
                items: state.items.map((item) => item.id === id ? { ...item, quantity } : item)
            })),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),
        }),
        {
            name: 'stock-storage',
        }
    )
);
