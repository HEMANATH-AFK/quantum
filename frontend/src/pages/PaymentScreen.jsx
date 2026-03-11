import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-3xl font-black text-gray-900 mb-8">Payment Method</h1>

      <form onSubmit={submitHandler} className="space-y-8">
        <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Select Method</label>
            <div className="flex items-center space-x-3 p-4 border border-primary-600 bg-primary-50 rounded-2xl">
                <input
                    type="radio"
                    id="PayPal"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="PayPal" className="font-bold text-gray-900 flex-grow cursor-pointer">PayPal or Credit Card</label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-2xl">
                <input
                    type="radio"
                    id="COD"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="COD" className="font-bold text-gray-900 flex-grow cursor-pointer text-left">Cash on Delivery</label>
            </div>
            {/* Additional methods like Stripe could be added here */}
        </div>

        <button type="submit" className="w-full btn-primary py-4 font-black">
          Continue to Place Order
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
