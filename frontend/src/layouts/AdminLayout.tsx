import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Menu as MenuIcon,
    ShoppingBag,
    Settings,
    LogOut,
    Home,
    X,
    Menu,
    Calendar,
    ChevronRight,
    Search,
    Bell,
    User
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuthStore();
    const { theme, setTheme } = useThemeStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (isLoggingOut) return;
        if (!isAuthenticated || user?.role !== 'admin') {
            navigate('/admin/login');
        }
    }, [isAuthenticated, user, navigate, isLoggingOut]);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        setIsLoggingOut(true);
        navigate('/');
        logout();
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/bookings', icon: Calendar, label: 'Bookings' },
        { path: '/admin/menu', icon: MenuIcon, label: 'Menu Items' },
        { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
        { path: '/admin/stock', icon: null, label: 'Stock', customIcon: <div className="w-5 h-5 flex items-center justify-center border-2 border-current rounded-sm text-[10px] font-bold">S</div> },
        { path: '/admin/settings', icon: Settings, label: 'Settings' }
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#1E293B] text-slate-300">
            <div className="h-20 flex items-center px-6 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <span className="text-white font-black text-xl">F</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-bold text-lg leading-none">Foodie</span>
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider mt-1 font-semibold">Admin Portal</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4">
                <div className="mb-4">
                    <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main Menu</p>
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                        : 'hover:bg-slate-800 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.customIcon ? item.customIcon : <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />}
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </div>
                                    {isActive && <ChevronRight size={14} />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-3 py-2.5 text-slate-400 rounded-xl hover:bg-slate-800 hover:text-white transition-all group"
                    >
                        <Home size={20} className="group-hover:text-orange-500 transition-colors" />
                        <span className="text-sm font-medium">Back to Website</span>
                    </Link>
                </div>
            </div>

            <div className="p-4 bg-slate-900/50 mt-auto border-t border-slate-800">
                <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center text-white overflow-hidden shadow-inner">
                        {user?.name ? (
                            <span className="font-bold text-sm uppercase">{user.name.charAt(0)}</span>
                        ) : (
                            <User size={20} />
                        )}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-white text-sm font-bold truncate">{user?.name || 'Administrator'}</span>
                        <span className="text-slate-500 text-[10px] truncate">{user?.email || 'admin@foodie.com'}</span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all border border-red-500/20"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );

    const activePage = navItems.find(item => item.path === location.pathname);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex font-sans antialiased text-slate-900 dark:text-slate-100 italic-none">
            {/* Desktop Sidebar */}
            <aside className="w-72 hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl z-20 overflow-hidden">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 bg-white z-50 flex flex-col lg:hidden shadow-2xl"
                        >
                            <SidebarContent />
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="absolute top-5 -right-12 p-2 bg-white rounded-xl text-slate-900 shadow-lg"
                            >
                                <X size={24} />
                            </button>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative w-full overflow-hidden min-h-screen">
                <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 transition-all duration-300">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex flex-col">
                            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">
                                {activePage?.label || 'Dashboard'}
                            </h2>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                <span>Admin</span>
                                <ChevronRight size={10} />
                                <span className="text-orange-500">{activePage?.label || 'Overview'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-5">
                        {/* Theme Toggle Button */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2.5 text-slate-400 hover:text-orange-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M22 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                            )}
                        </button>

                        <button className="relative p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                            <Bell size={22} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                        </button>

                        <div className="h-10 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden lg:block"></div>

                        <div className="flex items-center gap-3 pl-2">
                            <div className="hidden lg:flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-800 dark:text-white leading-none">{user?.name}</span>
                                <span className="text-[10px] text-orange-500 font-bold uppercase mt-1 tracking-tighter">Super Admin</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 shadow-sm">
                                <User size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 lg:p-10 flex-1 overflow-y-auto scroll-smooth">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
