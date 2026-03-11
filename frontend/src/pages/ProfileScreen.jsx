import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../store/slices/usersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import FormContainer from '../components/FormContainer';
import { User, Mail, Lock } from 'lucide-react';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
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
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <div className="flex items-center space-x-4 mb-12">
        <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
        </div>
        <div>
            <h1 className="text-3xl font-black text-gray-900 underline decoration-primary-200 decoration-8 underline-offset-4">Your Profile</h1>
            <p className="text-gray-400 font-medium">Manage your personal information</p>
        </div>
      </div>

      <form onSubmit={submitHandler} className="card p-8 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-gray-400" /> Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field shadow-inner bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center text-left">
            <Mail className="w-4 h-4 mr-2 text-gray-400" /> Email Address
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="input-field bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
          />
        </div>

        <div className="pt-4 border-t border-gray-50 space-y-6 text-left">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Update Password</h3>
            <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center text-left">
                <Lock className="w-4 h-4 mr-2 text-gray-400" /> New Password
            </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field shadow-inner bg-gray-50"
                placeholder="Leave blank to keep current"
            />
            </div>

            <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center text-left">
                <Lock className="w-4 h-4 mr-2 text-gray-400" /> Confirm New Password
            </label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field shadow-inner bg-gray-50"
            />
            </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full btn-primary py-4 font-black tracking-wide"
        >
          {isLoading ? 'Updating...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfileScreen;
