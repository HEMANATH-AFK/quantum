import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className="flex items-center justify-center space-x-2 mt-12 py-8 border-t border-gray-50 text-left">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
            className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
              x + 1 === page
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600'
            }`}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
