import { RotateCcw, CheckCircle, XCircle, Clock, Package, Mail } from 'lucide-react';

const eligibleItems = [
  'Item received in damaged or defective condition',
  'Wrong item delivered',
  'Item not matching product description',
  'Missing parts or accessories',
  'Changed your mind (within 7 days, unused & sealed)',
];

const nonEligibleItems = [
  'Items returned after 30 days of delivery',
  'Used, opened, or damaged by the buyer',
  'Items without original packaging',
  'Software, digital products, or gift cards',
  'Items marked as "Non-Returnable" on the product page',
];

const returnSteps = [
  { icon: <Package className="w-5 h-5" />, step: '01', title: 'Initiate Return', desc: 'Go to My Orders, select the item and click "Return Item". Fill in the reason.' },
  { icon: <Clock className="w-5 h-5" />, step: '02', title: 'Approval', desc: 'Our team reviews your request within 24–48 hours and approves eligible returns.' },
  { icon: <RotateCcw className="w-5 h-5" />, step: '03', title: 'Pick Up', desc: 'We schedule a free pick-up from your address within 2–3 business days.' },
  { icon: <CheckCircle className="w-5 h-5" />, step: '04', title: 'Refund', desc: 'Refund is processed within 5–7 business days after we receive and verify the item.' },
];

const ReturnsScreen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-14 py-4">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex w-16 h-16 bg-orange-50 dark:bg-orange-950/40 rounded-2xl items-center justify-center mx-auto mb-5">
          <RotateCcw className="w-8 h-8 text-orange-600 dark:text-orange-400" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Returns & Refunds</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Hassle-free returns within 30 days. We make it easy to get your money back.
        </p>
      </div>

      {/* Return Policy Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: '📅', title: '30-Day Window', desc: 'Return any eligible item within 30 days of delivery.' },
          { icon: '🆓', title: 'Free Pick Up', desc: 'We collect the item from your doorstep at no cost.' },
          { icon: '💰', title: 'Full Refund', desc: 'Get 100% of your money back to the original payment method.' },
        ].map((item, i) => (
          <div key={i} className="card dark:bg-gray-800 dark:border-gray-700 p-6 text-center">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-black text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* How to Return */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">How to Return an Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {returnSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 card dark:bg-gray-800 dark:border-gray-700 p-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shrink-0">
                {step.icon}
              </div>
              <div>
                <div className="text-xs font-black text-primary-600 dark:text-primary-400 mb-1">STEP {step.step}</div>
                <h3 className="font-black text-gray-900 dark:text-white mb-1">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Eligible / Non-Eligible */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Eligible */}
        <div className="card dark:bg-gray-800 dark:border-gray-700 p-6">
          <h3 className="flex items-center gap-2 font-black text-green-600 dark:text-green-400 mb-5">
            <CheckCircle className="w-5 h-5" /> Eligible for Return
          </h3>
          <ul className="space-y-3">
            {eligibleItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Non-Eligible */}
        <div className="card dark:bg-gray-800 dark:border-gray-700 p-6">
          <h3 className="flex items-center gap-2 font-black text-red-600 dark:text-red-400 mb-5">
            <XCircle className="w-5 h-5" /> Not Eligible for Return
          </h3>
          <ul className="space-y-3">
            {nonEligibleItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-start gap-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl p-5">
        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Need help with a return?</strong> Contact our support team at{' '}
          <a href="mailto:support@afk.com" className="underline font-bold">support@afk.com</a>{' '}
          or call <strong>+91 9876543210</strong>. We're available Mon–Sat, 9AM–6PM IST.
        </div>
      </div>
    </div>
  );
};

export default ReturnsScreen;
