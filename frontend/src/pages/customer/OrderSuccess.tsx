import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg w-full">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-500" size={40} />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                <p className="text-gray-500 mb-8">
                    Thank you for your order. We have received it and will begin processing it right away.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Order ID</span>
                        <span className="font-bold text-gray-900">#ORD-12345</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Estimated Time</span>
                        <span className="font-bold text-gray-900">30 - 45 mins</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link
                        to="/track-order"
                        className="block w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                    >
                        Track Order
                    </Link>
                    <Link
                        to="/"
                        className="block w-full bg-white text-gray-900 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
