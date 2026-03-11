import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="relative w-full text-left">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search for premium tech..."
        className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all placeholder:text-gray-400 font-medium"
      />
      <Search className="absolute left-4 top-2.5 text-primary-500 w-5 h-5" />
    </form>
  );
};

export default SearchBox;
