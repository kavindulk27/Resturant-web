import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, LogOut, LogIn, Menu } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import ThemeToggle from '../ui/ThemeToggle';
import Logo from '../ui/Logo';
import { useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = useCartStore((state) => state.items);
    const { user, isAuthenticated, logout } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:bg-gray-950/90 dark:border-gray-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="group flex items-center">
                        <Logo />
                        <span className="ml-3 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">

                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-10">
                        {['Home', 'Menu', 'About', 'Contact'].map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                            const isActive = location.pathname === path;
                            return (
                                <Link
                                    key={item}
                                    to={path}
                                    className={`relative font-medium transition-all duration-300
                                        ${isActive
                                            ? 'text-orange-600 dark:text-orange-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-orange-500 after:w-full'
                                            : 'text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-500 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full'
                                        }`}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-6">
                        <ThemeToggle />

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative group p-2 rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-200"
                        >
                            <ShoppingCart size={24} className="text-gray-700 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-gradient-to-br from-orange-500 to-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full shadow-lg animate-pulse">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        {/* Auth Section */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        {user?.name}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 group"
                                    title="Logout"
                                >
                                    <LogOut size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm overflow-hidden shadow-xl hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105"
                            >
                                <span className="relative flex items-center gap-2">
                                    <LogIn size={18} />
                                    Login
                                </span>
                                <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full"></span>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Menu size={24} className="text-gray-700 dark:text-gray-200" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-2xl border-t border-gray-200 dark:bg-gray-950/95 dark:border-gray-800">
                        <div className="px-6 py-6 space-y-4">
                            {['Home', 'Menu', 'About', 'Contact'].map((item) => {
                                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                                const isActive = location.pathname === path;
                                return (
                                    <Link
                                        key={item}
                                        to={path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block py-3 text-lg font-medium transition-colors
                                            ${isActive
                                                ? 'text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-900/10 pl-4 border-l-4 border-orange-500'
                                                : 'text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-500'
                                            }`}
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}