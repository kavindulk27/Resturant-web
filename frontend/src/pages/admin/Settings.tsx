import React from 'react';
import toast from 'react-hot-toast';
import { useSettingsStore } from '../../store/useSettingsStore';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Store, MapPin, Phone, Clock, Bell, Shield, Palette } from 'lucide-react';

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

        toast.success('Configuration Synchronized', {
            style: {
                borderRadius: '16px',
                background: '#1e293b',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '900',
            },
        });
    };

    const container = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <div className="max-w-[1000px] mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 dark:bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-slate-900/20 dark:shadow-none">
                        <SettingsIcon size={20} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">System Settings</h1>
                </div>
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium ml-13">Configure your restaurant's core identity and operating parameters</p>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
                {/* Navigation Sidebar (Local) */}
                <div className="lg:col-span-3 space-y-2">
                    {[
                        { id: 'general', label: 'General', icon: Store, active: true },
                        { id: 'notifications', label: 'Alerts', icon: Bell },
                        { id: 'security', label: 'Security', icon: Shield },
                        { id: 'appearance', label: 'Interface', icon: Palette },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`w-full flex items-center gap-3 px-6 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${tab.active
                                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-50 dark:border-slate-800'
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <div className="lg:col-span-9">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section: Identity */}
                        <motion.div variants={item} className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/20 dark:shadow-none border border-slate-50 dark:border-slate-800 overflow-hidden">
                            <div className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
                                <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-[3px]">Establishment Identity</h2>
                            </div>
                            <div className="p-10 space-y-8">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">
                                        <Store size={12} className="text-orange-500" />
                                        Official Business Name
                                    </label>
                                    <input
                                        name="restaurantName"
                                        type="text"
                                        defaultValue={restaurantName}
                                        className="w-full px-8 py-5 rounded-[24px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 focus:ring-8 focus:ring-orange-500/5 dark:focus:ring-orange-500/10 focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">
                                        <MapPin size={12} className="text-orange-500" />
                                        Physical Address
                                    </label>
                                    <input
                                        name="address"
                                        type="text"
                                        defaultValue={address}
                                        className="w-full px-8 py-5 rounded-[24px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 focus:ring-8 focus:ring-orange-500/5 dark:focus:ring-orange-500/10 focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">
                                        <Phone size={12} className="text-orange-500" />
                                        Primary Contact Line
                                    </label>
                                    <input
                                        name="contactPhone"
                                        type="text"
                                        defaultValue={contactPhone}
                                        className="w-full px-8 py-5 rounded-[24px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 focus:ring-8 focus:ring-orange-500/5 dark:focus:ring-orange-500/10 focus:border-orange-500 dark:focus:border-orange-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-bold text-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Section: Operations */}
                        <motion.div variants={item} className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl shadow-slate-200/20 dark:shadow-none border border-slate-50 dark:border-slate-800 overflow-hidden">
                            <div className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
                                <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-[3px]">Service Schedule</h2>
                            </div>
                            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">
                                        <Clock size={12} className="text-blue-500" />
                                        Opening Hours
                                    </label>
                                    <input
                                        name="openingTime"
                                        type="time"
                                        defaultValue={openingTime}
                                        className="w-full px-8 py-5 rounded-[24px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 focus:ring-8 focus:ring-blue-500/5 dark:focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-black text-slate-800 dark:text-white text-xl text-center"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">
                                        <Clock size={12} className="text-rose-500" />
                                        Closing Hours
                                    </label>
                                    <input
                                        name="closingTime"
                                        type="time"
                                        defaultValue={closingTime}
                                        className="w-full px-8 py-5 rounded-[24px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-700 focus:ring-8 focus:ring-rose-500/5 dark:focus:ring-rose-500/10 focus:border-rose-500 dark:focus:border-rose-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all font-black text-slate-800 dark:text-white text-xl text-center"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={item} className="flex justify-end pt-6">
                            <button
                                type="submit"
                                className="group bg-slate-900 dark:bg-orange-500 text-white px-12 py-5 rounded-[24px] font-black text-[12px] uppercase tracking-[3px] flex items-center gap-4 shadow-2xl shadow-slate-900/30 dark:shadow-none hover:bg-orange-600 transition-all active:scale-[0.98]"
                            >
                                <Save size={20} className="group-hover:scale-110 transition-transform" />
                                <span>Save Configuration</span>
                            </button>
                        </motion.div>
                    </form>
                </div>
            </motion.div>

            <div className="flex items-center justify-center gap-4 py-10 opacity-20">
                <div className="h-[1px] flex-1 bg-slate-300 dark:bg-slate-800" />
                <SettingsIcon size={24} className="text-slate-400 dark:text-slate-600" />
                <div className="h-[1px] flex-1 bg-slate-300 dark:bg-slate-800" />
            </div>
        </div>
    );
}
