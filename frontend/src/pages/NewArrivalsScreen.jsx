import { useGetProductsQuery } from '../store/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { FadeUp } from '@hemanath-afk/afk-motion';

const NewArrivalsScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword: '',
    pageNumber: pageNumber || 1,
    sort: 'latest',
  });

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <section className="relative rounded-3xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="relative z-10 flex flex-col items-center text-center px-8 py-14">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-yellow-300" /> Fresh Drops
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
            New Arrivals
          </h1>
          <p className="text-white/60 text-base max-w-lg">
            The latest and greatest tech, just landed. Be the first to own tomorrow's gear.
          </p>
        </div>
      </section>

      {/* Products */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <FadeUp duration={0.5}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              Latest Products
            </h2>
            <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">
              Showing {data.products.length} of {data.total}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="mt-12">
            <Paginate pages={data.pages} page={data.page} keyword="" />
          </div>
        </FadeUp>
      )}
    </div>
  );
};

export default NewArrivalsScreen;
