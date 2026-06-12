import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';
import { Filter, ChevronDown, Star, X } from 'lucide-react';
import { FadeUp } from '@hemanath-afk/afk-motion';
import HeroCarousel from '../components/HeroCarousel';

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  
  // State for filters
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMinPriceCustom] = useState(''); // Just keeping alignment
  const [maxPriceActual, setMaxPriceActual] = useState(''); // Correct name
  const [rating, setRating] = useState('');
  const [sort, setSort] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  // Reset filters when keyword changes
  useEffect(() => {
    setCategory('');
    setRating('');
    setMinPrice('');
    setMaxPriceActual('');
  }, [keyword]);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword: keyword || '',
    pageNumber: pageNumber || 1,
    category,
    rating,
    minPrice,
    maxPrice: maxPriceActual,
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
    <div className="space-y-12 transition-colors duration-300">
      {!keyword && !category && (
        <HeroCarousel />
      )}


      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`lg:w-64 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-6 space-y-6 sticky top-24 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between lg:hidden mb-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="text-gray-600 dark:text-gray-400">
                      <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Categories</h4>
                    <div className="space-y-2">
                        <button 
                            onClick={() => setCategory('')}
                            className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${category === '' ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            All Categories
                        </button>
                        {categories.map((c) => (
                            <button 
                                key={c}
                                onClick={() => setCategory(c)}
                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${category === c ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Price Range</h4>
                    <div className="flex items-center space-x-2">
                        <input 
                            type="number" 
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none p-2"
                        />
                        <span className="text-gray-300 dark:text-gray-600">-</span>
                        <input 
                            type="number" 
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none p-2"
                        />
                    </div>
                </div>

                {/* Ratings */}
                <div>
                    <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Min Rating</h4>
                    <div className="space-y-2">
                        {[4, 3, 2].map((r) => (
                            <button 
                                key={r}
                                onClick={() => setRating(r)}
                                className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${Number(rating) === r ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
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
                    className="w-full py-2.5 text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors border border-dashed border-gray-200 dark:border-gray-750 rounded-lg hover:border-red-200 dark:hover:border-red-900/30"
                >
                    Clear Filters
                </button>
            </div>
        </aside>

        {/* Product List Area */}
        <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                        {keyword ? `Results for "${keyword}"` : category ? category : 'Latest Tech'}
                    </h2>
                    {data?.total > 0 && (
                        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium mt-1">Showing {data.products.length} of {data.total} products</p>
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
                            className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-750 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-gray-700 dark:text-gray-200 shadow-sm focus:ring-2 focus:ring-primary-500 cursor-pointer outline-none"
                        >
                            <option value="latest">Latest Arrivals</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
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
                <div className="card p-12 text-center text-gray-400 dark:text-gray-500 font-medium dark:bg-gray-800 dark:border-gray-700">
                    No products found matching your criteria.
                </div>
            ) : (
              <FadeUp duration={0.5}>
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
              </FadeUp>
            )}
        </div>
      </div>

      {/* Recently Viewed Section */}
      {!keyword && !category && displayRecent.length > 0 && (
        <section className="pt-12 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">Recently Viewed</h2>
            <FadeUp duration={0.5}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {displayRecent.map((product) => (
                      <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </FadeUp>
        </section>
      )}
    </div>
  );
};

export default HomeScreen;
