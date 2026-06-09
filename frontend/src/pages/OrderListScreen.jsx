import { useGetOrdersQuery } from '../store/slices/ordersApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { ShoppingBag, ChevronRight, XCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '@hemanath-afk/afk-motion';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <FadeIn duration={0.4}>
      <div className="space-y-8 text-left transition-colors duration-300">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-primary-50 dark:bg-primary-950/40 p-3 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">Manage <span className="text-primary-600 dark:text-primary-400">Orders</span></h1>
        </div>

        {isLoading ? (
          <Loader className="w-full h-96" />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-gray-100 dark:border-gray-750 shadow-xl bg-white dark:bg-gray-800">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-750 italic">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">ID</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">User</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">Total</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">Paid</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">Delivered</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-750">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-750/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-gray-400 dark:text-gray-500 underline underline-offset-4 decoration-primary-200 dark:decoration-primary-950/40 decoration-4">{order._id.substring(0, 10)}...</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{order.user && order.user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-medium">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-6 py-4 text-sm font-black text-gray-900 dark:text-white">₹{order.totalPrice.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 italic">
                      <div className="flex justify-center">
                      {order.isPaid ? (
                        <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                      )}
                      </div>
                    </td>
                    <td className="px-6 py-4 italic">
                      <div className="flex justify-center">
                      {order.isDelivered ? (
                        <CheckCircle className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-orange-500 dark:text-orange-450" />
                      )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/order/${order._id}`} className="flex items-center justify-end text-primary-600 dark:text-primary-400 font-bold text-sm hover:underline">
                          Review <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
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

export default OrderListScreen;
