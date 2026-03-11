import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation, useUploadProductsCSVMutation } from '../store/slices/productsApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { Trash2, Edit, Plus, Package, Upload } from 'lucide-react';
import { useRef } from 'react';

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword: '',
    pageNumber: pageNumber || 1,
  });

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Create a new sample product?')) {
      try {
        await createProduct();
        refetch();
        toast.success('Sample product created');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [uploadProductsCSV, { isLoading: loadingUpload }] = useUploadProductsCSVMutation();
  const fileInputRef = useRef(null);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const res = await uploadProductsCSV(formData).unwrap();
      toast.success(res.message);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    // reset input
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
            <div className="bg-primary-50 p-3 rounded-2xl">
                <Package className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Product <span className="text-primary-600">Inventory</span></h1>
        </div>
        <div className="flex items-center space-x-2">
            <input 
                type="file" 
                accept=".csv" 
                ref={fileInputRef} 
                onChange={uploadFileHandler} 
                className="hidden" 
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-outline border-primary-200 text-primary-700 py-3 px-6 flex items-center font-black bg-primary-50 hover:bg-primary-100"
            >
                <Upload className="w-5 h-5 mr-2" /> Upload CSV
            </button>
            <button
            onClick={createProductHandler}
            className="btn-primary py-3 px-6 flex items-center font-black"
            >
            <Plus className="w-5 h-5 mr-2" /> Add Product
            </button>
        </div>
      </div>

      {loadingDelete && <Loader className="w-full h-2" />}
      {loadingCreate && <Loader className="w-full h-2" />}
      {loadingUpload && <Loader className="w-full h-2" />}

      {isLoading ? (
        <Loader className="w-full h-96" />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-xl bg-white">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 italic">
              <tr>
                <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-left">ID</th>
                <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-left">Name</th>
                <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-left">Price</th>
                <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-left">Category</th>
                <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-left">Brand</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 text-xs font-medium text-gray-400 select-all">{product._id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 line-clamp-1">{product.name}</td>
                  <td className="px-6 py-4 text-sm font-black text-primary-600">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{product.brand}</td>
                  <td className="px-6 py-4 flex items-center justify-end space-x-2">
                    <Link to={`/admin/product/${product._id}/edit`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
