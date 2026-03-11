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
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton';
import Rating from '../components/Rating';
import Review from '../components/Review';
import RatingAnalytics from '../components/RatingAnalytics';
import { addToCart } from '../store/slices/cartSlice';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation, useGetWishlistQuery } from '../store/slices/usersApiSlice';

const ProductDetailsScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [reviewImage, setReviewImage] = useState('');

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
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

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

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>;

  return (
    <div className="space-y-8 pb-20">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white aspect-square relative group">
                <img
                    src={mainImage || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            {/* Gallery Thumbnails */}
            {product.images && product.images.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {[product.image, ...product.images].map((img, i) => (
                        <button 
                            key={i}
                            onClick={() => setMainImage(img)}
                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-primary-600 ring-2 ring-primary-100' : 'border-transparent hover:border-gray-200'}`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2">{product.brand}</div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-2 mb-6">
            <Rating value={product.rating} text={`(${product.numReviews} Verified Reviews)`} />
          </div>

          <div className="text-3xl font-black text-gray-900 mb-8">₹{product.price.toLocaleString('en-IN')}</div>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="border-t border-b border-gray-100 py-6 mb-8 space-y-4">
             <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Availability</span>
                {product.countInStock > 0 ? (
                    product.countInStock <= 5 ? (
                        <span className="text-orange-600 flex items-center font-bold px-3 py-1 bg-orange-50 rounded-full">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                            Only {product.countInStock} left in stock - order soon
                        </span>
                    ) : (
                        <span className="text-green-600 flex items-center font-bold px-3 py-1 bg-green-50 rounded-full">
                            <Check className="w-4 h-4 mr-1"/> In Stock
                        </span>
                    )
                ) : (
                    <span className="text-red-500 flex items-center font-bold px-3 py-1 bg-red-50 rounded-full"><X className="w-4 h-4 mr-1"/> Out of Stock</span>
                )}
             </div>

             {product.countInStock > 0 && (
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm font-medium">Quantity</span>
                    <select 
                        value={qty} 
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500 font-bold text-gray-700"
                    >
                        {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                    </select>
                </div>
             )}
             
             <div className="flex space-x-4 pt-4">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="flex-1 btn-primary py-4 px-8 rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-primary-200"
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" /> Add to Cart
                  </button>
                  <button 
                    onClick={toggleWishlist}
                    className={`p-4 rounded-2xl border-2 transition-all ${isInWishlist ? 'bg-primary-50 border-primary-600 text-primary-600' : 'border-gray-100 text-gray-400 hover:border-primary-600 hover:text-primary-600'}`}
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
            <RatingAnalytics product={product} />

            {/* Review Form */}
            {userInfo ? (
                <div className="card p-6 space-y-6">
                    <h3 className="font-bold text-gray-900 flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2 text-primary-600" /> Write a Review
                    </h3>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Rating</label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button 
                                        key={s}
                                        type="button"
                                        onClick={() => setRating(s)}
                                        className={`p-2 rounded-lg transition-all ${rating >= s ? 'text-yellow-400 bg-yellow-50' : 'text-gray-200'}`}
                                    >
                                        <Star className={`w-6 h-6 ${rating >= s ? 'fill-current' : ''}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Your Photo (Optional)</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex-1 cursor-pointer bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                                    <Camera className="w-6 h-6 text-gray-400 mb-2" />
                                    <span className="text-xs text-gray-500 font-medium">{reviewImage ? 'Image Selected' : 'Click to upload'}</span>
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
                            <label className="block text-xs font-black text-gray-400 uppercase mb-2">Comment</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="4"
                                className="w-full bg-gray-50 border-none rounded-xl text-sm p-4 focus:ring-2 focus:ring-primary-500 outline-none"
                                placeholder="Share your experience..."
                            />
                        </div>
                        <button type="submit" disabled={loadingProductReview} className="w-full btn-primary py-3 font-bold shadow-md">
                            Post Review
                        </button>
                    </form>
                </div>
            ) : (
                <Message>Please <Link to="/login" className="font-bold underline">sign in</Link> to write a review</Message>
            )}
          </div>

          {/* Review List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Verified Experiences</h2>
            {product.reviews.length === 0 ? (
                <div className="card p-12 text-center text-gray-400 font-medium">No reviews yet. Be the first!</div>
            ) : (
                <div className="space-y-6">
                    {product.reviews.map((review) => (
                        <Review key={review._id} review={review} />
                    ))}
                </div>
            )}
          </div>
      </div>

      {/* Related Products */}
      {!loadingRelated && relatedProducts?.length > 0 && (
        <div className="mt-20">
            <h2 className="text-2xl font-black text-gray-900 mb-12 tracking-tight">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                    <ProductCard key={p._id} product={p} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsScreen;

