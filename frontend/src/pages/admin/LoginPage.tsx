import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Small artificial delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock authentication
        if (email === 'admin@foodie.com' && password === 'admin') {
            login(
                { id: 1, name: 'Admin', email, role: 'admin' },
                'mock_access_token',
                'mock_refresh_token'
            );
            navigate('/admin/dashboard');
        } else {
            setError('Account restricted to administrators only');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">


            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative w-full max-w-md"
            >
                <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    {/* Header */}
                    <div className="relative px-10 pt-12 pb-8 text-center">


                        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-slate-900 dark:bg-orange-500 flex items-center justify-center shadow-2xl shadow-slate-900/20 dark:shadow-none transform hover:scale-110 transition-transform duration-500">
                            <span className="text-white font-black text-4xl tracking-tighter">F</span>
                        </div>

                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                            Admin <span className="text-orange-500">Portal</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                            Management & Security Control Center
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="px-10 pb-10 space-y-6">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="hello@foodie.com"
                                    required
                                    autoComplete="email"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-slate-900 dark:bg-orange-500 text-white font-black text-[12px] uppercase tracking-[3px] rounded-[22px] shadow-2xl shadow-slate-900/20 dark:shadow-none hover:bg-orange-600 dark:hover:bg-orange-600 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                'Access Dashboard'
                            )}
                        </button>
                    </form>


                </div>
            </motion.div>
        </div>
    );
}