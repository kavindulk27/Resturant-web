import React from 'react';
import toast from 'react-hot-toast';
import { useSettingsStore } from '../../store/useSettingsStore';

export default function Settings() {
    const {
        restaurantName,
        address,
        contactPhone,
        openingTime,
        closingTime,
        updateSettings
    } = useSettingsStore();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        updateSettings({
            restaurantName: formData.get('restaurantName') as string,
            address: formData.get('address') as string,
            contactPhone: formData.get('contactPhone') as string,
            openingTime: formData.get('openingTime') as string,
            closingTime: formData.get('closingTime') as string,
        });

        toast.success('Settings updated successfully');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Restaurant Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                            <input
                                name="restaurantName"
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                defaultValue={restaurantName}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                name="address"
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                defaultValue={address}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                            <input
                                name="contactPhone"
                                type="text"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                defaultValue={contactPhone}
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-bold text-gray-900 mt-10 mb-6 border-b border-gray-100 pb-4">Operating Hours</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                            <input
                                name="openingTime"
                                type="time"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                defaultValue={openingTime}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                            <input
                                name="closingTime"
                                type="time"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                                defaultValue={closingTime}
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button type="submit" className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
