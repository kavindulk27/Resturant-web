import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import {
    ArrowRight, Truck, ShieldCheck,
    Star, ChevronRight, UtensilsCrossed, Flame, Award, Users,
} from 'lucide-react';
import ProductCard from '../../components/shared/ProductCard';
import { useMenuStore } from '../../store/useMenuStore';

/* ─── static data ─────────────────────────────────────────── */
const FEATURES = [
    {
        icon: Truck,
        color: 'from-orange-500 to-red-500',
        title: 'Lightning Delivery',
        description: 'Hot & fresh at your door in under 30 minutes — guaranteed or your next order is on us.',
    },
    {
        icon: UtensilsCrossed,
        color: 'from-amber-500 to-orange-600',
        title: 'Master Chefs',
        description: 'Dishes crafted by award-winning chefs using only hand-picked premium ingredients.',
    },
    {
        icon: ShieldCheck,
        color: 'from-emerald-500 to-teal-500',
        title: 'Hygienic & Safe',
        description: 'ISO-certified kitchen processes ensuring every bite is clean, safe, and consistent.',
    },
    {
        icon: Award,
        color: 'from-purple-500 to-pink-500',
        title: 'Award Winning',
        description: 'Voted Best Restaurant 2024 — praised by food critics and thousands of loyal diners.',
    },
];

const STATS = [
    { icon: Users, value: '15K+', label: 'Happy Customers' },
    { icon: UtensilsCrossed, value: '120+', label: 'Signature Dishes' },
    { icon: Truck, value: '≤ 28min', label: 'Avg. Delivery' },
    { icon: Star, value: '4.9 ★', label: 'Average Rating' },
];

const TESTIMONIALS = [
    {
        name: 'Sophia Turner',
        role: 'Food Critic • GourmetDaily',
        content: `An extraordinary experience from start to finish. The flavors are layered and refined — this is the best restaurant I've reviewed in 2024.`,
        rating: 5,
        avatar: '👩',
    },
    {
        name: 'James Mitchell',
        role: 'Regular Customer',
        content: 'I order at least twice a week. The food is always piping hot, the packaging is premium, and the taste never disappoints.',
        rating: 5,
        avatar: '👨',
    },
    {
        name: 'Priya Sharma',
        role: 'Food Blogger • SpiceRoute',
        content: 'From the signature burger to the pasta — every dish is a masterpiece. I recommend Foodie to everyone I know.',
        rating: 5,
        avatar: '🧑',
    },
];

const MARQUEE_ITEMS = ['Burgers', 'Pizzas', 'Pasta', 'Seafood', 'Desserts', 'Sushi', 'Salads', 'Soups', 'Steaks', 'Wraps'];

