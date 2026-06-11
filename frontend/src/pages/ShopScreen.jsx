import { Link } from 'react-router-dom';
import { Zap, Tag, Sparkles, Star, ArrowRight, ShoppingBag } from 'lucide-react';

const categories = [
  { name: 'Earbuds', icon: '🎧', color: 'from-purple-500 to-indigo-600', count: '12+ Products' },
  { name: 'Keyboard', icon: '⌨️', color: 'from-blue-500 to-cyan-500', count: '6+ Products' },
  { name: 'Mouse', icon: '🖱️', color: 'from-green-500 to-emerald-500', count: '4+ Products' },
  { name: 'Monitor', icon: '🖥️', color: 'from-orange-500 to-amber-500', count: '3+ Products' },
  { name: 'Smartwatch', icon: '⌚', color: 'from-pink-500 to-rose-500', count: '7+ Products' },
  { name: 'Camera', icon: '📷', color: 'from-red-500 to-pink-600', count: '5+ Products' },
];

const highlights = [
  { icon: <Zap className="w-6 h-6" />, title: 'Fast Delivery', desc: 'Orders dispatched within 24 hours' },
  { icon: <ShoppingBag className="w-6 h-6" />, title: '25+ Products', desc: 'Curated premium tech collection' },
  { icon: <Star className="w-6 h-6" />, title: 'Top Rated', desc: 'Only the best-reviewed products' },
];

const ShopScreen = () => {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="relative z-10 px-8 py-20 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-yellow-300" /> The QuantumCart Shop
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            Shop Premium<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tech Gear
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            From earbuds to cameras — find the perfect gadget for every need and budget.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-xl text-sm"
          >
            Browse All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((h, i) => (
          <div key={i} className="card p-6 flex items-start gap-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center shrink-0">
              {h.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{h.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{h.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">Browse by Category</h2>
          <Link to="/categories" className="text-primary-600 dark:text-primary-400 font-bold text-sm hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/?category=${cat.name}`}
              className={`group relative rounded-2xl overflow-hidden bg-gradient-to-br ${cat.color} p-6 text-white hover:scale-105 transition-transform shadow-lg`}
            >
              <div className="text-5xl mb-3">{cat.icon}</div>
              <h3 className="font-black text-lg">{cat.name}</h3>
              <p className="text-white/70 text-xs mt-1">{cat.count}</p>
              <ArrowRight className="absolute bottom-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-to-r from-primary-600 to-primary-700 p-10 text-center text-white">
        <Tag className="w-10 h-10 mx-auto mb-4 opacity-80" />
        <h2 className="text-3xl font-black mb-2">Exclusive Member Deals</h2>
        <p className="text-white/70 mb-6 max-w-md mx-auto">Sign in to unlock personalized discounts and early access to new arrivals.</p>
        <Link to="/login" className="inline-flex items-center gap-2 bg-white text-primary-700 font-black px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg text-sm">
          Sign In to Shop <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default ShopScreen;
