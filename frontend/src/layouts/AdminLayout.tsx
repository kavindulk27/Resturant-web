import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Menu, ShoppingBag, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function AdminLayout() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                        <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800">Admin Panel</span>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-3">
                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </Link>
                        <Link to="/admin/menu" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                            <Menu size={20} />
                            <span>Menu Items</span>
                        </Link>
                        <Link to="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                            <ShoppingBag size={20} />
                            <span>Orders</span>
                        </Link>
                        <Link to="/admin/stock" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center border-2 border-current rounded-sm text-xs font-bold">S</div>
                            <span>Stock</span>
                        </Link>
                        <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                            <Settings size={20} />
                            <span>Settings</span>
                        </Link>
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
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                </header>
                <div className="p-8 dark:text-gray-200">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
