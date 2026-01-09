import { Plus } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

interface ProductProps {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

export default function ProductCard({ id, name, price, image, description, category }: ProductProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({ id, name, price, image });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {category}
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{name}</h3>
                    <span className="text-lg font-bold text-orange-600">${price.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{description}</p>

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
