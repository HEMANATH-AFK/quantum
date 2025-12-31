import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import { Store } from './Store';
import { getError } from './utils';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import SearchBox from './components/SearchBox';

import { Navbar, Container, Nav, Badge, Button, NavDropdown } from 'react-bootstrap';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'https://quantumafk-backend.onrender.com';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories for sidebar
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  // Sign out
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
      <div className={sidebarIsOpen ? 'd-flex flex-column site-container active-cont' : 'd-flex flex-column site-container'}>
        <ToastContainer position="bottom-center" limit={1} />

        {/* Header Navbar */}
        <header>
          <Navbar expand="lg">
            <Container>
              <Button onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
                <i className="fas fa-bars"></i>
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/" className="navbar-brand">
                Quantum Cart
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="user-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/profile">User Profile</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/orderhistory">Order History</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Link to="/signin" className="nav-link">Sign In</Link>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/admin/dashboard">Dashboard</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/products">Products</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/orders">Orders</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        {/* Sidebar */}
        <div className={sidebarIsOpen ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column' : 'side-navbar d-flex justify-content-between flex-wrap flex-column'}>
          <Nav className="flex-column w-100 p-2">
            <Nav.Item><strong>Categories</strong></Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <Nav.Link as={Link} to={`/search?category=${category}`} onClick={() => setSidebarIsOpen(false)}>
                  {category}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>

        {/* Main Routes */}
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />

              <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
              <Route path="/order/:id" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
              <Route path="/orderhistory" element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>} />

              <Route path="/admin/dashboard" element={<AdminRoute><DashboardScreen /></AdminRoute>} />
              <Route path="/admin/products" element={<AdminRoute><ProductListScreen /></AdminRoute>} />
              <Route path="/admin/product/:id" element={<AdminRoute><ProductEditScreen /></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><OrderListScreen /></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><UserListScreen /></AdminRoute>} />
              <Route path="/admin/user/:id" element={<AdminRoute><UserEditScreen /></AdminRoute>} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
