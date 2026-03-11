import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown, Star, X } from 'lucide-react';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  
  // State for filters
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');
  const [sort, setSort] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  // Reset filters when keyword changes
  useEffect(() => {
    setCategory('');
    setRating('');
    setMinPrice('');
    setMaxPrice('');
  }, [keyword]);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword: keyword || '',
    pageNumber: pageNumber || 1,
    category,
    rating,
    minPrice,
    maxPrice,
    sort,
  });

  const categories = ['Electronics', 'Computers', 'Smartphones', 'Laptops', 'Wearables', 'Gaming', 'Home Appliances'];

  // Recently Viewed Logic
  const [recentIds, setRecentIds] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setRecentIds(saved);
  }, []);

  const { data: recentProducts } = useGetProductsQuery({
    pageSize: 10,
  }, { skip: recentIds.length === 0 });

  // Filter products that are in recentIds
  const displayRecent = recentProducts?.products.filter(p => recentIds.includes(p._id)) || [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {!keyword && !category && (
        <section className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 items-center justify-center flex p-8 text-center">
              <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl font-black mb-3">Next-Gen Tech is Here</h1>
                  <p className="text-primary-100 text-base md:text-lg font-medium opacity-90">Experience premium innovation with our new arrivals.</p>
              </div>
          </div>
        </section>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-6 space-y-6 sticky top-24">
                <div className="flex items-center justify-between lg:hidden mb-4">
                    <h3 className="font-bold">Filters</h3>
                    <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Categories</h4>
                    <div className="space-y-2">
                        <button 
                            onClick={() => setCategory('')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${category === '' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            All Categories
                        </button>
                        {categories.map((c) => (
                            <button 
                                key={c}
                                onClick={() => setCategory(c)}
                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${category === c ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Price Range</h4>
                    <div className="flex items-center space-x-2">
                        <input 
                            type="number" 
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                        />
                        <span className="text-gray-300">-</span>
                        <input 
                            type="number" 
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>

                {/* Ratings */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Min Rating</h4>
                    <div className="space-y-2">
                        {[4, 3, 2].map((r) => (
                            <button 
                                key={r}
                                onClick={() => setRating(r)}
                                className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${Number(rating) === r ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className="flex text-yellow-400">
                                    {[...Array(r)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                </span>
                                <span>& Up</span>
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={() => {
                        setCategory('');
                        setRating('');
                        setMinPrice('');
                        setMaxPrice('');
                        setSort('latest');
                    }}
                    className="w-full py-2.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors border border-dashed border-gray-200 rounded-lg hover:border-red-200"
                >
                    Clear Filters
                </button>
            </div>
        </aside>

        {/* Product List Area */}
        <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        {keyword ? `Results for "${keyword}"` : category ? category : 'Latest Tech'}
                    </h2>
                    {data?.total > 0 && (
                        <p className="text-sm text-gray-400 font-medium mt-1">Showing {data.products.length} of {data.total} products</p>
                    )}
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex-1 btn-primary py-2.5 px-4 flex items-center justify-center text-sm font-bold"
                    >
                        <Filter className="w-4 h-4 mr-2" /> Filters
                    </button>
                    
                    <div className="relative flex-1 sm:flex-none">
                        <select 
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-100 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-primary-500 cursor-pointer"
                        >
                            <option value="latest">Latest Arrivals</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : data.products.length === 0 ? (
                <div className="card p-12 text-center text-gray-400 font-medium">
                    No products found matching your criteria.
                </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <div className="mt-12">
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        keyword={keyword ? keyword : ''}
                    />
                </div>
              </>
            )}
        </div>
      </div>

      {/* Recently Viewed Section */}
      {!keyword && !category && displayRecent.length > 0 && (
        <section className="pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {displayRecent.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
      )}
    </div>
  );
};

export default HomeScreen;
