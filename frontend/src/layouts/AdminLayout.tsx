import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Menu as MenuIcon, ShoppingBag, Settings, LogOut, Home, X, Menu, Calendar } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuthStore();
    const { setTheme } = useThemeStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            navigate('/admin/login');
        }
    }, [isAuthenticated, user, navigate]);

    // Force light mode in admin panel
    useEffect(() => {
        setTheme('light');
    }, [setTheme]);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const SidebarContent = () => (
        <>
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Admin Panel</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors mb-4 border-b border-gray-100 pb-4">
                        <Home size={20} />
                        <span className="font-semibold">View Website</span>
                    </Link>
                    {[
                        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { path: '/admin/bookings', icon: Calendar, label: 'Bookings' },
                        { path: '/admin/menu', icon: MenuIcon, label: 'Menu Items' },
                        { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
                        { path: '/admin/stock', icon: null, label: 'Stock', customIcon: <div className="w-5 h-5 flex items-center justify-center border-2 border-current rounded-sm text-xs font-bold">S</div> },
                        { path: '/admin/settings', icon: Settings, label: 'Settings' }
                    ].map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${location.pathname === item.path
                                ? 'bg-gray-900 text-white shadow-lg'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {item.customIcon ? item.customIcon : <item.icon size={20} />}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 w-full transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Desktop Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
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
                            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-64 bg-white z-50 flex flex-col md:hidden shadow-2xl"
                        >
                            <SidebarContent />
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500"
                            >
                                <X size={20} />
                            </button>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative w-full overflow-hidden">
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Dashboard</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                </header>
                <div className="p-4 md:p-8 dark:text-gray-200 overflow-y-auto flex-1 scrollbar-hide">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
