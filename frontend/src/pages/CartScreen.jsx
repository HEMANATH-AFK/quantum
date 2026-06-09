import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react';
import { addToCart, removeFromCart, saveCoupon, removeCoupon } from '../store/slices/cartSlice';
import { useVerifyCouponMutation } from '../store/slices/couponsApiSlice';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { FadeIn, ShinyButton } from '@hemanath-afk/afk-motion';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, coupon } = cart;

  const [couponCode, setCouponCode] = useState('');
  const [verifyCoupon, { isLoading: verifyingCoupon }] = useVerifyCouponMutation();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  const applyCouponHandler = async (e) => {
    e.preventDefault();
    if (!couponCode) return;
    try {
        const res = await verifyCoupon({ code: couponCode }).unwrap();
        dispatch(saveCoupon({ code: res.code, discount: res.discount }));
        toast.success(`Coupon ${res.code} applied successfully!`);
        setCouponCode('');
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
  };

  const removeCouponHandler = () => {
    dispatch(removeCoupon());
    toast.info('Coupon removed');
  };

  return (
    <FadeIn duration={0.5}>
      <div className="space-y-8 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          <div className="bg-primary-100 dark:bg-primary-950/40 p-3 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">Your <span className="text-primary-600 dark:text-primary-400">Shopping Cart</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty. <Link to="/" className="underline font-bold">Start Shopping</Link>
              </Message>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="card p-4 flex items-center space-x-6 dark:bg-gray-800 dark:border-gray-700">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-grow">
                      <Link to={`/product/${item._id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <p className="text-sm font-black text-primary-600 dark:text-primary-400 mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-1 border border-gray-100 dark:border-gray-850">
                      <button
                        onClick={() => addToCartHandler(item, item.qty - 1)}
                        disabled={item.qty === 1}
                        className="p-2 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-all disabled:opacity-30"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm text-gray-900 dark:text-white">{item.qty}</span>
                      <button
                        onClick={() => addToCartHandler(item, item.qty + 1)}
                        disabled={item.qty === item.countInStock}
                        className="p-2 hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white rounded-lg transition-all disabled:opacity-30"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24 dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              {/* Coupon Input */}
              {cartItems.length > 0 && (
                  <div className="mb-6">
                      {coupon ? (
                          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/40 text-green-800 dark:text-green-300 px-4 py-3 rounded-xl flex items-center justify-between">
                              <div className="flex items-center">
                                  <Tag className="w-4 h-4 mr-2" />
                                  <span className="font-bold">{coupon.code}</span>
                                  <span className="text-sm ml-2">(-{coupon.discount}%)</span>
                              </div>
                              <button onClick={removeCouponHandler} className="text-green-600 dark:text-green-400 hover:text-green-800">
                                  <X className="w-4 h-4" />
                              </button>
                          </div>
                      ) : (
                          <form onSubmit={applyCouponHandler} className="flex gap-2">
                              <input
                                  type="text"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value)}
                                  placeholder="Enter coupon code"
                                  className="input-field uppercase flex-grow text-sm p-2"
                              />
                              <button 
                                  type="submit" 
                                  disabled={verifyingCoupon || !couponCode}
                                  className="bg-gray-900 dark:bg-gray-750 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors duration-200"
                              >
                                  {verifyingCoupon ? '...' : 'Apply'}
                              </button>
                          </form>
                      )}
                  </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
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
                {coupon && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-bold">
                    <span>Discount ({coupon.code})</span>
                    <span>-₹{cart.discountPrice.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xl font-black text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-primary-600 dark:text-primary-400">₹{cart.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="flex">
                <ShinyButton
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}
                  className="w-full btn-primary py-4 flex items-center justify-center font-black rounded-2xl"
                >
                  <span className="flex items-center justify-center">Checkout <ArrowRight className="w-5 h-5 ml-2" /></span>
                </ShinyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default CartScreen;
