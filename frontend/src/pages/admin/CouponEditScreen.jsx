import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCouponsQuery, useUpdateCouponMutation } from '../../store/slices/couponsApiSlice';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { ChevronLeft } from 'lucide-react';

const CouponEditScreen = () => {
  const { id: couponId } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // We fetch all coupons and find the one we need since we didn't define a getCouponById endpoint
  const { data: coupons, isLoading, error } = useGetCouponsQuery();
  const [updateCoupon, { isLoading: loadingUpdate }] = useUpdateCouponMutation();

  useEffect(() => {
    if (coupons) {
      const coupon = coupons.find(c => c._id === couponId);
      if (coupon) {
        setCode(coupon.code);
        setDiscount(coupon.discount);
        setIsActive(coupon.isActive);
      }
    }
  }, [coupons, couponId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateCoupon({
        _id: couponId,
        code,
        discount,
        isActive,
      }).unwrap();
      toast.success('Coupon updated successfully');
      navigate('/admin/coupons');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/coupons" className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors mb-4">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Coupons
      </Link>
      
      <FormContainer>
        <h1 className="text-3xl font-black text-gray-900 mb-8">Edit Coupon</h1>
        
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Code</label>
              <input
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="input-field uppercase"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Discount Percentage</label>
              <input
                type="number"
                placeholder="Enter discount"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="input-field"
                required
                min="1"
                max="100"
              />
            </div>

            <div className="flex items-center space-x-2 py-2">
                <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
                />
                <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Is Active
                </label>
            </div>

            <button type="submit" className="w-full btn-primary py-4 font-black">
              Update Coupon
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default CouponEditScreen;
