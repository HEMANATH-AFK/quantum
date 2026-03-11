import { useGetSalesDataQuery } from '../../store/slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Users, Package, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="card p-6 flex items-center space-x-4">
    <div className={`p-4 rounded-2xl ${colorClass}`}>
      <Icon className="w-8 h-8" />
    </div>
    <div>
      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-black text-gray-900 mt-1">{value}</h3>
    </div>
  </div>
);

const DashboardScreen = () => {
  const { data, isLoading, error } = useGetSalesDataQuery();

  if (isLoading) return <Loader className="min-h-[60vh]" />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center space-x-4">
        <div className="bg-primary-100 p-3 rounded-2xl">
            <TrendingUp className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900">Analytics <span className="text-primary-600">Dashboard</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Sales" 
            value={`₹${data.totalSales.toLocaleString('en-IN')}`} 
            icon={DollarSign} 
            colorClass="bg-green-100 text-green-600" 
        />
        <StatCard 
            title="Total Orders" 
            value={data.totalOrders} 
            icon={ShoppingBag} 
            colorClass="bg-blue-100 text-blue-600" 
        />
        <StatCard 
            title="Total Users" 
            value={data.totalUsers} 
            icon={Users} 
            colorClass="bg-purple-100 text-purple-600" 
        />
        <StatCard 
            title="Total Products" 
            value={data.totalProducts} 
            icon={Package} 
            colorClass="bg-orange-100 text-orange-600" 
        />
      </div>

      <div className="card p-6 md:p-8">
        <h2 className="text-xl font-black text-gray-900 mb-6">Sales Overview (Last 7 Days)</h2>
        <div className="h-96 w-full text-sm font-bold">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.salesData}>
                    <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} dy={10} />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#6b7280'}}
                        tickFormatter={(value) => `₹${value}`}
                        dx={-10}
                    />
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        itemStyle={{ fontWeight: 900, color: '#4f46e5' }}
                        formatter={(value) => `₹${value}`}
                        labelStyle={{ color: '#6b7280', fontWeight: 'bold', marginBottom: '4px' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#4f46e5" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorSales)" 
                        activeDot={{ r: 8, strokeWidth: 0, fill: '#4f46e5' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
