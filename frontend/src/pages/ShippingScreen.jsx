import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../store/slices/cartSlice';
import { useGetProfileQuery, useAddAddressMutation } from '../store/slices/usersApiSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [saveNewAddress, setSaveNewAddress] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [addAddressApi, { isLoading: isAddingAddress }] = useAddAddressMutation();

  const handleSelectAddress = (selectedAddress) => {
    setAddress(selectedAddress.address);
    setCity(selectedAddress.city);
    setPostalCode(selectedAddress.postalCode);
    setCountry(selectedAddress.country);
    setSaveNewAddress(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (saveNewAddress) {
        try {
            await addAddressApi({ address, city, postalCode, country }).unwrap();
            toast.success('Address saved to profile');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            // Optionally, we could return here to prevent proceeding if saving fails,
            // but usually we want to let the checkout continue even if saving fails.
        }
    }

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="text-3xl font-black text-gray-900 mb-8">Shipping</h1>

      {/* Saved Addresses Section */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : profile?.addresses && profile.addresses.length > 0 ? (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Saved Addresses</h2>
            <div className="grid gap-4 md:grid-cols-2">
                {profile.addresses.map((addr) => (
                    <div 
                        key={addr._id}
                        onClick={() => handleSelectAddress(addr)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                            address === addr.address && city === addr.city 
                            ? 'border-primary-600 bg-primary-50' 
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                    >
                        <p className="font-medium text-gray-900">{addr.address}</p>
                        <p className="text-sm text-gray-500">{addr.city}, {addr.postalCode}</p>
                        <p className="text-sm text-gray-500">{addr.country}</p>
                    </div>
                ))}
            </div>
            <div className="relative flex py-6 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-bold uppercase">Or enter new address</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>
        </div>
      ) : null}

      <form onSubmit={submitHandler} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="input-field"
            placeholder="123 Main St"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
            <input
                type="text"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                className="input-field"
                placeholder="New York"
            />
            </div>

            <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
            <input
                type="text"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                className="input-field"
                placeholder="10001"
            />
            </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
          <input
            type="text"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            className="input-field"
            placeholder="USA"
          />
        </div>

        <div className="flex items-center space-x-2 py-2">
            <input
                type="checkbox"
                id="saveAddress"
                checked={saveNewAddress}
                onChange={(e) => setSaveNewAddress(e.target.checked)}
                className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4"
            />
            <label htmlFor="saveAddress" className="text-sm text-gray-700 font-medium cursor-pointer">
                Save this address for future checkouts
            </label>
        </div>

        <button 
            type="submit" 
            className="w-full btn-primary py-4 font-black flex justify-center items-center"
            disabled={isAddingAddress}
        >
          {isAddingAddress ? 'Saving...' : 'Continue to Payment'}
        </button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
