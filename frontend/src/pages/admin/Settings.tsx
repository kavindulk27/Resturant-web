export default function Settings() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
                <h2 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Restaurant Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300" defaultValue="Foodie Restaurant" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300" defaultValue="123 Food Street, NY" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300" defaultValue="+1 234 567 8900" />
                    </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mt-10 mb-6 border-b border-gray-100 pb-4">Operating Hours</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                        <input type="time" className="w-full px-4 py-2 rounded-lg border border-gray-300" defaultValue="08:00" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                        <input type="time" className="w-full px-4 py-2 rounded-lg border border-gray-300" defaultValue="22:00" />
                    </div>
                </div>

                <div className="mt-8">
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
