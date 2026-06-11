import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';
import { Filter, ChevronDown, Star, X } from 'lucide-react';
import { FadeUp } from '@hemanath-afk/afk-motion';


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
    <div className="space-y-12 transition-colors duration-300">
      {!keyword && !category && (
        <section className="relative rounded-3xl overflow-hidden shadow-2xl mb-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
          {/* Background blobs */}
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '3s' }} />

          {/* Core Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 py-12 md:px-12 md:py-20 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col text-left items-start space-y-6 md:space-y-8">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                FUTURE OF TECH IS HERE
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
                Elevate Your <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Digital Experience
                </span>
              </h1>

              <p className="text-white/75 text-base md:text-lg max-w-xl font-medium leading-relaxed">
                Explore curated premium gadgets, exclusive members-only deals, and the latest technological innovations, designed for creators, developers, and gamers.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a href="/shop" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-black px-8 py-4 rounded-2xl hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 active:scale-95 transition-all text-sm tracking-wide shadow-md">
                  🛍️ Shop the Collection
                </a>
                <a href="/new-arrivals" className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/15 transition-all text-sm">
                  ✨ Discover New Drops
                </a>
              </div>

              {/* Stats / Trust Banner */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">25K+</div>
                  <div className="text-xs text-white/50 font-semibold mt-1">Active Customers</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">4.9★</div>
                  <div className="text-xs text-white/50 font-semibold mt-1">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white">Free</div>
                  <div className="text-xs text-white/50 font-semibold mt-1">Worldwide Shipping</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Collage Column */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              {/* Decorative Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-purple-500/20 rounded-full blur-3xl" />
              
              {/* Product Card Container */}
              <div className="relative group w-full max-w-sm">
                
                {/* Floating Badge 1 */}
                <div className="absolute -top-4 -left-4 z-20 bg-emerald-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg transform -rotate-6 animate-bounce">
                  Best Seller 🔥
                </div>
                
                {/* Floating Badge 2 */}
                <div className="absolute -bottom-4 -right-4 z-20 bg-primary-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg transform rotate-6">
                  Save 20% 🏷️
                </div>

                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  {/* Glass Card Glow */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Product Image Wrapper */}
                  <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-white/5 to-white/0 p-4 mb-4 flex items-center justify-center overflow-hidden border border-white/5">
                    {/* Glowing background inside image */}
                    <div className="absolute w-32 h-32 bg-primary-500/10 rounded-full blur-xl animate-pulse" />
                    
                    <img 
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80" 
                      alt="Quantum Beats Pro Headphones" 
                      className="max-h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="text-left space-y-2">
                    <span className="text-[10px] font-black tracking-widest text-primary-300 uppercase">Premium Audio</span>
                    <h3 className="text-lg font-black text-white tracking-tight">Quantum Beats Pro</h3>
                    
                    <div className="flex items-center gap-1.5 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                      <span className="text-xs text-white/50 font-semibold ml-1.5">(124 reviews)</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-white/40 text-xs line-through font-semibold mr-1.5">$299.99</span>
                        <span className="text-xl font-black text-white">$239.99</span>
                      </div>
                      <a href="/shop" className="bg-white hover:bg-primary-50 text-gray-900 font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow">
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Quick links header banner */}
          <div className="relative z-10 w-full bg-black/20 backdrop-blur-sm border-t border-white/5 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-white/50 uppercase tracking-wider">Quick Search Category:</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['Electronics', 'Computers', 'Smartphones', 'Laptops', 'Wearables', 'Gaming', 'Home Appliances'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
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
