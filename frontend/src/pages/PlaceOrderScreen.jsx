import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import { useCreateOrderMutation } from '../store/slices/ordersApiSlice';
import { clearCartItems } from '../store/slices/cartSlice';
import { ShoppingCart, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import { FadeIn, ShinyButton } from '@hemanath-afk/afk-motion';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        discountPrice: cart.discountPrice || 0,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainerPlaceOrder>
      <FadeIn duration={0.4}>
        <CheckoutSteps step1 step2 step3 step4 />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <div className="card p-6 flex flex-col md:flex-row items-start space-x-0 md:space-x-6 space-y-4 md:space-y-0 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              <div className="bg-primary-50 dark:bg-primary-950/40 p-3 rounded-2xl">
                  <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Shipping Address</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                      {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
              </div>
            </div>

            {/* Payment */}
            <div className="card p-6 flex flex-col md:flex-row items-start space-x-0 md:space-x-6 space-y-4 md:space-y-0 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
               <div className="bg-primary-50 dark:bg-primary-950/40 p-3 rounded-2xl">
                  <CreditCard className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Payment Method</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                      {cart.paymentMethod}
                  </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="card p-6 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Order Items
              </h3>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className="space-y-4">
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 pb-4 border-b border-gray-50 dark:border-gray-750 last:border-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-grow">
                          <Link to={`/product/${item._id}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                              {item.name}
                          </Link>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase font-bold tracking-tighter">{item.qty} x ₹{item.price.toLocaleString('en-IN')} = ₹{(item.qty * item.price).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Items</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{cart.itemsPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{cart.shippingPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Tax</span>
                  <span className="font-bold text-gray-900 dark:text-white">₹{cart.taxPrice.toLocaleString('en-IN')}</span>
                </div>
                {cart.coupon && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-bold">
                    <span>Discount ({cart.coupon.code})</span>
                    <span>-₹{cart.discountPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xl font-black text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-primary-600 dark:text-primary-400">₹{cart.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {error && <Message variant="danger" className="mb-4">{error?.data?.message || 'Error placing order'}</Message>}

              <div className="flex">
                <ShinyButton
                  disabled={cart.cartItems.length === 0 || isLoading}
                  onClick={placeOrderHandler}
                  className="w-full btn-primary py-4 flex items-center justify-center font-black rounded-2xl cursor-pointer"
                >
                  <span className="flex items-center justify-center">
                    {isLoading ? 'Processing...' : 'Place Order'} <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                </ShinyButton>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </FormContainerPlaceOrder>
  );
};

const FormContainerPlaceOrder = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
