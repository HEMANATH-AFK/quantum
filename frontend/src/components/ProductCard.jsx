import { useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, GitCompare, Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToCompare, removeFromCompare } from '../store/slices/compareSlice';
import { openQuickView } from '../store/slices/quickViewSlice';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from '../store/slices/usersApiSlice';
import { toast } from 'react-toastify';
import { TiltCard } from '@hemanath-afk/afk-motion';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { compareItems } = useSelector((state) => state.compare);
  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !userInfo });
  
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isInWishlist = wishlist?.some((item) => item?._id === product._id);
  const isInCompare = compareItems?.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success('Added to cart');
  };

  const handleToggleCompare = (e) => {
    e.preventDefault();
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

  const toggleWishlist = async (e) => {
    e.preventDefault();
    if (!userInfo) {
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

  return (
    <TiltCard className="h-full">
      <div className="card h-full flex flex-col group dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
        <Link to={`/product/${product._id}`} className="block relative overflow-hidden group/img">
          <div className="w-full aspect-square overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              />
          </div>
          {/* Quick View Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(openQuickView(product));
              }}
              className="bg-white/95 dark:bg-gray-900/95 text-gray-900 dark:text-white font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl text-xs cursor-pointer border border-gray-150/10"
            >
              <Eye className="w-4 h-4" /> Quick View
            </button>
          </div>
          <button 
            onClick={toggleWishlist}
            className={`absolute top-3 left-3 p-2 rounded-full shadow-md transition-all z-20 ${isInWishlist ? 'bg-primary-600 dark:bg-primary-500 text-white' : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-750 hover:text-primary-600 dark:hover:text-primary-400'}`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          {product.countInStock === 0 && (
            <div className="absolute top-3 right-3 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-1 rounded z-20">
              SOLD OUT
            </div>
          )}
          {product.countInStock > 0 && product.countInStock <= 5 && (
            <div className="absolute top-3 right-3 bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-[10px] font-bold px-2 py-1 rounded flex items-center z-20">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1 animate-pulse"></span>
              LOW STOCK
            </div>
          )}
        </Link>

        <div className="p-4 flex-grow flex flex-col">
          <div className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-1 uppercase tracking-wider">{product.brand}</div>
          <Link to={`/product/${product._id}`}>
            <h3 className="text-gray-900 dark:text-white font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-1 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200 dark:text-gray-750'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">({product.numReviews})</span>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-xl font-black text-gray-900 dark:text-white">₹{product.price.toLocaleString('en-IN')}</span>
            <div className="flex space-x-2">
              <button
                  onClick={handleToggleCompare}
                  className={`p-2 rounded-lg transition-all transform active:scale-95 ${isInCompare ? 'bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-600 dark:hover:text-primary-400'}`}
                  title="Compare"
              >
                  <GitCompare className="w-5 h-5" />
              </button>
              <button
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white dark:hover:text-white transition-all transform active:scale-95 disabled:opacity-30 disabled:hover:bg-gray-50 dark:disabled:hover:bg-gray-800 disabled:hover:text-gray-600 dark:disabled:hover:text-gray-300"
                  title="Add to Cart"
              >
                  <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ProductCard;
