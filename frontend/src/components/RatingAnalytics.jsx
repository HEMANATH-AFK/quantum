import { Star } from 'lucide-react';
import Rating from './Rating';

const RatingAnalytics = ({ product, selectedRatingFilter, onSelectRatingFilter }) => {
  // Rating breakdown logic
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => Math.floor(r.rating) === star).length;
    const percentage = product.numReviews > 0 ? (count / product.numReviews) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <>
      <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Customer Reviews</h2>
      <div className="card p-6 space-y-6 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
        <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">
            {product.rating.toFixed(1)}
          </div>
          <div className="flex justify-center mb-1">
            <Rating value={product.rating} color="text-yellow-400" />
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
            {product.numReviews} Reviews
          </div>
        </div>
        {/* Breakdown Bars */}
        <div className="space-y-3">
          {ratingBreakdown.map((row) => (
            <div 
              key={row.star} 
              onClick={() => onSelectRatingFilter && onSelectRatingFilter(selectedRatingFilter === row.star ? null : row.star)}
              className={`flex items-center text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 p-1.5 rounded-lg transition-colors ${selectedRatingFilter === row.star ? 'bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 font-bold' : 'text-gray-600 dark:text-gray-300'}`}
              title={`Filter by ${row.star} star reviews`}
            >
              <span className="w-4 text-center font-bold">{row.star}</span>
              <Star className="w-3 h-3 text-yellow-450 fill-current mx-1 text-yellow-400" />
              <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full mx-2 overflow-hidden">
                <div
                  className="h-full bg-yellow-450 dark:bg-yellow-450 bg-yellow-450 transition-all duration-1000"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-400 dark:text-gray-500 font-medium">{row.count}</span>
            </div>
          ))}
          {selectedRatingFilter && (
            <button 
              onClick={() => onSelectRatingFilter && onSelectRatingFilter(null)}
              className="w-full text-center text-xs font-bold text-red-500 dark:text-red-400 pt-2 hover:underline"
            >
              Clear Filter ({selectedRatingFilter} Stars)
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default RatingAnalytics;
