import { Star } from 'lucide-react';
import Rating from './Rating';

const RatingAnalytics = ({ product }) => {
  // Rating breakdown logic
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => Math.floor(r.rating) === star).length;
    const percentage = product.numReviews > 0 ? (count / product.numReviews) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <>
      <h2 className="text-2xl font-black text-gray-900 tracking-tight">Customer Reviews</h2>
      <div className="card p-6 space-y-6">
        <div className="text-center pb-6 border-b border-gray-100">
          <div className="text-5xl font-black text-gray-900 mb-2">
            {product.rating.toFixed(1)}
          </div>
          <div className="flex justify-center mb-1">
            <Rating value={product.rating} color="text-yellow-400" />
          </div>
          <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            {product.numReviews} Reviews
          </div>
        </div>
        {/* Breakdown Bars */}
        <div className="space-y-3">
          {ratingBreakdown.map((row) => (
            <div key={row.star} className="flex items-center text-sm">
              <span className="w-4 font-bold text-gray-600">{row.star}</span>
              <Star className="w-3 h-3 text-yellow-400 fill-current mx-1" />
              <div className="flex-1 h-2 bg-gray-100 rounded-full mx-2 overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-1000"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-400 font-medium">{row.count}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RatingAnalytics;
