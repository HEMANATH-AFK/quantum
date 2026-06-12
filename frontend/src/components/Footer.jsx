import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-12 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary-600 dark:bg-primary-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm italic">Q</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">QuantumCart</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Premium e-commerce experience built with the modern MERN stack. Fast, secure, and intuitive.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Shop</Link></li>
            <li><Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">All Products</Link></li>
            <li><Link to="/categories" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Categories</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/support" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Support</Link></li>
            <li><Link to="/help" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Help Center</Link></li>
            <li><Link to="/shipping-info" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Shipping</Link></li>
            <li><Link to="/returns" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Returns</Link></li>
            <li><Link to="/stores" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Store Locator</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>Email: Support@afk.com</li>
            <li>Phone: +91 9876543210</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-50 dark:border-gray-800 text-center text-gray-400 dark:text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} QuantumCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
