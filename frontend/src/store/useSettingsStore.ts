import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingsState {
    restaurantName: string;
    address: string;
    contactPhone: string;
    openingTime: string;
    closingTime: string;
    updateSettings: (settings: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            restaurantName: 'Foodie Restaurant',
            address: '123 Food Street, NY',
            contactPhone: '+1 234 567 8900',
            openingTime: '08:00',
            closingTime: '22:00',
            updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
        }),
        {
            name: 'settings-storage',
        }
    )
);
