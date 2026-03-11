import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, text, color = 'text-yellow-400' }) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index}>
            {value >= index ? (
              <Star className={`w-4 h-4 fill-current ${color}`} />
            ) : value >= index - 0.5 ? (
              <StarHalf className={`w-4 h-4 fill-current ${color}`} />
            ) : (
              <Star className="w-4 h-4 text-gray-200" />
            )}
          </span>
        ))}
      </div>
      {text && <span className="text-sm text-gray-400 font-medium ml-2">{text}</span>}
    </div>
  );
};

export default Rating;
