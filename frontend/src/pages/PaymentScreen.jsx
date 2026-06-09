import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../store/slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { FadeIn, ShinyButton } from '@hemanath-afk/afk-motion';

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
      <FadeIn duration={0.4}>
        <CheckoutSteps step1 step2 step3 />
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Payment Method</h1>

        <form onSubmit={submitHandler} className="space-y-8">
          <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Method</label>
              
              <div className={`flex items-center space-x-3 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'PayPal' ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/20' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500'}`} onClick={() => setPaymentMethod('PayPal')}>
                  <input
                      type="radio"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === 'PayPal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary-600 dark:text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500 bg-white dark:bg-gray-900"
                  />
                  <label htmlFor="PayPal" className="font-bold text-gray-900 dark:text-white flex-grow cursor-pointer text-left">PayPal or Credit Card</label>
              </div>

              <div className={`flex items-center space-x-3 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'Cash on Delivery' ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/20' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500'}`} onClick={() => setPaymentMethod('Cash on Delivery')}>
                  <input
                      type="radio"
                      id="COD"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary-600 dark:text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500 bg-white dark:bg-gray-900"
                  />
                  <label htmlFor="COD" className="font-bold text-gray-900 dark:text-white flex-grow cursor-pointer text-left">Cash on Delivery</label>
              </div>
          </div>

          <div className="flex">
            <ShinyButton type="submit" className="w-full btn-primary py-4 font-black rounded-2xl cursor-pointer">
              <span className="flex items-center justify-center">
                Continue to Place Order
              </span>
            </ShinyButton>
          </div>
        </form>
      </FadeIn>
    </FormContainer>
  );
};

export default PaymentScreen;
