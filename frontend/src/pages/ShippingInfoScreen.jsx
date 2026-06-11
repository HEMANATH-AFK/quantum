import { Truck, Clock, MapPin, Package, CheckCircle, AlertCircle } from 'lucide-react';

const steps = [
  { icon: <Package className="w-6 h-6" />, title: 'Order Confirmed', desc: 'You receive an email confirmation immediately after placing your order.', time: 'Instantly' },
  { icon: <CheckCircle className="w-6 h-6" />, title: 'Processing', desc: 'Our team verifies payment and prepares your item for dispatch.', time: '0–24 hours' },
  { icon: <Truck className="w-6 h-6" />, title: 'Shipped', desc: 'Your package is handed off to our courier partner. You get a tracking link.', time: '1–2 business days' },
  { icon: <MapPin className="w-6 h-6" />, title: 'Out for Delivery', desc: 'Your package is with the delivery agent and is on the way to you.', time: '2–5 business days' },
  { icon: <CheckCircle className="w-6 h-6" />, title: 'Delivered', desc: 'Package delivered to your doorstep. Enjoy your new tech!', time: 'Done! 🎉' },
];

const zones = [
  { zone: 'Metro Cities', cities: 'Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata', time: '2–3 Days', free: '₹499+' },
  { zone: 'Tier 2 Cities', cities: 'Pune, Jaipur, Lucknow, Ahmedabad, Surat and more', time: '3–5 Days', free: '₹799+' },
  { zone: 'Rest of India', cities: 'All other pincodes', time: '5–7 Days', free: '₹999+' },
];

const ShippingInfoScreen = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-14 py-4">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex w-16 h-16 bg-green-50 dark:bg-green-950/40 rounded-2xl items-center justify-center mx-auto mb-5">
          <Truck className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Shipping Information</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Fast, reliable delivery across India. Track every step of your order.
        </p>
      </div>

      {/* Shipping Timeline */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Order Journey</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-green-500 rounded-full" />
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-6 pl-4">
                <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                  {step.icon}
                </div>
                <div className="card dark:bg-gray-800 dark:border-gray-700 p-5 flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-black text-gray-900 dark:text-white">{step.title}</h3>
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 px-2 py-1 rounded-lg">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Zones */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Delivery Zones & Timelines</h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-5 py-4 font-black text-gray-700 dark:text-gray-300">Zone</th>
                <th className="text-left px-5 py-4 font-black text-gray-700 dark:text-gray-300">Covers</th>
                <th className="text-left px-5 py-4 font-black text-gray-700 dark:text-gray-300">Est. Time</th>
                <th className="text-left px-5 py-4 font-black text-gray-700 dark:text-gray-300">Free Shipping</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={i} className="border-b border-gray-50 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-5 py-4 font-bold text-gray-900 dark:text-white">{z.zone}</td>
                  <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{z.cities}</td>
                  <td className="px-5 py-4 font-bold text-green-600 dark:text-green-400">{z.time}</td>
                  <td className="px-5 py-4 font-bold text-primary-600 dark:text-primary-400">Above {z.free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Note */}
      <div className="flex items-start gap-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-5">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Note:</strong> Delivery timelines are estimates and may vary due to public holidays, high-demand periods, or remote locations. Express delivery options may be available at checkout.
        </div>
      </div>
    </div>
  );
};

export default ShippingInfoScreen;
