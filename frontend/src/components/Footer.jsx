const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm italic">Q</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">QuantumCart</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Premium e-commerce experience built with the modern MERN stack. Fast, secure, and intuitive.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-primary-600 transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Categories</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">New Arrivals</a></li>
          </ul>
        </div>

        <div>
           <h4 className="font-bold text-gray-900 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-primary-600 transition-colors">Returns</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Email: Support@afk.com</li>
            <li>Phone: +91 9876543210</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} QuantumCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
