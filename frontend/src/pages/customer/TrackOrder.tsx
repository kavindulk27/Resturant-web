import { Check, Clock } from 'lucide-react';

const STEPS = [
    { id: 1, label: 'Order Confirmed', time: '10:30 AM', status: 'completed' },
    { id: 2, label: 'Preparing', time: '10:35 AM', status: 'current' },
    { id: 3, label: 'Out for Delivery', time: '10:55 AM', status: 'pending' },
    { id: 4, label: 'Delivered', time: '11:15 AM', status: 'pending' },
];

export default function TrackOrder() {
    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-100">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Order ID</p>
                            <p className="text-xl font-bold text-gray-900">#ORD-12345</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Estimated Arrival</p>
                            <p className="text-xl font-bold text-orange-600">35 min</p>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100" />

                        <div className="space-y-8 relative">
                            {STEPS.map((step) => (
                                <div key={step.id} className="flex gap-6 items-start">
                                    <div className={`w-16 flex-shrink-0 z-10 flex flex-col items-center gap-1`}>
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${step.status === 'completed' ? 'bg-green-100 border-white text-green-600' :
                                            step.status === 'current' ? 'bg-orange-100 border-white text-orange-600 ring-4 ring-orange-50' :
                                                'bg-gray-50 border-white text-gray-300'
                                            }`}>
                                            {step.status === 'completed' ? <Check size={24} /> :
                                                step.status === 'current' ? <Clock size={24} className="animate-pulse" /> :
                                                    <Clock size={24} />}
                                        </div>
                                    </div>

                                    <div className={`flex-1 pt-2 ${step.status === 'pending' ? 'opacity-50' : ''}`}>
                                        <h3 className="text-lg font-bold text-gray-900">{step.label}</h3>
                                        <p className="text-gray-500 text-sm">{step.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
