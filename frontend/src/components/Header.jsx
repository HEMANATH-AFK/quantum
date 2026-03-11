import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Search, Heart, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { logout } from '../store/slices/authSlice';
import SearchBox from './SearchBox';
import { useTheme } from './ThemeProvider';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl italic">Q</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">Quantum<span className="text-primary-600">Cart</span></span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 text-left">
          <SearchBox />
        </div>

        {/* Right Nav */}
        <div className="flex items-center space-x-6">
          <button onClick={toggleTheme} className="text-gray-600 hover:text-primary-600 transition-colors">
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

          <Link to="/wishlist" className="relative text-gray-600 hover:text-primary-600 transition-colors">
            <Heart className="w-6 h-6" />
          </Link>

          <Link to="/cart" className="relative text-gray-600 hover:text-primary-600 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="relative group flex items-center space-x-1 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">{userInfo.name}</span>
              <User className="w-5 h-5 text-gray-600" />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Orders</Link>
                {userInfo.isAdmin && (
                  <>
                    <hr className="my-1 border-gray-100" />
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-primary-600 font-black hover:bg-gray-50">Dashboard</Link>
                    <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-primary-600 font-medium hover:bg-gray-50">Products</Link>
                    <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-primary-600 font-medium hover:bg-gray-50">Users</Link>
                    <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-primary-600 font-medium hover:bg-gray-50">Orders</Link>
                    <Link to="/admin/coupons" className="block px-4 py-2 text-sm text-primary-600 font-medium hover:bg-gray-50">Coupons</Link>
                  </>
                )}
                <hr className="my-1 border-gray-100" />
                <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm">Sign In</Link>
          )}

          {/* Mobile menu toggle */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 text-left">
          <SearchBox />
          <div className="flex flex-col space-y-2">
            <Link to="/" className="text-gray-600 py-2 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/categories" className="text-gray-600 py-2 font-medium" onClick={() => setIsMenuOpen(false)}>Categories</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
