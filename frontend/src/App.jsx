import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import CompareDrawer from './components/CompareDrawer.jsx';
import HomeScreen from './pages/HomeScreen';
import ProductDetailsScreen from './pages/ProductDetailsScreen.jsx';
import CartScreen from './pages/CartScreen.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import RegisterScreen from './pages/RegisterScreen.jsx';
import ShippingScreen from './pages/ShippingScreen.jsx';
import PaymentScreen from './pages/PaymentScreen.jsx';
import PlaceOrderScreen from './pages/PlaceOrderScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import OrderScreen from './pages/OrderScreen.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';
import OrderHistoryScreen from './pages/OrderHistoryScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListScreen from './pages/OrderListScreen.jsx';
import ProductListScreen from './pages/ProductListScreen.jsx';
import ProductEditScreen from './pages/ProductEditScreen.jsx';
import UserListScreen from './pages/UserListScreen.jsx';
import UserEditScreen from './pages/UserEditScreen.jsx';
import WishlistScreen from './pages/WishlistScreen';
import CouponListScreen from './pages/admin/CouponListScreen.jsx';
import CouponEditScreen from './pages/admin/CouponEditScreen.jsx';
import DashboardScreen from './pages/admin/DashboardScreen.jsx';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-column flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route index={true} path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductDetailsScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/wishlist" element={<WishlistScreen />} />
            
            <Route path="" element={<PrivateRoute />}>
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/orders" element={<OrderHistoryScreen />} />
            </Route>

            <Route path="" element={<AdminRoute />}>
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route path="/admin/productlist" element={<ProductListScreen />} />
                <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
                <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                <Route path="/admin/userlist" element={<UserListScreen />} />
                <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
                <Route path="/admin/coupons" element={<CouponListScreen />} />
                <Route path="/admin/coupon/:id/edit" element={<CouponEditScreen />} />
                <Route path="/admin/dashboard" element={<DashboardScreen />} />
            </Route>
          </Routes>
        </main>
        <CompareDrawer />
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default App;
