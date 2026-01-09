import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderFailed() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg w-full">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="text-red-500" size={40} />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Failed</h1>
                <p className="text-gray-500 mb-8">
                    Something went wrong while processing your payment. Please try again or contact support.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/checkout"
                        className="block w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors"
                    >
                        Retry Payment
                    </Link>
                    <Link
                        to="/contact"
                        className="block w-full bg-white text-gray-900 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}
