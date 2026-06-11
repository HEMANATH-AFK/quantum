import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Laptop, Smartphone, Watch, Gamepad2, Home, Headphones } from 'lucide-react';

const categoryList = [
  {
    name: 'Electronics',
    icon: <Cpu className="w-8 h-8" />,
    desc: 'Gadgets, chargers, power banks and more',
    color: 'from-blue-500 to-indigo-600',
    emoji: '⚡',
  },
  {
    name: 'Computers',
    icon: <Laptop className="w-8 h-8" />,
    desc: 'Keyboards, mice, monitors and peripherals',
    color: 'from-gray-700 to-gray-900',
    emoji: '💻',
  },
  {
    name: 'Smartphones',
    icon: <Smartphone className="w-8 h-8" />,
    desc: 'Accessories and mobile tech',
    color: 'from-green-500 to-teal-600',
    emoji: '📱',
  },
  {
    name: 'Laptops',
    icon: <Laptop className="w-8 h-8" />,
    desc: 'Premium laptops and workstations',
    color: 'from-orange-500 to-red-500',
    emoji: '🖥️',
  },
  {
    name: 'Wearables',
    icon: <Watch className="w-8 h-8" />,
    desc: 'Smartwatches and fitness trackers',
    color: 'from-pink-500 to-rose-600',
    emoji: '⌚',
  },
  {
    name: 'Gaming',
    icon: <Gamepad2 className="w-8 h-8" />,
    desc: 'Controllers, headsets and gaming gear',
    color: 'from-purple-600 to-indigo-700',
    emoji: '🎮',
  },
  {
    name: 'Home Appliances',
    icon: <Home className="w-8 h-8" />,
    desc: 'Smart home devices and appliances',
    color: 'from-amber-500 to-yellow-600',
    emoji: '🏠',
  },
  {
    name: 'Earbuds',
    icon: <Headphones className="w-8 h-8" />,
    desc: 'TWS earbuds, headphones and audio',
    color: 'from-cyan-500 to-blue-500',
    emoji: '🎧',
  },
];

const CategoriesScreen = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center py-8">
        <span className="inline-block bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          All Categories
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
          Find What You Need
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
          Browse our curated categories of premium tech products.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categoryList.map((cat) => (
          <Link
            key={cat.name}
            to={`/?category=${cat.name}`}
            className="group card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700"
          >
            {/* Top colored band */}
            <div className={`h-24 bg-gradient-to-br ${cat.color} flex items-center justify-center relative overflow-hidden`}>
              <span className="text-5xl">{cat.emoji}</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            </div>
            {/* Content */}
            <div className="p-5">
              <h3 className="font-black text-gray-900 dark:text-white text-lg mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 leading-snug">{cat.desc}</p>
              <span className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-xs font-bold">
                Shop now <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScreen;
