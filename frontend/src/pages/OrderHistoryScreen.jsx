import { Link } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../store/slices/ordersApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { ChevronRight, PackageCheck } from 'lucide-react';
import { FadeIn } from '@hemanath-afk/afk-motion';

const OrderHistoryScreen = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <FadeIn duration={0.4}>
      <div className="space-y-8 text-left transition-colors duration-300">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-primary-50 dark:bg-primary-950/40 p-3 rounded-2xl">
              <PackageCheck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">Order <span className="text-primary-600 dark:text-primary-400">History</span></h1>
        </div>

        {isLoading ? (
          <Loader className="w-full h-96" />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : orders.length === 0 ? (
          <Message>You haven't placed any orders yet.</Message>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-gray-100 dark:border-gray-750 shadow-sm bg-white dark:bg-gray-800">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-750">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">ID</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Paid</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Delivered</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-750">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-750/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px]">{order._id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-450 font-medium">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-6 py-4 text-sm font-black text-gray-900 dark:text-white">₹{order.totalPrice.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 italic">
                      {order.isPaid ? (
                        <span className="text-green-600 dark:text-green-400 font-bold px-3 py-1 bg-green-50 dark:bg-green-950/20 rounded-full text-xs tracking-tighter uppercase">Paid</span>
                      ) : (
                        <span className="text-red-500 dark:text-red-400 font-bold px-3 py-1 bg-red-50 dark:bg-red-950/20 rounded-full text-xs tracking-tighter uppercase">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 italic">
                      {order.isDelivered ? (
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold px-3 py-1 bg-indigo-50 dark:bg-indigo-950/20 rounded-full text-xs tracking-tighter uppercase font-medium">Delivered</span>
                      ) : (
                        <span className="text-orange-500 dark:text-orange-400 font-bold px-3 py-1 bg-orange-50 dark:bg-orange-950/20 rounded-full text-xs tracking-tighter uppercase font-medium">Shipped</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/order/${order._id}`} className="flex items-center text-primary-600 dark:text-primary-400 font-bold text-sm hover:underline">
                          Details <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default OrderHistoryScreen;
