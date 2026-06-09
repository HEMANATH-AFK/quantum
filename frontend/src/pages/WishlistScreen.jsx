import { Link } from 'react-router-dom';
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from '../store/slices/usersApiSlice';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import { FadeIn, FadeUp } from '@hemanath-afk/afk-motion';

const WishlistScreen = () => {
  const { data: wishlist, isLoading, error } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const removeHandler = async (id) => {
    try {
      await removeFromWishlist(id).unwrap();
      toast.info('Removed from wishlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FadeIn duration={0.4}>
      <div className="space-y-8 pb-20 text-left transition-colors duration-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center">
              <Heart className="w-8 h-8 mr-3 text-primary-600 dark:text-primary-400 fill-current" /> My Wishlist
          </h1>
          <Link to="/" className="btn-primary px-6 py-2.5 flex items-center rounded-xl font-bold cursor-pointer">
              <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : wishlist.length === 0 ? (
          <div className="card p-20 text-center space-y-6 dark:bg-gray-800 dark:border-gray-700">
              <div className="bg-primary-50 dark:bg-primary-950/40 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-12 h-12 text-primary-200 dark:text-primary-800" />
              </div>
              <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your wishlist is empty</h3>
                  <p className="text-gray-400 dark:text-gray-500 mt-2">Explore our tech products and save your favorites here!</p>
              </div>
              <Link to="/" className="inline-block btn-primary px-8 py-3 rounded-xl font-bold">Explore Now</Link>
          </div>
        ) : (
          <FadeUp duration={0.5}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {wishlist.map((product) => (
                <div key={product._id} className="relative group">
                    <ProductCard product={product} />
                    <button
                        onClick={() => removeHandler(product._id)}
                        className="absolute top-14 left-2 p-2 bg-white/80 dark:bg-gray-800/80 text-red-650 dark:text-red-400 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                        title="Remove from wishlist"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
              ))}
            </div>
          </FadeUp>
        )}
      </div>
    </FadeIn>
  );
};

export default WishlistScreen;
