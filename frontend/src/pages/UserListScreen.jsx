import { useGetUsersQuery, useDeleteUserMutation } from '../store/slices/usersApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { Trash2, Edit, Users, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn } from '@hemanath-afk/afk-motion';

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
    <FadeIn duration={0.4}>
      <div className="space-y-8 text-left transition-colors duration-300">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-primary-50 dark:bg-primary-950/40 p-3 rounded-2xl">
              <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight text-left">User <span className="text-primary-600 dark:text-primary-400">Accounts</span></h1>
        </div>

        {loadingDelete && <Loader className="w-full h-2" />}

        {isLoading ? (
          <Loader className="w-full h-96" />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-gray-100 dark:border-gray-750 shadow-xl bg-white dark:bg-gray-800">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-750 italic">
                <tr>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-left">ID</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-left">Name</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-left">Email</th>
                  <th className="px-6 py-4 text-xs font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">Admin</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-750">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-750/50 transition-colors group">
                    <td className="px-6 py-4 text-xs font-medium text-gray-400 dark:text-gray-500 select-all">{user._id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      <a href={`mailto:${user.email}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors underline decoration-primary-100 dark:decoration-primary-950/40 decoration-2 underline-offset-4">{user.email}</a>
                    </td>
                    <td className="px-6 py-4 italic text-center">
                      <div className="flex justify-center">
                      {user.isAdmin ? (
                        <ShieldCheck className="w-5 h-5 text-green-500 dark:text-green-400" />
                      ) : (
                        <ShieldAlert className="w-5 h-5 text-gray-300 dark:text-gray-650" />
                      )}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex items-center justify-end space-x-2">
                      <Link to={`/admin/user/${user._id}/edit`} className="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-all">
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all cursor-pointer"
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
    </FadeIn>
  );
};

export default UserListScreen;
