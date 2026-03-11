import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => {
  return (
    <div className="card h-full flex flex-col group overflow-hidden border-2 border-transparent">
      {/* Image Skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-4 p-4">
        <Skeleton height="100%" className="rounded-xl" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6 pt-0 flex flex-col flex-grow">
        {/* Brand/Category */}
        <div className="flex justify-between items-center mb-3">
          <Skeleton width={80} height={16} />
          <Skeleton width={60} height={20} borderRadius={12} />
        </div>

        {/* Title */}
        <Skeleton count={2} height={24} className="mb-4" />

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton width={100} height={16} />
          <Skeleton width={40} height={16} />
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <Skeleton width={80} height={28} />
            <Skeleton width={40} height={40} borderRadius={12} />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
