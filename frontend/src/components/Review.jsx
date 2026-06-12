import Rating from './Rating';
import { ThumbsUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useVoteReviewHelpfulMutation } from '../store/slices/productsApiSlice';
import { toast } from 'react-toastify';

const Review = ({ review, productId, onImageClick }) => {
  const [voteReviewHelpful, { isLoading }] = useVoteReviewHelpfulMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const isVoted = userInfo && review.helpfulUsers?.some(
    (userId) => userId.toString() === userInfo._id.toString()
  );

  const handleHelpfulClick = async () => {
    if (!userInfo) {
      toast.error('Please sign in to vote');
      return;
    }
    try {
      await voteReviewHelpful({ productId, reviewId: review._id }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="card p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-950/60 rounded-full flex items-center justify-center font-bold text-primary-600 dark:text-primary-400">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white">{review.name}</div>
            <div className="text-[10px] text-gray-400 dark:text-gray-505 font-black uppercase tracking-widest">
              {review.createdAt.substring(0, 10)}
            </div>
          </div>
        </div>
        <Rating value={review.rating} />
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{review.comment}</p>
      {review.image && (
        <div 
          onClick={() => onImageClick && onImageClick(review.image)}
          className="w-32 h-32 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <img src={review.image} alt="User review" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-750/30">
        <button
          onClick={handleHelpfulClick}
          disabled={isLoading}
          className={`flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
            isVoted 
              ? 'bg-primary-50 dark:bg-primary-950/40 border-primary-500 text-primary-600 dark:text-primary-400' 
              : 'border-gray-250 dark:border-gray-700 hover:border-primary-500 text-gray-550 hover:text-primary-600 dark:text-gray-400'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-current' : ''}`} />
          <span>Helpful ({review.helpfulVotes || 0})</span>
        </button>
      </div>
    </div>
  );
};

export default Review;
