import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Zap, ShieldCheck, Star } from 'lucide-react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const features = [
    { icon: <Zap className="w-5 h-5" />, text: 'Lightning fast checkout' },
    { icon: <ShieldCheck className="w-5 h-5" />, text: 'Secure & encrypted' },
    { icon: <Star className="w-5 h-5" />, text: 'Exclusive member deals' },
  ];

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
        
        {/* Left — Branding Panel */}
        <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-10 relative overflow-hidden">
          {/* Blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }} />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl italic">Q</span>
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">
              Quantum<span className="text-blue-300">Cart</span>
            </span>
          </div>

          {/* Middle copy */}
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-black text-white leading-tight">
              Your premium<br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                tech store
              </span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              Sign in to access exclusive deals, track your orders, and manage your wishlist.
            </p>
            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-blue-300">
                    {f.icon}
                  </div>
                  <span className="text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 text-white/30 text-xs">
            © {new Date().getFullYear()} QuantumCart. All rights reserved.
          </div>
        </div>

        {/* Right — Form Panel */}
        <div className="flex-1 bg-white dark:bg-gray-900 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-sm w-full mx-auto">
            {/* Mobile logo */}
            <div className="flex items-center gap-2 lg:hidden mb-8">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-base italic">Q</span>
              </div>
              <span className="text-gray-900 dark:text-white font-extrabold text-lg">
                Quantum<span className="text-primary-600 dark:text-primary-400">Cart</span>
              </span>
            </div>

            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Welcome back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Don't have an account?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                className="text-primary-600 dark:text-primary-400 font-bold hover:underline"
              >
                Sign up free
              </Link>
            </p>

            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="login-submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-black rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary-500/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none text-sm tracking-wide mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  'Sign In →'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
