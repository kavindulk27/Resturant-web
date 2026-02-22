import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';

export default function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [mode, setMode] = useState<'login' | 'register'>('login');

    useEffect(() => {
        if (location.state?.mode === 'register') {
            setMode('register');
        }
    }, [location.state]);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuthStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (mode === 'login') {
                const response = await api.post('users/login/', {
                    email,
                    password
                });

                const { user, access, refresh } = response.data;
                login(user, access, refresh);

                if (user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    setIsLoading(false);
                    return;
                }

                const response = await api.post('users/register/', {
                    name,
                    email,
                    password
                });

                const { user, access, refresh } = response.data;
                login(user, access, refresh);
                navigate('/');
            }
        } catch (err: any) {
            console.error('Auth error:', err);
            const message = err.response?.data?.error ||
                err.response?.data?.detail ||
                'An error occurred during authentication';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl flex items-center justify-center transform -rotate-6">
                        <span className="text-white text-3xl font-black">F</span>
                    </div>
                </div>

                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    {mode === 'login' ? 'Sign in to your account' : 'Join our foodie community today'}
                </p>
            </div>

            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <div className="bg-white dark:bg-gray-900 py-8 px-4 shadow-2xl border border-gray-100 dark:border-gray-800 sm:rounded-3xl sm:px-10">


                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {mode === 'register' && (
                                <motion.div
                                    key="name"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            autoComplete="off"
                                            onChange={(e) => setName(e.target.value)}
                                            className="appearance-none block w-full px-11 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="John Doe"
                                        />
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-11 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="your@email.com"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-11 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {mode === 'register' && (
                                <motion.div
                                    key="confirmPassword"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Confirm Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={confirmPassword}
                                            autoComplete="new-password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="appearance-none block w-full px-11 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white"
                                            placeholder="••••••••"
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 py-2 rounded-lg border border-red-100 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 disabled:opacity-50"
                            >
                                {isLoading
                                    ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
                                    : (mode === 'login' ? 'Sign In' : 'Create Account')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {mode === 'login' ? "New member?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                className="font-bold text-orange-600 hover:text-orange-500 transition-colors ml-1 hover:underline"
                            >
                                {mode === 'login' ? 'Create an account' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
