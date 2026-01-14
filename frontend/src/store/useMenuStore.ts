import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    addItem: (item: MenuItem) => void;
    updateItem: (id: string, updates: Partial<MenuItem>) => void;
    deleteItem: (id: string) => void;
    getItem: (id: string) => MenuItem | undefined;
}

export const useMenuStore = create<MenuState>()(
    persist(
        (set, get) => ({
            items: [
                {
                    id: '1',
                    name: 'Gourmet Burger',
                    description: 'Juicy beef patty with fresh vegetables and signature sauce',
                    price: 14.99,
                    category: 'Burgers',
                    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
                    available: true
                },
                {
                    id: '2',
                    name: 'Margherita Pizza',
                    description: 'Classic tomato and mozzarella with fresh basil',
                    price: 12.99,
                    category: 'Pizza',
                    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
                    available: true
                },
                {
                    id: '3',
                    name: 'Caesar Salad',
                    description: 'Crisp romaine lettuce with parmesan and croutons',
                    price: 9.99,
                    category: 'Salads',
                    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
                    available: true
                },
                {
                    id: '4',
                    name: 'Sushi Platter',
                    description: 'Assorted fresh sushi rolls and nigiri',
                    price: 24.99,
                    category: 'Japanese',
                    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
                    available: true
                },
                {
                    id: '5',
                    name: 'Pasta Carbonara',
                    description: 'Creamy pasta with pancetta and black pepper',
                    price: 16.99,
                    category: 'Pasta',
                    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
                    available: true
                },
                {
                    id: '6',
                    name: 'Chocolate Lava Cake',
                    description: 'Warm chocolate cake with a molten center',
                    price: 8.99,
                    category: 'Dessert',
                    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
                    available: true
                }
            ],
            addItem: (item) => set((state) => ({ items: [...state.items, item] })),
            updateItem: (id, updates) => set((state) => ({
                items: state.items.map((item) => item.id === id ? { ...item, ...updates } : item)
            })),
            deleteItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),
            getItem: (id) => get().items.find((item) => item.id === id),
        }),
        {
            name: 'menu-storage',
        }
    )
);
