import { useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, GitCompare } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { addToCompare, removeFromCompare } from '../store/slices/compareSlice';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from '../store/slices/usersApiSlice';
import { toast } from 'react-toastify';

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
    <div className="card h-full flex flex-col group">
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden">
        <div className="w-full aspect-[4/3] overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
            />
        </div>
        <button 
          onClick={toggleWishlist}
          className={`absolute top-2 left-2 p-2 rounded-full shadow-md transition-all ${isInWishlist ? 'bg-primary-600 text-white' : 'bg-white/80 text-gray-600 hover:bg-white hover:text-primary-600'}`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
        {product.countInStock === 0 && (
          <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded">
            SOLD OUT
          </div>
        )}
        {product.countInStock > 0 && product.countInStock <= 5 && (
          <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded flex items-center">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1 animate-pulse"></span>
            LOW STOCK
          </div>
        )}
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <div className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">{product.brand}</div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-gray-900 font-bold mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-1 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.numReviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-black text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          <div className="flex space-x-2">
            <button
                onClick={handleToggleCompare}
                className={`p-2 rounded-lg transition-all transform active:scale-95 ${isInCompare ? 'bg-primary-100 text-primary-600' : 'bg-gray-50 text-gray-400 hover:bg-primary-50 hover:text-primary-600'}`}
                title="Compare"
            >
                <GitCompare className="w-5 h-5" />
            </button>
            <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all transform active:scale-95 disabled:opacity-30 disabled:hover:bg-gray-50 disabled:hover:text-gray-600"
                title="Add to Cart"
            >
                <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
