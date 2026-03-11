import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../store/slices/productsApiSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { PackageOpen, Save, Upload, ChevronLeft, IndianRupee } from 'lucide-react';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success('Product updated');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link to="/admin/productlist" className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to Inventory
      </Link>

      <div className="flex items-center space-x-4">
        <div className="bg-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-200">
            <PackageOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-black text-gray-900">Edit <span className="text-primary-600">Product</span></h1>
      </div>

      {loadingUpdate && <Loader className="w-full h-2" />}
      {isLoading ? (
        <Loader className="w-full h-96" />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <form onSubmit={submitHandler} className="card p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price (INR)</label>
              <div className="relative">
                 <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field pl-10" />
                 <IndianRupee className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stock Count</label>
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="input-field" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <div className="space-y-2">
                 <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="input-field bg-gray-50 text-xs" />
                 <div className="relative">
                    <input type="file" onChange={uploadFileHandler} className="hidden" id="image-upload" />
                    <label htmlFor="image-upload" className="flex items-center justify-center space-x-2 py-2 px-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all text-xs font-bold text-gray-500">
                      <Upload className="w-4 h-4" /> <span>{loadingUpload ? 'Uploading...' : 'Choose Local Image'}</span>
                    </label>
                 </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
            <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)} className="input-field py-3"></textarea>
          </div>

          <div className="md:col-span-2 pt-4">
            <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center font-black">
              <Save className="w-5 h-5 mr-2" /> Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
