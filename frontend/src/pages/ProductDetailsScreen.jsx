import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  useGetRelatedProductsQuery,
  useUploadProductImageMutation,
} from '../store/slices/productsApiSlice';
import { Star, ShoppingCart, ChevronLeft, Heart, Check, X, Camera, MessageSquare } from 'lucide-react';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton';
import Rating from '../components/Rating';
import Review from '../components/Review';
import RatingAnalytics from '../components/RatingAnalytics';
import { addToCart } from '../store/slices/cartSlice';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from '../store/slices/usersApiSlice';
import { FadeIn, FadeUp, ThreeDTilt, ShinyButton, GlowButton, BlurModal } from '@hemanath-afk/afk-motion';

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [reviewImage, setReviewImage] = useState('');
  const [activeReviewImage, setActiveReviewImage] = useState(null);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState(null);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { data: relatedProducts, isLoading: loadingRelated } = useGetRelatedProductsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);
  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !userInfo });
  
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const isInWishlist = wishlist?.some((item) => item._id === productId);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
      const filtered = recentlyViewed.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, 10);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    }
  }, [product, productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      setReviewImage(res);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
        image: reviewImage,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
      setRating(0);
      setComment('');
      setReviewImage('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleWishlist = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(productId).unwrap();
        toast.info('Removed from wishlist');
      } else {
        await addToWishlist({ productId }).unwrap();
        toast.success('Added to wishlist');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const filteredReviews = product && selectedRatingFilter 
    ? product.reviews.filter((r) => Math.floor(r.rating) === selectedRatingFilter)
    : product?.reviews || [];

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <FadeIn duration={0.5}>
      <div className="space-y-8 pb-20 transition-colors duration-300">
        <Link to="/" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
              <ThreeDTilt className="rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 aspect-square relative group">
                  <img
                      src={mainImage || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700"
                  />
              </ThreeDTilt>
              {/* Gallery Thumbnails */}
              {product.images && product.images.length > 0 && (
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                      {[product.image, ...product.images].map((img, i) => (
                          <button 
                              key={i}
                              onClick={() => setMainImage(img)}
                              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-primary-600 dark:border-primary-500 ring-2 ring-primary-100 dark:ring-primary-950' : 'border-transparent dark:hover:border-gray-700'}`}
                          >
                              <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                      ))}
                  </div>
              )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <div className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-2">{product.brand}</div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-6">
              <Rating value={product.rating} text={`(${product.numReviews} Verified Reviews)`} />
            </div>

            <div className="text-3xl font-black text-gray-900 dark:text-white mb-8">₹{product.price.toLocaleString('en-IN')}</div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{product.description}</p>

            <div className="border-t border-b border-gray-100 dark:border-gray-800 py-6 mb-8 space-y-4">
               <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Availability</span>
                  {product.countInStock > 0 ? (
                      product.countInStock <= 5 ? (
                          <span className="text-orange-600 dark:text-orange-400 flex items-center font-bold px-3 py-1 bg-orange-50 dark:bg-orange-950/20 rounded-full">
                              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                              Only {product.countInStock} left in stock - order soon
                          </span>
                      ) : (
                          <span className="text-green-600 dark:text-green-400 flex items-center font-bold px-3 py-1 bg-green-50 dark:bg-green-950/20 rounded-full">
                              <Check className="w-4 h-4 mr-1"/> In Stock
                          </span>
                      )
                  ) : (
                      <span className="text-red-500 dark:text-red-400 flex items-center font-bold px-3 py-1 bg-red-50 dark:bg-red-950/20 rounded-full"><X className="w-4 h-4 mr-1"/> Out of Stock</span>
                  )}
               </div>

               {product.countInStock > 0 && (
                  <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Quantity</span>
                      <select 
                          value={qty} 
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500 font-bold text-gray-700 dark:text-gray-200"
                      >
                          {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))}
                      </select>
                  </div>
               )}
               
               <div className="flex space-x-4 pt-4">
                    <div className="flex-1 flex">
                      <ShinyButton
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                        className="flex-grow btn-primary py-4 px-8 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-primary-200 dark:shadow-none"
                      >
                        <span className="flex items-center justify-center">
                          <ShoppingCart className="w-5 h-5 mr-3" /> Add to Cart
                        </span>
                      </ShinyButton>
                    </div>
                    <button 
                      onClick={toggleWishlist}
                      className={`p-4 rounded-2xl border-2 transition-all ${isInWishlist ? 'bg-primary-50 dark:bg-primary-950/30 border-primary-600 dark:border-primary-500 text-primary-600 dark:text-primary-400' : 'border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-500 hover:border-primary-600 hover:text-primary-600'}`}
                    >
                      <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
                  </div>
            </div>
          </div>
        </div>

        {/* Analytics & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20">
            <div className="lg:col-span-1 space-y-8">
              <RatingAnalytics product={product} selectedRatingFilter={selectedRatingFilter} onSelectRatingFilter={setSelectedRatingFilter} />

              {/* Review Form */}
              {userInfo ? (
                  <div className="card p-6 space-y-6 dark:bg-gray-800 dark:border-gray-700">
                      <h3 className="font-bold text-gray-900 dark:text-white flex items-center">
                          <MessageSquare className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" /> Write a Review
                      </h3>
                      <form onSubmit={submitHandler} className="space-y-4">
                          <div>
                              <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase mb-2">Rating</label>
                              <div className="flex space-x-2">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                      <button 
                                          key={s}
                                          type="button"
                                          onClick={() => setRating(s)}
                                          className={`p-2 rounded-lg transition-all ${rating >= s ? 'text-yellow-450 bg-yellow-50 dark:bg-yellow-950/20' : 'text-gray-200 dark:text-gray-700'}`}
                                      >
                                          <Star className={`w-6 h-6 ${rating >= s ? 'fill-current text-yellow-400' : ''}`} />
                                      </button>
                                  ))}
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase mb-2">Your Photo (Optional)</label>
                              <div className="flex items-center space-x-4">
                                  <label className="flex-1 cursor-pointer bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
                                      <Camera className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-2" />
                                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{reviewImage ? 'Image Selected' : 'Click to upload'}</span>
                                      <input type="file" className="hidden" onChange={uploadFileHandler} />
                                  </label>
                                  {reviewImage && (
                                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md">
                                          <img src={reviewImage} alt="" className="w-full h-full object-cover" />
                                      </div>
                                  )}
                              </div>
                          </div>
                          <div>
                              <label className="block text-xs font-black text-gray-400 dark:text-gray-500 uppercase mb-2">Comment</label>
                              <textarea
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                  rows="4"
                                  className="w-full bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm p-4 focus:ring-2 focus:ring-primary-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                  placeholder="Share your experience..."
                              />
                          </div>
                          <div className="flex">
                            <GlowButton type="submit" disabled={loadingProductReview} className="w-full btn-primary py-3 font-bold shadow-md">
                              Post Review
                            </GlowButton>
                          </div>
                      </form>
                  </div>
              ) : (
                  <Message>Please <Link to="/login" className="font-bold underline">sign in</Link> to write a review</Message>
              )}
            </div>

            {/* Review List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Verified Experiences</h2>
              {filteredReviews.length === 0 ? (
                  <div className="card p-12 text-center text-gray-400 dark:text-gray-500 font-medium dark:bg-gray-800 dark:border-gray-700">
                    {selectedRatingFilter ? 'No reviews with this rating.' : 'No reviews yet. Be the first!'}
                  </div>
              ) : (
                  <div className="space-y-6">
                      {filteredReviews.map((review) => (
                          <Review key={review._id} review={review} onImageClick={setActiveReviewImage} />
                      ))}
                  </div>
              )}
            </div>
        </div>

        {/* Related Products */}
        {!loadingRelated && relatedProducts?.length > 0 && (
          <div className="mt-20">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-12 tracking-tight">You May Also Like</h2>
              <FadeUp duration={0.5}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>
              </FadeUp>
          </div>
        )}

        {/* Review Image Modal Lightbox */}
        {activeReviewImage && (
          <BlurModal onClose={() => setActiveReviewImage(null)}>
            <div className="max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl relative">
              <button 
                onClick={() => setActiveReviewImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <img src={activeReviewImage} alt="User review upload" className="w-full h-auto max-h-[80vh] object-contain" />
            </div>
          </BlurModal>
        )}
      </div>
    </FadeIn>
  );
};

export default ProductDetailsScreen;