/* ─── component ───────────────────────────────────────────── */
export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const { items, fetchItems } = useMenuStore();

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <div className="min-h-screen overflow-x-hidden bg-white dark:bg-gray-950">

            {/* ══════════════════════════════════════════
                HERO — full-viewport cinematic
            ══════════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Parallax background */}
                <motion.div className="absolute inset-0" style={{ y: heroY }}>
                    <motion.img
                        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90"
                        alt="Premium food spread"
                        className="w-full h-full object-cover"
                        animate={{ scale: [1.1, 1.18, 1.1] }}
                        transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
                </motion.div>

                {/* Hero content */}
                <motion.div
                    className="relative z-10 text-center px-6 max-w-6xl mx-auto"
                    style={{ opacity: heroOpacity }}
                >
                    {/* Open / closed pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur text-green-400 text-sm font-medium"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Open Now &nbsp;·&nbsp; Accepting Orders
                    </motion.div>

                    {/* Main headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="text-6xl sm:text-7xl lg:text-[6rem] font-extrabold text-white leading-[1.05] tracking-tight mb-6"
                    >
                        Food That{' '}
                        <br className="hidden sm:block" />
                        <span style={{
                            background: 'linear-gradient(to right, #fb923c, #f87171, #f472b6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            Ignites the Senses
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Premium flavors crafted by master chefs — fresh, hot, and delivered to your door in minutes.
                    </motion.p>

                    {/* CTA row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/menu"
                            className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 active:scale-100 transition-all duration-300 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative">Order Now</span>
                            <ArrowRight size={22} className="relative group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>

                        <Link
                            to="/contact"
                            className="flex items-center gap-3 px-10 py-5 rounded-2xl border-2 border-white/25 backdrop-blur bg-white/5 text-white font-bold text-lg hover:border-white/50 hover:bg-white/10 transition-all duration-300"
                        >
                            <UtensilsCrossed size={20} />
                            Reserve a Table
                        </Link>
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
                    >
                        <span className="text-xs tracking-widest uppercase">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
                        >
                            <div className="w-1 h-2 rounded-full bg-white/40" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════
                STATS BAR
            ══════════════════════════════════════════ */}
            <section className="relative z-10 -mt-1">
                <div className="bg-gradient-to-r from-orange-600 to-red-600">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex flex-wrap items-center justify-around divide-x divide-white/20">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className="flex items-center gap-3 text-white px-6 py-2"
                            >
                                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                                    <stat.icon size={18} />
                                </div>
                                <div>
                                    <p className="text-lg font-extrabold leading-none tracking-tight">{stat.value}</p>
                                    <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                MARQUEE STRIP
            ══════════════════════════════════════════ */}
            <div className="py-5 bg-gray-950 dark:bg-black overflow-hidden border-y border-gray-800">
                <motion.div
                    className="flex gap-10 whitespace-nowrap"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
                >
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-3 text-gray-400 text-sm font-medium uppercase tracking-widest">
                            <Flame size={14} className="text-orange-500 flex-shrink-0" />
                            {item}
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* ══════════════════════════════════════════
                FEATURED MENU
            ══════════════════════════════════════════ */}
            {/* ── divider ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* Section header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">Our Menu</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                                Customer{' '}
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    Favorites
                                </span>
                            </h2>
                            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-lg">
                                Top-rated dishes loved by thousands. Crafted fresh, delivered fast.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <Link
                                to="/menu"
                                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-orange-500 text-orange-600 dark:text-orange-400 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
                            >
                                Full Menu
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {items.slice(0, 4).map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.7 }}
                            >
                                <ProductCard {...item} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                FEATURES — split layout
            ══════════════════════════════════════════ */}
            {/* ── divider ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            <section className="py-16 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">

                        {/* Left — image collage */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Chef cooking"
                                    className="rounded-2xl h-64 w-full object-cover shadow-xl"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1601315379734-425a469078de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Fresh ingredients"
                                    className="rounded-2xl h-64 w-full object-cover shadow-xl mt-10"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Restaurant interior"
                                    className="rounded-2xl h-64 w-full object-cover shadow-xl -mt-10 col-span-2"
                                />
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="absolute -top-5 -right-5 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl px-5 py-4 shadow-2xl shadow-orange-500/30"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl font-extrabold">4.9</div>
                                    <div>
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-white text-white" />)}
                                        </div>
                                        <p className="text-xs text-white/80 mt-0.5">10k+ reviews</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right — features list */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                        >
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">Why Choose Us</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
                                Excellence in{' '}
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                    Every Detail
                                </span>
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-12 text-lg leading-relaxed">
                                From the kitchen to your door, we obsess over every step — so you just get to enjoy the food.
                            </p>

                            <div className="space-y-8">
                                {FEATURES.map((f, i) => (
                                    <motion.div
                                        key={f.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.12, duration: 0.6 }}
                                        className="group flex items-start gap-5"
                                    >
                                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} p-0.5 shadow-lg`}>
                                            <div className="w-full h-full rounded-2xl bg-white dark:bg-black flex items-center justify-center">
                                                <f.icon size={26} className="text-gray-800 dark:text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors duration-300">
                                                {f.title}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{f.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 mt-12 text-orange-600 dark:text-orange-400 font-semibold hover:gap-4 transition-all duration-300"
                            >
                                Our Story <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                TESTIMONIALS
            ══════════════════════════════════════════ */}
            {/* ── divider ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            <section className="py-16 bg-gray-50 dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-4">
                            What Our Diners Say
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                            Don't take our word for it — hear from the people who matter most.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7 }}
                                className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-400"
                            >
                                {/* Quote mark */}
                                <div className="absolute top-6 right-8 text-6xl font-serif text-orange-500/10 leading-none select-none">"</div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-5">
                                    {[...Array(t.rating)].map((_, s) => (
                                        <Star key={s} size={16} className="fill-orange-400 text-orange-400" />
                                    ))}
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 relative z-10">
                                    "{t.content}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-2xl shadow-sm">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                                    </div>
                                </div>

                                {/* Bottom accent */}
                                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                CTA BANNER
            ══════════════════════════════════════════ */}
            {/* ── divider ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            <section className="py-24 px-6 lg:px-8 bg-white dark:bg-black overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative rounded-[2.5rem] overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
                    >
                        {/* ── Background Layer ── */}
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90"
                                alt="Premium Cocktails & Ambiance"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Layered overlays for depth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_70%)]" />
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] pointer-events-none" />
                        </div>

                        {/* ── Animated Bokehs ── */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    x: [0, 50, -50, 0],
                                    y: [0, -30, 30, 0],
                                    opacity: [0.2, 0.4, 0.2]
                                }}
                                transition={{
                                    duration: 10 + i * 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]"
                                style={{
                                    top: `${20 + i * 30}%`,
                                    left: `${10 + i * 40}%`
                                }}
                            />
                        ))}

                        {/* ── Content Container ── */}
                        <div className="relative z-10 py-24 px-8 lg:py-32 lg:px-20 flex flex-col items-center text-center">

                            {/* Animated Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold tracking-wide mb-10 shadow-xl"
                            >
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-orange-500 bg-gray-800 flex items-center justify-center text-[10px]">
                                            ⭐
                                        </div>
                                    ))}
                                </div>
                                <span className="ml-1">Join 15k+ Premium Members</span>
                                <div className="w-1 h-1 rounded-full bg-orange-500 mx-1" />
                                <span className="text-orange-400">Open until 11 PM</span>
                            </motion.div>

                            {/* Headline */}
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight max-w-4xl">
                                Ready for Something{' '}
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 bg-clip-text text-transparent">
                                        Extraordinary?
                                    </span>
                                    {/* Underline accent */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ delay: 0.8, duration: 1 }}
                                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0"
                                    />
                                </span>
                            </h2>

                            <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl font-light leading-relaxed">
                                Elevate your dining experience with flavors that transcend the ordinary. Your masterpiece is waiting.
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                                <Link
                                    to="/menu"
                                    className="group relative w-full sm:w-auto px-12 py-5 bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold text-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all duration-300 overflow-hidden text-center"
                                >
                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                                    <span className="relative flex items-center justify-center gap-3">
                                        Experience Now
                                        <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                                    </span>
                                </Link>

                                <Link
                                    to="/contact"
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 border-2 border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-xl rounded-2xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                                >
                                    <UtensilsCrossed size={20} className="text-orange-400" />
                                    Reserve Private Table
                                </Link>
                            </div>

                            {/* Trust Indicator */}
                            <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-lg flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                                <Award size={24} className="text-white" />
                                <ShieldCheck size={24} className="text-white" />
                                <Star size={24} className="text-white" />
                                <Users size={24} className="text-white" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}