import { AlertTriangle, Plus } from 'lucide-react';

export default function StockManagement() {
    const stockItems = [
        { id: 1, name: 'Burger Buns', quantity: 200, unit: 'pcs', minLevel: 50, status: 'In Stock' },
        { id: 2, name: 'Beef Patties', quantity: 45, unit: 'pcs', minLevel: 50, status: 'Low Stock' },
        { id: 3, name: 'Cheese Slices', quantity: 100, unit: 'slices', minLevel: 30, status: 'In Stock' },
        { id: 4, name: 'Lettuce', quantity: 5, unit: 'kg', minLevel: 10, status: 'Low Stock' },
        { id: 5, name: 'Tomato Sauce', quantity: 20, unit: 'bottles', minLevel: 5, status: 'In Stock' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-orange-600 transition-colors">
                    <Plus size={20} /> Add Stock
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Item Name</th>
                                <th className="px-6 py-4">Current Stock</th>
                                <th className="px-6 py-4">Min. Level</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stockItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                    <td className="px-6 py-4 text-gray-900 font-bold">
                                        {item.quantity} <span className="text-gray-500 font-normal text-sm">{item.unit}</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{item.minLevel} {item.unit}</td>
                                    <td className="px-6 py-4">
                                        {item.status === 'Low Stock' ? (
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600 flex items-center gap-1 w-fit">
                                                <AlertTriangle size={12} /> Low Stock
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                                                In Stock
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-orange-600 font-medium hover:underline text-sm">Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
