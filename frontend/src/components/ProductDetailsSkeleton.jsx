import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ProductDetailsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse text-left">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Products
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Image Skeleton */}
        <div className="lg:w-1/2">
          <div className="card aspect-square p-8 flex items-center justify-center bg-gray-50/50">
            <Skeleton className="w-full h-full rounded-2xl" />
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold tracking-widest uppercase mb-4">
              <Skeleton width={100} height={20} />
            </div>
            <Skeleton width="80%" height={40} className="mb-4" />
            <Skeleton width={150} height={24} className="mb-6" />
            <Skeleton width={120} height={48} />
          </div>

          <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
            <Skeleton count={4} />
          </div>

          {/* Checkout Card Skeleton */}
          <div className="card p-6">
            <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <Skeleton width={60} />
                  <Skeleton width={80} />
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <Skeleton width={60} />
                  <Skeleton width={80} />
                </div>
                <div className="pt-4">
                    <Skeleton height={48} className="rounded-xl" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
