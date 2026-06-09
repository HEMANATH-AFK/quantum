import { Link } from 'react-router-dom';
import { useGetCouponsQuery, useCreateCouponMutation, useDeleteCouponMutation } from '../../store/slices/couponsApiSlice';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { FadeIn } from '@hemanath-afk/afk-motion';

const CouponListScreen = () => {
  const { data: coupons, refetch, isLoading, error } = useGetCouponsQuery();

  const [createCoupon, { isLoading: loadingCreate }] = useCreateCouponMutation();
  const [deleteCoupon, { isLoading: loadingDelete }] = useDeleteCouponMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteCoupon(id);
        toast.success('Coupon deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createCouponHandler = async () => {
    const code = window.prompt('Enter new coupon code (e.g. SUMMER20):');
    if (!code) return;
    
    const discount = window.prompt('Enter discount percentage (e.g. 20):');
    if (!discount || isNaN(discount)) {
        toast.error('Invalid discount percentage');
        return;
    }

    try {
      await createCoupon({ 
          code: code.toUpperCase(), 
          discount: Number(discount) 
      });
      toast.success('Coupon created');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FadeIn duration={0.4}>
      <div className="space-y-6 text-left transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center">
              <Tag className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400" /> Coupons
          </h1>
          <button className="btn-primary flex items-center cursor-pointer" onClick={createCouponHandler}>
            <Plus className="w-5 h-5 mr-2" /> Create Coupon
          </button>
        </div>

        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <div className="card overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="overflow-x-auto text-left">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-750">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-750">
                  {coupons.map((coupon) => (
                    <tr key={coupon._id} className="hover:bg-gray-50 dark:hover:bg-gray-750/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{coupon._id}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary-600 dark:text-primary-400 tracking-wide">{coupon.code}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{coupon.discount}%</td>
                      <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${coupon.isActive ? 'bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-950/20 text-red-700 dark:text-red-400'}`}>
                              {coupon.isActive ? 'Active' : 'Inactive'}
                          </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/admin/coupon/${coupon._id}/edit`}>
                          <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mx-2 cursor-pointer">
                            <Edit className="w-5 h-5" />
                          </button>
                        </Link>
                        <button 
                           className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                           onClick={() => deleteHandler(coupon._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default CouponListScreen;
