import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';
import { ShinyButton } from '@hemanath-afk/afk-motion';

const slides = [
  {
    id: 1,
    title: 'Quantum Beats Pro',
    subtitle: 'ANC HEADPHONES',
    description: 'Next-generation adaptive noise cancelling wireless headphones with 60-hour battery life and studio-grade sound stage.',
    price: '₹19,999',
    badge: 'New Drop ✨',
    tagline: 'FUTURE OF AUDIO',
    gradient: 'from-[#0f0c29] via-[#302b63] to-[#24243e]',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    link: '/shop',
    glowColor: 'bg-blue-500/20'
  },
  {
    id: 2,
    title: 'Quantum Mech Pro',
    subtitle: 'TACTILE MECHANICAL KEYBOARD',
    description: 'Hot-swappable tactile mechanical keyboard with premium PBT keycaps and customizable RGB backlight.',
    price: '₹12,500',
    badge: 'Gaming Special 🎮',
    tagline: 'PREMIUM PRECISION',
    gradient: 'from-[#1a0c2e] via-[#4b134f] to-[#7c1d5a]',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80',
    link: '/shop',
    glowColor: 'bg-pink-500/20'
  },
  {
    id: 3,
    title: 'Quantum View 34"',
    subtitle: 'CURVED ULTRASHARP MONITOR',
    description: 'Ultrawide 21:9 curved gaming monitor with 175Hz refresh rate and HDR600 support for immersive visuals.',
    price: '₹38,999',
    badge: 'Limited Stock ⚡',
    tagline: 'IMMERSE YOURSELF',
    gradient: 'from-[#000428] via-[#004e92] to-[#0d0c29]',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    link: '/shop',
    glowColor: 'bg-[#004e92]/30'
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <section className="relative rounded-3xl overflow-hidden shadow-2xl mb-6 min-h-[450px] lg:min-h-[500px]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].gradient} flex flex-col justify-between`}
        >
          {/* Decorative Blur Blobs */}
          <div className={`absolute top-0 left-1/4 w-80 h-80 ${slides[current].glowColor} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse`} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Grid Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-12 md:px-12 md:py-16 items-center flex-grow">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col text-left items-start space-y-4 md:space-y-6">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                {slides[current].tagline}
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
                {slides[current].subtitle} <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {slides[current].title}
                </span>
              </h1>

              <p className="text-white/75 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                {slides[current].description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <ShinyButton onClick={() => window.location.href = slides[current].link} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white font-black px-8 py-4 rounded-2xl hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 active:scale-95 transition-all text-sm tracking-wide shadow-md">
                  🛍️ Shop Now • {slides[current].price}
                </ShinyButton>
              </div>
            </div>

            {/* Right Product Card Collage Column */}
            <div className="lg:col-span-5 flex justify-center items-center relative h-full">
              {/* Product Card Container */}
              <div className="relative group w-full max-w-sm">
                
                {/* Floating Badge 1 */}
                <div className="absolute -top-4 -left-4 z-20 bg-emerald-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg transform -rotate-6 animate-bounce">
                  {slides[current].badge}
                </div>
                
                {/* Main Glass Card */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden transition-transform duration-500">
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Product Image Wrapper */}
                  <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-b from-white/5 to-white/0 p-4 mb-4 flex items-center justify-center overflow-hidden border border-white/5">
                    <img 
                      src={slides[current].image} 
                      alt={slides[current].title} 
                      className="max-h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="text-left space-y-2">
                    <h3 className="text-lg font-black text-white tracking-tight">{slides[current].title}</h3>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-black text-white">{slides[current].price}</span>
                      <button onClick={() => window.location.href = slides[current].link} className="bg-white hover:bg-primary-50 text-gray-900 font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-35 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${current === i ? 'bg-white w-8' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
