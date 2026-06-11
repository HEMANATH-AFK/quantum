import { Link } from 'react-router-dom';
import { LifeBuoy, Truck, RotateCcw, ArrowRight, MessageCircle, Mail, Phone } from 'lucide-react';

const supportCards = [
  {
    icon: <LifeBuoy className="w-8 h-8" />,
    title: 'Help Center',
    desc: 'Find answers to common questions about orders, accounts, and products.',
    link: '/help',
    color: 'from-blue-500 to-indigo-600',
    emoji: '❓',
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Shipping Info',
    desc: 'Learn about our delivery timelines, shipping partners and tracking.',
    link: '/shipping-info',
    color: 'from-green-500 to-emerald-600',
    emoji: '🚚',
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: 'Returns & Refunds',
    desc: 'Hassle-free returns within 30 days. Full refunds, no questions asked.',
    link: '/returns',
    color: 'from-orange-500 to-red-500',
    emoji: '↩️',
  },
];

const SupportScreen = () => {
  return (
    <div className="space-y-14">
      {/* Header */}
      <div className="text-center py-8">
        <div className="inline-flex w-16 h-16 bg-primary-50 dark:bg-primary-950/40 rounded-2xl items-center justify-center mx-auto mb-5">
          <MessageCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-3">
          How can we help?
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
          We're here for you. Browse our support resources or reach out directly.
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group card p-8 flex flex-col items-start gap-4 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
              {card.emoji}
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white text-xl mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{card.desc}</p>
              <span className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-bold text-sm">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Contact Section */}
      <section className="card dark:bg-gray-800 dark:border-gray-700 p-8 md:p-12">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Still need help?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Our support team is available Mon–Sat, 9AM–6PM IST.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Email</div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">support@afk.com</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Phone</div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">+91 9876543210</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Live Chat</div>
              <div className="font-bold text-gray-900 dark:text-white text-sm">Available 9AM–6PM</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportScreen;
