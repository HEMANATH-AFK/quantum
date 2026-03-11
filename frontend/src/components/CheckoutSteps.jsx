import { Link } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { name: 'Sign In', active: step1, link: '/login' },
    { name: 'Shipping', active: step2, link: '/shipping' },
    { name: 'Payment', active: step3, link: '/payment' },
    { name: 'Place Order', active: step4, link: '/placeorder' },
  ];

  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      {steps.map((step, index) => (
        <div key={step.name} className="flex items-center">
          <div className="flex flex-col items-center">
            {step.active ? (
              <Link to={step.link} className="flex flex-col items-center group">
                <CheckCircle2 className="w-6 h-6 text-primary-600 mb-1" />
                <span className="text-[10px] font-bold text-primary-600 uppercase tracking-tighter">
                  {step.name}
                </span>
              </Link>
            ) : (
              <div className="flex flex-col items-center opacity-30">
                <Circle className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {step.name}
                </span>
              </div>
            )}
          </div>
          {index !== steps.length - 1 && (
            <div className={`w-8 h-[2px] mx-2 mb-4 ${steps[index + 1].active ? 'bg-primary-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
