import { useState, useEffect } from 'react';
import { useGetSalesDataQuery } from '../../store/slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Users, Package, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';
import { AnimatedStatsCard, FadeIn } from '@hemanath-afk/afk-motion';

const DashboardScreen = () => {
  const { data, isLoading, error } = useGetSalesDataQuery();
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (isLoading) return <Loader className="min-h-[60vh]" />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  // Map real sales data trend for sparkline
  const salesSparkline = data.salesData ? data.salesData.map((d) => d.sales) : [20, 45, 28, 60, 35, 80];
  const orderSparkline = [5, 12, 8, 15, 10, 22, 18];
  const userSparkline = [10, 15, 22, 28, 35, 42, 50];
  const productSparkline = [80, 80, 82, 85, 85, 88, 92];

  const gridColor = isDark ? '#1f2937' : '#f3f4f6';
  const textColor = isDark ? '#9ca3af' : '#6b7280';
  const tooltipBg = isDark ? '#1f2937' : '#ffffff';
  const tooltipBorder = isDark ? '#374151' : '#e5e7eb';

  return (
    <FadeIn duration={0.4}>
      <div className="space-y-8 text-left transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 dark:bg-primary-950/40 p-3 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">Analytics <span className="text-primary-600 dark:text-primary-400">Dashboard</span></h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedStatsCard 
              title="Total Sales" 
              value={`₹${data.totalSales.toLocaleString('en-IN')}`} 
              sparklineData={salesSparkline}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
          />
          <AnimatedStatsCard 
              title="Total Orders" 
              value={data.totalOrders} 
              sparklineData={orderSparkline}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
          />
          <AnimatedStatsCard 
              title="Total Users" 
              value={data.totalUsers} 
              sparklineData={userSparkline}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
          />
          <AnimatedStatsCard 
              title="Total Products" 
              value={data.totalProducts} 
              sparklineData={productSparkline}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm"
          />
        </div>

        <div className="card p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 transition-colors">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Sales Overview (Last 7 Days)</h2>
          <div className="h-96 w-full text-sm font-bold">
              <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.salesData}>
                      <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: textColor}} dy={10} />
                      <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{fill: textColor}}
                          tickFormatter={(value) => `₹${value}`}
                          dx={-10}
                      />
                      <Tooltip 
                          contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                          itemStyle={{ fontWeight: 900, color: '#0ea5e9' }}
                          formatter={(value) => `₹${value}`}
                          labelStyle={{ color: textColor, fontWeight: 'bold', marginBottom: '4px' }}
                      />
                      <Area 
                          type="monotone" 
                          dataKey="sales" 
                          stroke="#0ea5e9" 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorSales)" 
                          activeDot={{ r: 8, strokeWidth: 0, fill: '#0ea5e9' }}
                      />
                  </AreaChart>
              </ResponsiveContainer>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default DashboardScreen;
