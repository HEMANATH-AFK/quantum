import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, GitCompare, Trash2, Check, ShoppingCart } from 'lucide-react';
import { removeFromCompare, clearCompare } from '../store/slices/compareSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { FadeIn } from '@hemanath-afk/afk-motion';

const CompareScreen = () => {
  const dispatch = useDispatch();
  const { compareItems } = useSelector((state) => state.compare);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemove = (id) => {
    dispatch(removeFromCompare(id));
    toast.info('Removed from comparison');
  };

  return (
    <FadeIn duration={0.5}>
      <div className="space-y-8 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 dark:bg-primary-950/40 p-3 rounded-2xl">
              <GitCompare className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                Product <span className="text-primary-600 dark:text-primary-400">Comparison</span>
              </h1>
              <p className="text-sm text-gray-400 dark:text-gray-500 font-semibold mt-1">
                Compare prices, features, and specifications side-by-side
              </p>
            </div>
          </div>
          {compareItems.length > 0 && (
            <button
              onClick={() => {
                dispatch(clearCompare());
                toast.info('Comparison cleared');
              }}
              className="px-5 py-2.5 rounded-xl border-2 border-dashed border-red-200 dark:border-red-900/30 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors"
            >
              Clear Comparison
            </button>
          )}
        </div>

        {compareItems.length === 0 ? (
          <div className="card p-12 text-center text-gray-400 dark:text-gray-500 font-medium dark:bg-gray-800 dark:border-gray-700 space-y-4">
            <p className="text-lg">No products selected for comparison.</p>
            <p className="text-sm max-w-md mx-auto">
              Browse products and click the Compare icon on product cards to add them to your comparison dashboard.
            </p>
            <div className="pt-2">
              <Link to="/" className="btn-primary inline-flex items-center font-bold px-6 py-3 shadow-md">
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="card p-6 dark:bg-gray-800 dark:border-gray-700 overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-4 border-b border-gray-200 dark:border-gray-700 w-48 text-left bg-gray-50/50 dark:bg-gray-900/50 rounded-tl-xl"></th>
                  {compareItems.map((item) => (
                    <th key={item._id} className="p-4 border-b border-gray-200 dark:border-gray-700 w-64 align-top text-left">
                      <div className="relative group">
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="absolute -top-2 -right-2 p-1.5 bg-white dark:bg-gray-700 shadow-md text-gray-400 dark:text-gray-300 hover:text-red-500 rounded-full transition-colors z-10 border border-gray-150 dark:border-gray-655"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-4" />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{item.name}</h3>
                        <span className="text-[10px] bg-primary-100 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded font-black uppercase tracking-widest">
                          {item.brand}
                        </span>
                      </div>
                    </th>
                  ))}
                  {compareItems.length < 4 && (
                    <th className="p-4 border-b border-gray-200 dark:border-gray-700 w-64 align-middle text-center">
                      <div className="h-full py-16 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-750 bg-gray-50/20 dark:bg-gray-900/10 flex flex-col items-center justify-center text-gray-400">
                        <GitCompare className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs font-semibold">Add another product</span>
                        <Link to="/" className="text-xs text-primary-600 dark:text-primary-400 font-bold hover:underline mt-2">
                          Browse
                        </Link>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-750">
                <tr>
                  <td className="p-4 font-black text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-900/50 font-bold">Price</td>
                  {compareItems.map((item) => (
                    <td key={item._id} className="p-4 font-extrabold text-primary-600 dark:text-primary-400 text-lg">
                      ₹{item.price.toLocaleString('en-IN')}
                    </td>
                  ))}
                  {compareItems.length < 4 && <td className="p-4 bg-transparent"></td>}
                </tr>
                <tr>
                  <td className="p-4 font-black text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-900/50 font-bold">Rating</td>
                  {compareItems.map((item) => (
                    <td key={item._id} className="p-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-yellow-500">{item.rating.toFixed(1)} ★</span>
                        <span className="text-gray-400 dark:text-gray-550 text-xs">({item.numReviews || item.reviews?.length || 0} reviews)</span>
                      </div>
                    </td>
                  ))}
                  {compareItems.length < 4 && <td className="p-4 bg-transparent"></td>}
                </tr>
                <tr>
                  <td className="p-4 font-black text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-900/50 font-bold">Availability</td>
                  {compareItems.map((item) => (
                    <td key={item._id} className="p-4">
                      {item.countInStock > 0 ? (
                        <span className="text-green-600 dark:text-green-400 flex items-center font-bold">
                          <Check className="w-4 h-4 mr-1 text-green-500" /> In Stock ({item.countInStock})
                        </span>
                      ) : (
                        <span className="text-red-500 dark:text-red-400 flex items-center font-bold">
                          <X className="w-4 h-4 mr-1 text-red-500" /> Out of Stock
                        </span>
                      )}
                    </td>
                  ))}
                  {compareItems.length < 4 && <td className="p-4 bg-transparent"></td>}
                </tr>
                <tr>
                  <td className="p-4 font-black text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-900/50 font-bold">Category</td>
                  {compareItems.map((item) => (
                    <td key={item._id} className="p-4 text-gray-600 dark:text-gray-300 font-semibold">
                      {item.category}
                    </td>
                  ))}
                  {compareItems.length < 4 && <td className="p-4 bg-transparent"></td>}
                </tr>
                <tr>
                  <td className="p-4 font-black text-gray-900 dark:text-white bg-gray-50/50 dark:bg-gray-900/50 font-bold">Features</td>
                  {compareItems.map((item) => (
                    <td key={item._id} className="p-4 text-gray-500 dark:text-gray-450 text-xs leading-relaxed max-w-[250px]">
                      {item.description}
                    </td>
                  ))}
                  {compareItems.length < 4 && <td className="p-4 bg-transparent"></td>}
                </tr>
                <tr>
                  <td className="p-4 bg-gray-50/50 dark:bg-gray-900/50 rounded-bl-xl"></td>
                  {compareItems.map((item) => (
                    <td key={item._id} className="p-4">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={item.countInStock === 0}
                        className="w-full btn-primary py-3 flex items-center justify-center font-bold shadow-md cursor-pointer text-xs"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                      </button>
                      <Link
                        to={`/product/${item._id}`}
                        className="block text-center mt-3 text-xs font-extrabold text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        View Product Page
                      </Link>
                    </td>
                  ))}
                  {compareItems.length < 4 && <td className="p-4 bg-transparent"></td>}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default CompareScreen;
