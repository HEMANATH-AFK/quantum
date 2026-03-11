import Rating from './Rating';

const Review = ({ review }) => {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-600">
            {review.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-gray-900">{review.name}</div>
            <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
              {review.createdAt.substring(0, 10)}
            </div>
          </div>
        </div>
        <Rating value={review.rating} />
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
      {review.image && (
        <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img src={review.image} alt="User review" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default Review;
