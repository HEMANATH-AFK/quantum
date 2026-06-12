import { useState } from 'react';
import { ChevronDown, Search, LifeBuoy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: 'Orders',
    items: [
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, you will receive an email with a tracking link. You can also go to My Orders in your account to view real-time tracking status.',
      },
      {
        q: 'Can I cancel or modify my order?',
        a: 'Orders can be cancelled within 2 hours of placement. After that, the order enters processing and cannot be modified. Contact support immediately if you need to make changes.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept UPI, Debit/Credit cards (Visa, Mastercard, RuPay), Net Banking, and major wallets (Paytm, PhonePe, Google Pay).',
      },
    ],
  },
  {
    category: 'Products',
    items: [
      {
        q: 'Are the products genuine?',
        a: 'Yes, 100%. All products are sourced directly from authorized distributors and come with official manufacturer warranty.',
      },
      {
        q: 'Do products come with warranty?',
        a: 'All products come with the manufacturer\'s standard warranty. Warranty period varies by product and is mentioned on the product page.',
      },
    ],
  },
  {
    category: 'Account',
    items: [
      {
        q: 'How do I reset my password?',
        a: 'On the login page, click "Forgot password?" and enter your registered email. You will receive a reset link within 2 minutes.',
      },
      {
        q: 'Can I use one account on multiple devices?',
        a: 'Yes! Your QuantumCart account works across all devices. Your cart, wishlist and order history are synced automatically.',
      },
    ],
  },
];

const HelpCenterScreen = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allItems = faqs.flatMap((section, si) =>
    section.items.map((item, ii) => ({ ...item, key: `${si}-${ii}`, category: section.category }))
  );

  const filtered = searchQuery
    ? allItems.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="max-w-3xl mx-auto space-y-10 py-4 text-left">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex w-16 h-16 bg-blue-50 dark:bg-blue-950/40 rounded-2xl items-center justify-center mx-auto mb-5">
          <LifeBuoy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Help Center</h1>
        <p className="text-gray-500 dark:text-gray-400">Find answers to your questions instantly.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for answers..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm shadow-sm"
        />
      </div>

      {/* Results */}
      {filtered ? (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              No results found for "{searchQuery}"
            </div>
          ) : (
            filtered.map((item) => (
              <FaqItem key={item.key} item={item} openIndex={openIndex} setOpenIndex={setOpenIndex} id={item.key} showCategory />
            ))
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {faqs.map((section, si) => (
            <div key={si} className="space-y-3">
              <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{section.category}</h2>
              {section.items.map((item, ii) => {
                const id = `${si}-${ii}`;
                return <FaqItem key={id} item={item} openIndex={openIndex} setOpenIndex={setOpenIndex} id={id} />;
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FaqItem = ({ item, openIndex, setOpenIndex, id, showCategory }) => {
  const isOpen = openIndex === id;
  return (
    <div className="card dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setOpenIndex(isOpen ? null : id)}
        className="w-full flex items-center justify-between p-5 text-left outline-none cursor-pointer"
      >
        <div>
          {showCategory && (
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1 block">{item.category}</span>
          )}
          <span className="font-bold text-gray-900 dark:text-white text-sm">{item.q}</span>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 shrink-0 text-gray-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-gray-50 dark:border-gray-700"
          >
            <div className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpCenterScreen;
