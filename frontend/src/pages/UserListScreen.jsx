import { useGetUsersQuery, useDeleteUserMutation } from '../store/slices/usersApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { Trash2, Edit, Users, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-primary-50 p-3 rounded-2xl">
            <Users className="w-8 h-8 text-primary-600" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight text-left">User <span className="text-primary-600">Accounts</span></h1>
      </div>

      {loadingDelete && <Loader className="w-full h-2" />}

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
                <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-left">Email</th>
                <th className="px-6 py-4 text-xs font-black text-gray-500 uppercase tracking-widest text-center">Admin</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 text-xs font-medium text-gray-400 select-all">{user._id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    <a href={`mailto:${user.email}`} className="hover:text-primary-600 transition-colors underline decoration-primary-100 decoration-2 underline-offset-4">{user.email}</a>
                  </td>
                  <td className="px-6 py-4 italic text-center">
                    <div className="flex justify-center">
                    {user.isAdmin ? (
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-gray-300" />
                    )}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end space-x-2">
                    <Link to={`/admin/user/${user._id}/edit`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
