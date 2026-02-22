
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
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl rotate-6 shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:rotate-12"></div>

                {/* Cutlery SVG */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 w-6 h-6 text-white"
                >
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                    <path d="M7 2v20" />
                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                </svg>
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
