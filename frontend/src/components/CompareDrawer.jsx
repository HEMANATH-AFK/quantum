import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, GitCompare, Trash2, Check } from 'lucide-react';
import { removeFromCompare, clearCompare } from '../store/slices/compareSlice';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

const CompareDrawer = () => {
  const dispatch = useDispatch();
  const { compareItems } = useSelector((state) => state.compare);
  const [isOpen, setIsOpen] = useState(false);

  if (compareItems.length === 0) return null;

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success('Added to cart');
  };

  return (
    <>
      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transform transition-transform duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            <div className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center shrink-0">
              <GitCompare className="w-5 h-5 mr-2 text-primary-600" /> Compare
              <span className="ml-2 bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">{compareItems.length}/4</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {compareItems.map((item) => (
                <div key={item._id} className="relative w-12 h-12 rounded-lg border border-gray-200 overflow-hidden shrink-0 group">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => dispatch(removeFromCompare(item._id))}
                    className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {[...Array(4 - compareItems.length)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 shrink-0" />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4 shrink-0 bg-white pl-4">
            <button 
                onClick={() => dispatch(clearCompare())}
                className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors hidden sm:block"
            >
                Clear All
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              disabled={compareItems.length < 2}
              className="btn-primary flex items-center font-bold px-6 py-2.5 shadow-lg shadow-primary-200"
            >
              Compare Now
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Comparison Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10 px-4 py-4 md:px-8 flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-900 flex items-center">
                    <GitCompare className="w-6 h-6 mr-3 text-primary-600" />
                    Product Comparison
                </h2>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="overflow-x-auto pb-8">
                    <table className="w-full border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-gray-200 w-48 text-left bg-gray-50/50"></th>
                                {compareItems.map(item => (
                                    <th key={item._id} className="p-4 border-b border-gray-200 w-64 align-top">
                                        <div className="relative group">
                                            <button 
                                                onClick={() => {
                                                    dispatch(removeFromCompare(item._id));
                                                    if(compareItems.length <= 2) setIsOpen(false);
                                                }}
                                                className="absolute top-2 right-2 p-1.5 bg-white shadow-md text-gray-400 hover:text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-100">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                                            <p className="text-xs text-primary-600 font-black uppercase tracking-widest">{item.brand}</p>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr>
                                <td className="p-4 border-b border-gray-100 font-black text-gray-900 bg-gray-50/50">Price</td>
                                {compareItems.map(item => (
                                    <td key={item._id} className="p-4 border-b border-gray-100 font-bold text-gray-900 text-lg">
                                        ₹{item.price.toLocaleString('en-IN')}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-gray-100 font-black text-gray-900 bg-gray-50/50">Rating</td>
                                {compareItems.map(item => (
                                    <td key={item._id} className="p-4 border-b border-gray-100 font-bold text-gray-600">
                                        <div className="flex items-center">
                                            <span className="text-yellow-500 mr-1">{item.rating.toFixed(1)}</span>
                                            <span className="text-gray-400 text-xs">({item.numReviews})</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-gray-100 font-black text-gray-900 bg-gray-50/50">Availability</td>
                                {compareItems.map(item => (
                                    <td key={item._id} className="p-4 border-b border-gray-100 font-bold">
                                        {item.countInStock > 0 ? (
                                            <span className="text-green-600 flex items-center"><Check className="w-4 h-4 mr-1"/> In Stock</span>
                                        ) : (
                                            <span className="text-red-500 flex items-center"><X className="w-4 h-4 mr-1"/> Out of Stock</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-gray-100 font-black text-gray-900 bg-gray-50/50">Category</td>
                                {compareItems.map(item => (
                                    <td key={item._id} className="p-4 border-b border-gray-100 text-gray-600 font-medium">
                                        {item.category}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-gray-100 font-black text-gray-900 bg-gray-50/50">Description</td>
                                {compareItems.map(item => (
                                    <td key={item._id} className="p-4 border-b border-gray-100 text-gray-500 text-xs leading-relaxed max-w-[250px]">
                                        <div className="line-clamp-4">{item.description}</div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="p-4 bg-gray-50/50"></td>
                                {compareItems.map(item => (
                                    <td key={item._id} className="p-4">
                                        <button 
                                            onClick={() => handleAddToCart(item)}
                                            disabled={item.countInStock === 0}
                                            className="w-full btn-primary py-2.5 font-bold shadow-md"
                                        >
                                            Add to Cart
                                        </button>
                                        <Link 
                                            to={`/product/${item._id}`}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-center mt-3 text-xs font-bold text-primary-600 hover:underline"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default CompareDrawer;
