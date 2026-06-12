import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  useProfileMutation,
  useGetProfileQuery,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useAddAddressMutation,
} from '../store/slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../store/slices/ordersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import {
  User,
  Mail,
  Lock,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Calendar,
  Sparkles,
  Home,
  CheckCircle,
  Clock,
  Loader,
} from 'lucide-react';
import { FadeIn, ShinyButton } from '@hemanath-afk/afk-motion';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // original settings state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Address form state
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const dispatch = useDispatch();

  // Queries
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
  const { data: orders, isLoading: loadingOrders } = useGetMyOrdersQuery();
  const { data: wishlist, isLoading: loadingWishlist } = useGetWishlistQuery();

  // Mutations
  const [updateProfile, { isLoading: updatingProfile }] = useProfileMutation();
  const [addAddress, { isLoading: addingAddress }] = useAddAddressMutation();
  const [removeFromWishlist, { isLoading: removingWishlist }] = useRemoveFromWishlistMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    } else if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [profile, userInfo]);

  const submitProfileHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        setPassword('');
        setConfirmPassword('');
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const addAddressHandler = async (e) => {
    e.preventDefault();
    try {
      await addAddress({ address, city, postalCode, country }).unwrap();
      toast.success('Address added successfully');
      setAddress('');
      setCity('');
      setPostalCode('');
      setCountry('');
      setShowAddAddressForm(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const removeWishlistHandler = async (productId) => {
    try {
      await removeFromWishlist(productId).unwrap();
      toast.success('Removed from wishlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Metrics
  const totalSpent = orders?.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0) || 0;
  const isVIP = totalSpent > 500;
  const orderCount = orders?.length || 0;
  const wishlistCount = wishlist?.length || 0;
  const savedAddresses = profile?.addresses || [];

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'orders', label: 'Order History', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'wishlist', label: 'My Wishlist', icon: <Heart className="w-4 h-4" /> },
    { id: 'addresses', label: 'Address Book', icon: <MapPin className="w-4 h-4" /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  if (loadingProfile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader className="w-10 h-10 text-primary-600 animate-spin" />
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Loading Account...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 transition-colors duration-300">
      <FadeIn duration={0.4}>
        
        {/* Profile Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 text-white p-6 md:p-10 text-left">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 text-3xl font-black italic shadow-lg">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </div>
            
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl font-black tracking-tight">{name || 'User'}</h1>
                {isVIP ? (
                  <span className="inline-flex items-center gap-1 bg-amber-400 text-gray-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    <Sparkles className="w-3 h-3 fill-current animate-pulse" /> VIP Member
                  </span>
                ) : (
                  <span className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/20 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Standard Member
                  </span>
                )}
              </div>
              <p className="text-white/80 font-medium text-sm flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-white/60" /> {email}
              </p>
            </div>
            
            <div className="bg-black/15 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex gap-6 text-center shrink-0">
              <div>
                <div className="text-2xl font-black">{orderCount}</div>
                <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Orders</div>
              </div>
              <div className="border-l border-white/10" />
              <div>
                <div className="text-2xl font-black">{wishlistCount}</div>
                <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Wishlist</div>
              </div>
              <div className="border-l border-white/10" />
              <div>
                <div className="text-2xl font-black">${totalSpent.toFixed(2)}</div>
                <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Total Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-gray-100 dark:border-gray-800 mb-8 scrollbar-none whitespace-nowrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-bold text-sm transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="text-left">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card p-6 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Total Spending</h3>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">${totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="card p-6 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Orders Count</h3>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{orderCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                </div>

                <div className="card p-6 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Saved Items</h3>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{wishlistCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                </div>

                <div className="card p-6 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
                  <div>
                    <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Account Tier</h3>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{isVIP ? 'VIP Member' : 'Elite Tier'}</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Grid sections */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Recent Orders */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-gray-900 dark:text-white">Recent Orders</h2>
                    <button onClick={() => setActiveTab('orders')} className="text-sm font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:underline">
                      See all <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {loadingOrders ? (
                    <div className="p-6 text-center bg-gray-50 dark:bg-gray-850 rounded-2xl">
                      <Loader className="w-6 h-6 text-gray-400 animate-spin mx-auto" />
                    </div>
                  ) : !orders || orders.length === 0 ? (
                    <div className="card p-8 text-center text-gray-400 dark:text-gray-500 font-medium dark:bg-gray-800 dark:border-gray-700">
                      <ShoppingBag className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-655" />
                      No orders placed yet.
                      <Link to="/shop" className="block text-primary-600 dark:text-primary-400 font-bold mt-2 hover:underline">
                        Start Shopping →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.slice(0, 2).map((order) => (
                        <div key={order._id} className="card p-5 dark:bg-gray-800 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-sm text-gray-900 dark:text-white">Order #{order._id.substring(18).toUpperCase()}</span>
                              <span className="text-xs text-gray-400 font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {order.isPaid ? (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                  <CheckCircle className="w-3 h-3" /> Paid
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                  <Clock className="w-3 h-3" /> Unpaid
                                </span>
                              )}
                              {order.isDelivered ? (
                                <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                  <CheckCircle className="w-3 h-3" /> Delivered
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                  <Clock className="w-3 h-3" /> Processing
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                            <div className="text-left sm:text-right">
                              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total</div>
                              <div className="font-black text-gray-950 dark:text-white">${order.totalPrice.toFixed(2)}</div>
                            </div>
                            <Link to={`/order/${order._id}`} className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1">
                              View details <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Loyalty and Address Column */}
                <div className="space-y-6">
                  {/* Loyalty Card */}
                  {(() => {
                    const loyaltyPoints = Math.floor(totalSpent / 100);
                    let currentTier = 'Bronze';
                    let nextTier = 'Silver';
                    let pointsNeeded = 100 - loyaltyPoints;
                    let progress = (loyaltyPoints / 100) * 100;
                    let tierColor = 'from-amber-700 to-amber-900'; // Bronze

                    if (loyaltyPoints >= 1000) {
                      currentTier = 'Platinum';
                      nextTier = 'Max';
                      pointsNeeded = 0;
                      progress = 100;
                      tierColor = 'from-teal-500 via-cyan-600 to-blue-700';
                    } else if (loyaltyPoints >= 300) {
                      currentTier = 'Gold';
                      nextTier = 'Platinum';
                      pointsNeeded = 1000 - loyaltyPoints;
                      progress = ((loyaltyPoints - 300) / 700) * 100;
                      tierColor = 'from-yellow-500 via-amber-500 to-orange-600';
                    } else if (loyaltyPoints >= 100) {
                      currentTier = 'Silver';
                      nextTier = 'Gold';
                      pointsNeeded = 300 - loyaltyPoints;
                      progress = ((loyaltyPoints - 100) / 200) * 100;
                      tierColor = 'from-slate-400 to-slate-600';
                    }

                    return (
                      <div className={`card p-6 bg-gradient-to-br ${tierColor} text-white border-none shadow-xl rounded-2xl relative overflow-hidden`}>
                        {/* Decorative Background Circles */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-black/10 rounded-full blur-md pointer-events-none" />

                        <div className="relative z-10 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full border border-white/10">
                              Loyalty Rewards
                            </span>
                            <Sparkles className="w-5 h-5 text-white animate-pulse" />
                          </div>

                          <div>
                            <span className="text-2xl font-black">{currentTier} Tier</span>
                            <p className="text-3xl font-black mt-1">{loyaltyPoints.toLocaleString()} <span className="text-xs font-bold text-white/75">Points</span></p>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-white/80">
                              <span>Progress to {nextTier}</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-black/25 rounded-full h-2 overflow-hidden border border-white/5">
                              <div className="bg-white h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                            </div>
                          </div>

                          {pointsNeeded > 0 ? (
                            <p className="text-[11px] font-semibold text-white/90">
                              Spend ₹{(pointsNeeded * 100).toLocaleString('en-IN')} more to reach <span className="font-black underline">{nextTier}</span> tier!
                            </p>
                          ) : (
                            <p className="text-[11px] font-black text-white">
                              🎉 You have reached our highest status tier!
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Default Address */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-black text-gray-900 dark:text-white">Primary Address</h2>
                  {savedAddresses.length === 0 ? (
                    <div className="card p-8 text-center text-gray-400 dark:text-gray-500 font-medium dark:bg-gray-800 dark:border-gray-700 h-[calc(100%-44px)] flex flex-col items-center justify-center">
                      <MapPin className="w-10 h-10 mb-3 text-gray-300 dark:text-gray-655" />
                      No shipping address set.
                      <button onClick={() => setActiveTab('addresses')} className="text-primary-600 dark:text-primary-400 font-bold mt-2 hover:underline cursor-pointer">
                        Add Address Now
                      </button>
                    </div>
                  ) : (
                    <div className="card p-6 dark:bg-gray-800 dark:border-gray-700 h-[calc(100%-44px)] flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="w-10 h-10 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-gray-900 dark:text-white">{name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{savedAddresses[0].address}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{savedAddresses[0].city}, {savedAddresses[0].postalCode}</p>
                          <p className="text-sm font-semibold text-gray-400 dark:text-gray-500">{savedAddresses[0].country}</p>
                        </div>
                      </div>
                      
                      <button onClick={() => setActiveTab('addresses')} className="text-xs text-primary-600 dark:text-primary-400 font-black hover:underline mt-4 cursor-pointer">
                        Manage Address Book →
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">All Orders</h2>
              {loadingOrders ? (
                <div className="min-h-[200px] flex items-center justify-center">
                  <Loader className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
              ) : !orders || orders.length === 0 ? (
                <div className="card p-12 text-center text-gray-400 dark:text-gray-500 dark:bg-gray-800 dark:border-gray-700">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  You haven't placed any orders yet.
                  <Link to="/shop" className="block text-primary-600 dark:text-primary-400 font-bold mt-2 hover:underline">
                    Browse Shop Catalog
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {orders.map((order) => (
                    <div key={order._id} className="card p-6 dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                        <div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Order ID</div>
                          <span className="font-extrabold text-sm text-gray-900 dark:text-white">#{order._id.toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Date</div>
                          <span className="text-sm text-gray-600 dark:text-gray-300 font-semibold">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total</div>
                          <span className="text-sm font-black text-gray-950 dark:text-white">${order.totalPrice.toFixed(2)}</span>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Status</div>
                          <div className="flex gap-1.5 mt-0.5">
                            {order.isPaid ? (
                              <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                Paid
                              </span>
                            ) : (
                              <span className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                Unpaid
                              </span>
                            )}
                            {order.isDelivered ? (
                              <span className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                Delivered
                              </span>
                            ) : (
                              <span className="bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded">
                                Processing
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="shrink-0 flex items-center justify-end">
                        <Link to={`/order/${order._id}`} className="btn-primary py-2.5 px-5 text-sm font-bold flex items-center gap-1.5">
                          Details <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">My Saved Items</h2>
              {loadingWishlist ? (
                <div className="min-h-[200px] flex items-center justify-center">
                  <Loader className="w-8 h-8 text-primary-600 animate-spin" />
                </div>
              ) : !wishlist || wishlist.length === 0 ? (
                <div className="card p-12 text-center text-gray-400 dark:text-gray-500 dark:bg-gray-800 dark:border-gray-700">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  Your wishlist is empty.
                  <Link to="/shop" className="block text-primary-600 dark:text-primary-400 font-bold mt-2 hover:underline">
                    Browse Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {wishlist.map((product) => (
                    <div key={product._id} className="card p-4 dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
                      <div>
                        {/* Image wrapper */}
                        <div className="relative aspect-square w-full rounded-2xl bg-gray-50 dark:bg-gray-900 p-4 mb-4 flex items-center justify-center border border-gray-100 dark:border-gray-750">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-primary-500 uppercase">{product.category}</span>
                        <h3 className="font-extrabold text-gray-900 dark:text-white text-base mt-1 line-clamp-1">{product.name}</h3>
                        <p className="font-black text-lg text-gray-950 dark:text-white mt-1">${product.price.toFixed(2)}</p>
                      </div>

                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-750">
                        <Link to={`/product/${product._id}`} className="flex-1 btn-primary py-2 text-center text-xs font-bold flex items-center justify-center gap-1">
                          View details
                        </Link>
                        <button
                          disabled={removingWishlist}
                          onClick={() => removeWishlistHandler(product._id)}
                          className="w-10 h-10 border border-gray-200 dark:border-gray-700 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Shipping Addresses</h2>
                <button
                  onClick={() => setShowAddAddressForm(!showAddAddressForm)}
                  className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Address
                </button>
              </div>

              {/* Add Address Form Box */}
              {showAddAddressForm && (
                <form onSubmit={addAddressHandler} className="card p-6 dark:bg-gray-800 dark:border-gray-700 max-w-lg space-y-4">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base">New Address Details</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                      <Home className="w-3.5 h-3.5 mr-1 text-gray-400" /> Street Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Quantum St, Suite 404"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-205 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-905 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="San Jose"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-205 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-905 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="95101"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-205 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-905 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Country</label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="United States"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-205 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-905 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={addingAddress}
                      className="btn-primary py-2 px-4 text-xs font-bold cursor-pointer"
                    >
                      {addingAddress ? 'Saving...' : 'Save Address'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddressForm(false)}
                      className="border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-bold text-xs py-2 px-4 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Addresses Display */}
              {savedAddresses.length === 0 ? (
                <div className="card p-12 text-center text-gray-400 dark:text-gray-500 dark:bg-gray-800 dark:border-gray-700">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  Your address book is empty. Add a shipping address for faster checkouts.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedAddresses.map((addr, index) => (
                    <div key={addr._id || index} className="card p-6 dark:bg-gray-800 dark:border-gray-700 flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-950 dark:text-white">Address {index + 1}</span>
                          {index === 0 && (
                            <span className="bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 text-[9px] font-bold px-1.5 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{addr.address}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{addr.city}, {addr.postalCode}</p>
                        <p className="text-sm text-gray-450 dark:text-gray-500 font-semibold">{addr.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Profile Details</h2>
              
              <form onSubmit={submitProfileHandler} className="card p-8 space-y-6 dark:bg-gray-800 dark:border-gray-700">
                <div>
                  <label className="block text-sm font-bold text-gray-750 dark:text-gray-300 mb-2 flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-550" /> Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-750 dark:text-gray-300 mb-2 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-550" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-750 bg-gray-100 dark:bg-gray-850 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50 outline-none text-sm"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 font-medium">To change your email address, contact support.</p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-750 space-y-6">
                  <h3 className="text-sm font-black text-gray-400 dark:text-gray-550 uppercase tracking-widest">Update Password</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-750 dark:text-gray-300 mb-2 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-555" /> New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                        placeholder="Leave blank to keep current"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-305 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-750 dark:text-gray-300 mb-2 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-555" /> Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-305 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex pt-2">
                  <button
                    disabled={updatingProfile}
                    type="submit"
                    className="w-full btn-primary py-4 font-black tracking-wide rounded-xl cursor-pointer"
                  >
                    {updatingProfile ? 'Updating Profile...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </FadeIn>
    </div>
  );
};

export default ProfileScreen;
