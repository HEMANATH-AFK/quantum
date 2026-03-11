import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../store/slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { UserCheck, Shield, ChevronLeft, Save } from 'lucide-react';

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 text-left">
      <Link to="/admin/userlist" className="inline-flex items-center text-gray-500 hover:text-primary-600 transition-colors text-left">
        <ChevronLeft className="w-5 h-5 mr-1" /> Back to User List
      </Link>

      <div className="flex items-center space-x-4">
        <div className="bg-primary-600 p-3 rounded-2xl shadow-lg">
            <UserCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-black text-gray-900">Edit <span className="text-primary-600">Permissions</span></h1>
      </div>

      {loadingUpdate && <Loader className="w-full h-2" />}
      {isLoading ? (
        <Loader className="w-full h-96" />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <form onSubmit={submitHandler} className="card p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field shadow-inner bg-gray-50" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field shadow-inner bg-gray-50" />
          </div>

          <div className="flex items-center space-x-3 p-4 bg-primary-50 rounded-2xl border border-primary-200">
            <input
              type="checkbox"
              id="is-admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="w-5 h-5 text-primary-600 rounded-lg focus:ring-primary-500"
            />
            <label htmlFor="is-admin" className="font-bold text-gray-900 flex items-center cursor-pointer">
                <Shield className="w-4 h-4 mr-2 text-primary-600" /> Administrator Account
            </label>
          </div>

          <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center font-black">
            <Save className="w-5 h-5 mr-2" /> Update Permissions
          </button>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
