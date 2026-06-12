import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Heart, Moon, Sun, ChevronLeft, ChevronRight, GitCompare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { logout } from '../store/slices/authSlice';
import SearchBox from './SearchBox';
import { useTheme } from './ThemeProvider';
import { HoverScale, SlideDown } from '@hemanath-afk/afk-motion';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'All Products', to: '/products' },
  { label: 'Categories', to: '/categories' },
  { label: 'New Arrivals', to: '/new-arrivals' },
];

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { compareItems } = useSelector((state) => state.compare);
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentAnn, setCurrentAnn] = useState(0);
  const announcements = [
    "⚡ Quantum Drop: Save 10% on your first order. Use code: WELCOME10",
    "🚚 Premium perk: Free express delivery for orders above ₹5,000",
    "🔒 Safe & Secure checkout with 256-bit encryption"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnn((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const prevAnn = (e) => {
    e.preventDefault();
    setCurrentAnn((prev) => (prev - 1 + announcements.length) % announcements.length);
  };
  const nextAnn = (e) => {
    e.preventDefault();
    setCurrentAnn((prev) => (prev + 1) % announcements.length);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0f0c29] via-[#1e1b4b] to-[#0f0c29] text-white py-2 px-4 text-center text-[10px] md:text-xs font-black flex items-center justify-between border-b border-white/5 tracking-wider">
        <button onClick={prevAnn} className="hover:text-primary-400 p-1 transition-colors outline-none cursor-pointer">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="inline-flex items-center gap-2 select-none text-center">
          {announcements[currentAnn]}
        </span>
        <button onClick={nextAnn} className="hover:text-primary-400 p-1 transition-colors outline-none cursor-pointer">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Nav Row */}
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <HoverScale>
            <div className="w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl italic">Q</span>
            </div>
          </HoverScale>
          <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Quantum<span className="text-primary-600 dark:text-primary-400">Cart</span>
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 text-left">
          <SearchBox />
        </div>

        {/* Right Nav */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link 
            to="/compare" 
            className="relative text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            title="Compare Products"
          >
            <GitCompare className="w-5 h-5" />
            {compareItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-indigo-650 dark:bg-indigo-550 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-gray-900 transform translate-x-1/3 -translate-y-1/3">
                {compareItems.length}
              </span>
            )}
          </Link>

          <Link 
            to="/wishlist" 
            className="relative text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </Link>

          <Link 
            to="/cart" 
            className="relative text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            title="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-primary-600 dark:bg-primary-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-gray-900 transform translate-x-1/3 -translate-y-1/3">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {userInfo ? (
            <div className="relative group flex items-center space-x-1 cursor-pointer py-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">{userInfo.name}</span>
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750">Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750">Orders</Link>
                {userInfo.isAdmin && (
                  <>
                    <hr className="my-1 border-gray-100 dark:border-gray-700" />
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-primary-600 dark:text-primary-400 font-black hover:bg-gray-50 dark:hover:bg-gray-750">Dashboard</Link>
                    <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-750">Products</Link>
                    <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-750">Users</Link>
                    <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-750">Orders</Link>
                    <Link to="/admin/coupons" className="block px-4 py-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-750">Coupons</Link>
                  </>
                )}
                <hr className="my-1 border-gray-100 dark:border-gray-700" />
                <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-sm">Sign In</Link>
          )}

          {/* Mobile menu toggle */}
          <button className="md:hidden text-gray-600 dark:text-gray-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Secondary Nav Links (Desktop) */}
      <div className="hidden md:block border-t border-gray-50 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 h-10 flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex-1" />
          <Link to="/support" className="px-4 py-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Support
          </Link>
          <Link to="/help" className="px-4 py-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Help Center
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      {isMenuOpen && (
        <SlideDown duration={0.3}>
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 space-y-4 text-left shadow-lg">
            <SearchBox />
            <div className="flex flex-col space-y-1">
              <Link to="/" className="text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-gray-100 dark:border-gray-800 my-1" />
              <Link to="/support" className="text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>Support</Link>
              <Link to="/help" className="text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>Help Center</Link>
              <Link to="/wishlist" className="text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
              <Link to="/cart" className="text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg font-medium hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>Cart</Link>
            </div>
          </div>
        </SlideDown>
      )}
    </header>
  );
};

export default Header;
