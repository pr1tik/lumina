import { PageLayout } from '@/components/layout/page-layout';
import { Package, MapPin, User, Settings, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'My Account',
  description: 'Manage your Lumina orders and settings.',
};

export default function AccountPage() {
  const mockOrders = [
    { id: '#LUM-19284', date: 'Sep 24, 2026', total: '$299.00', status: 'Delivered' },
    { id: '#LUM-18552', date: 'Aug 12, 2026', total: '$149.00', status: 'Processing' },
    { id: '#LUM-17399', date: 'May 03, 2026', total: '$1,299.00', status: 'Delivered' },
  ];

  return (
    <PageLayout className="bg-neutral-50 text-neutral-900 min-h-screen pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <h1 className="text-3xl font-light tracking-tight mb-8">My Account</h1>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm border border-neutral-100 font-medium">
                <Package className="w-4 h-4 text-neutral-500" /> Orders
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-black hover:bg-neutral-100/50 rounded-lg transition-colors">
                <User className="w-4 h-4" /> Profile
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-black hover:bg-neutral-100/50 rounded-lg transition-colors">
                <MapPin className="w-4 h-4" /> Addresses
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-neutral-500 hover:text-black hover:bg-neutral-100/50 rounded-lg transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </Link>
              <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left mt-8">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <h2 className="text-xl font-medium mb-6">Recent Orders</h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-neutral-50/50">
                      <th className="py-4 px-6 font-medium text-neutral-500 text-sm">Order ID</th>
                      <th className="py-4 px-6 font-medium text-neutral-500 text-sm">Date</th>
                      <th className="py-4 px-6 font-medium text-neutral-500 text-sm">Status</th>
                      <th className="py-4 px-6 font-medium text-neutral-500 text-sm">Total</th>
                      <th className="py-4 px-6 font-medium text-neutral-500 text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order, i) => (
                      <tr key={i} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium">{order.id}</td>
                        <td className="py-4 px-6 text-neutral-500">{order.date}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-medium">{order.total}</td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-neutral-400 hover:text-black transition-colors">
                            <ChevronRight className="w-5 h-5 ml-auto" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-lg font-medium mb-4">Default Shipping Address</h3>
                <div className="text-neutral-500 leading-relaxed font-light">
                  <p className="font-medium text-black mb-1">Jane Doe</p>
                  <p>123 Lumina Way, Apt 4B</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
                <button className="mt-6 text-sm font-medium underline underline-offset-4 hover:text-neutral-500 transition-colors">Edit Address</button>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-lg font-medium mb-4">Account Details</h3>
                <div className="text-neutral-500 leading-relaxed font-light">
                  <p className="font-medium text-black mb-1">Jane Doe</p>
                  <p>jane.doe@example.com</p>
                  <p>Password: ••••••••</p>
                </div>
                <button className="mt-6 text-sm font-medium underline underline-offset-4 hover:text-neutral-500 transition-colors">Edit Details</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageLayout>
  );
}
