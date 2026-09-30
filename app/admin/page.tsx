import { PageLayout } from '@/components/layout/page-layout';
import { Users, DollarSign, ShoppingCart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Lumina internal admin panel.',
};

export default function AdminPage() {
  const stats = [
    { title: 'Total Revenue', value: '$124,563.00', change: '+12.5%', trend: 'up' },
    { title: 'Active Users', value: '2,405', change: '+18.2%', trend: 'up' },
    { title: 'Sales', value: '1,234', change: '-2.4%', trend: 'down' },
    { title: 'Conversion Rate', value: '4.3%', change: '+1.1%', trend: 'up' },
  ];

  const recentSales = [
    { user: 'Olivia Martin', email: 'olivia.m@example.com', amount: '$1,999.00', status: 'Success' },
    { user: 'Jackson Lee', email: 'j.lee@example.com', amount: '$39.00', status: 'Processing' },
    { user: 'Isabella Nguyen', email: 'isa.nguyen@example.com', amount: '$299.00', status: 'Success' },
    { user: 'William Kim', email: 'will@example.com', amount: '$99.00', status: 'Failed' },
    { user: 'Sofia Davis', email: 'sofia.d@example.com', amount: '$39.00', status: 'Success' },
  ];

  return (
    <PageLayout className="bg-neutral-950 text-white min-h-screen pt-32 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-light tracking-tight mb-2">Overview</h1>
            <p className="text-neutral-400 font-light">Welcome back, Admin.</p>
          </div>
          <button className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors">
            Download Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <p className="text-neutral-400 font-medium text-sm">{stat.title}</p>
                {i === 0 && <DollarSign className="w-5 h-5 text-neutral-500" />}
                {i === 1 && <Users className="w-5 h-5 text-neutral-500" />}
                {i === 2 && <ShoppingCart className="w-5 h-5 text-neutral-500" />}
                {i === 3 && <Activity className="w-5 h-5 text-neutral-500" />}
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-2">{stat.value}</h3>
              <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {stat.change} <span className="text-neutral-500 ml-2 font-light">from last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col">
            <h3 className="text-lg font-medium mb-1">Revenue</h3>
            <p className="text-neutral-400 text-sm font-light mb-6">Jan 1 - Dec 31, 2026</p>
            <div className="flex-1 min-h-[300px] border border-dashed border-neutral-800 rounded-xl flex items-center justify-center text-neutral-600">
              [ Revenue Chart Rendering ]
            </div>
          </div>

          {/* Recent Sales */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <h3 className="text-lg font-medium mb-1">Recent Sales</h3>
            <p className="text-neutral-400 text-sm font-light mb-6">You made 265 sales this month.</p>
            
            <div className="flex flex-col gap-6">
              {recentSales.map((sale, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center font-medium">
                      {sale.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{sale.user}</p>
                      <p className="text-neutral-500 text-xs">{sale.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{sale.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
