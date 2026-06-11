import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Star, Heart, GitCompare, ShoppingCart, Plus, Minus, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { closeQuickView } from '../store/slices/quickViewSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToCompare, removeFromCompare } from '../store/slices/compareSlice';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from '../store/slices/usersApiSlice';
import { toast } from 'react-toastify';

const QuickViewModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, product } = useSelector((state) => state.quickView);
  const { compareItems } = useSelector((state) => state.compare);
  const { userInfo } = useSelector((state) => state.auth);

  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !userInfo || !product });
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const [qty, setQty] = useState(1);

  // Reset qty when product changes
  useEffect(() => {
    setQty(1);
  }, [product]);

  if (!isOpen || !product) return null;

  const isInWishlist = wishlist?.some((item) => item?._id === product._id);
  const isInCompare = compareItems?.some((item) => item._id === product._id);

  const handleClose = () => {
    dispatch(closeQuickView());
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart');
    handleClose();
  };

  const handleToggleCompare = () => {
    if (isInCompare) {
      dispatch(removeFromCompare(product._id));
      toast.info('Removed from compare');
    } else {
      if (compareItems.length >= 4) {
        toast.warning('You can only compare up to 4 items max. The oldest item was replaced.');
      }
      dispatch(addToCompare(product));
      toast.success('Added to compare');
    }
  };

  const toggleWishlist = async () => {
    if (!userInfo) {
      handleClose();
      navigate('/login');
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id).unwrap();
        toast.info('Removed from wishlist');
      } else {
        await addToWishlist({ productId: product._id }).unwrap();
        toast.success('Added to wishlist');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Stock Urgency Metrics
  const isOutOfStock = product.countInStock === 0;
  const isLowStock = product.countInStock > 0 && product.countInStock <= 5;
  const stockBarPercent = Math.min((product.countInStock / 15) * 100, 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Modal Container */}
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row transform scale-100 transition-all duration-300 z-10">
        
        {/* Close button in top-right */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Product Image Showcase */}
        <div className="w-full md:w-1/2 p-8 bg-gray-50 dark:bg-gray-950 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-850">
          <span className="absolute top-4 left-4 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
          <div className="w-full aspect-square max-w-[280px] flex items-center justify-center overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Controls */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between text-left">
          <div className="space-y-4">
            {/* Brand / Title */}
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">{product.brand}</p>
              <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight mt-1 line-clamp-2">
                {product.name}
              </h2>
            </div>

            {/* Ratings & Price */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-250 dark:text-gray-700'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-450 dark:text-gray-500 font-semibold">({product.numReviews} reviews)</span>
              </div>
              <span className="text-gray-300 dark:text-gray-750">|</span>
              <div className="font-black text-2xl text-gray-950 dark:text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Quick Description */}
            <p className="text-sm text-gray-600 dark:text-gray-350 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Stock Progress Bar / Urgency Alert */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  {isOutOfStock ? (
                    <>
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 dark:text-red-400 font-black">Out of Stock</span>
                    </>
                  ) : isLowStock ? (
                    <>
                      <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
                      <span className="text-orange-600 dark:text-orange-400 font-black">Only {product.countInStock} items left!</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-black">In Stock & Ready to Ship</span>
                    </>
                  )}
                </span>
                {!isOutOfStock && (
                  <span className="text-gray-400 dark:text-gray-500 font-semibold">{product.countInStock} available</span>
                )}
              </div>
              {!isOutOfStock && (
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isLowStock ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${stockBarPercent}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-gray-800 mt-6">
            {!isOutOfStock && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Quantity</span>
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-850 p-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-black text-sm text-gray-900 dark:text-white">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.countInStock, q + 1))}
                    className="w-8 h-8 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 btn-primary py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary-500/10"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              
              <button
                onClick={toggleWishlist}
                className={`w-12 h-12 border rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  isInWishlist
                    ? 'border-pink-200 bg-pink-50 text-pink-600 dark:bg-pink-950/20 dark:border-pink-900/30 dark:text-pink-400'
                    : 'border-gray-250 dark:border-gray-700 text-gray-400 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950/10 hover:border-pink-200'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleToggleCompare}
                className={`w-12 h-12 border rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  isInCompare
                    ? 'border-primary-200 bg-primary-50 text-primary-600 dark:bg-primary-950/20 dark:border-primary-900/30 dark:text-primary-400'
                    : 'border-gray-250 dark:border-gray-700 text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/10 hover:border-primary-200'
                }`}
                title="Compare"
              >
                <GitCompare className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => {
                handleClose();
                navigate(`/product/${product._id}`);
              }}
              className="w-full text-center text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline pt-2 block cursor-pointer"
            >
              View Full Details & Technical Specifications →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuickViewModal;
