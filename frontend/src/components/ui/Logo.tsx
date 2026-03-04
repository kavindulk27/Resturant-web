
interface LogoProps {
    className?: string;
    showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Icon */}
            <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Abstract background shape */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl rotate-6 shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:rotate-12 outline outline-1 outline-white/20"></div>

                {/* Logo Image */}
                <img
                    src="/logo.png"
                    alt="Foodie Delight Logo"
                    className="relative z-10 w-8 h-8 object-contain rounded-lg shadow-sm"
                />
            </div>

            {/* Text */}
            {showText && (
                <div className="flex flex-col -space-y-1">
                    <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-500">
                        Foodie
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold dark:text-gray-500">
                        Delight
                    </span>
                </div>
            )}
        </div>
    );
}
