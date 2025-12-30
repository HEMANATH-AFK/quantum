import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Container, Nav, Badge} from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Store } from './Store'
import { useContext, useEffect, useState } from 'react';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';


function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';

  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
      <ToastContainer position="bottom-center" limit={1} />
      <header> 
        <Navbar expand="lg">
          <Container>
              <Button
                
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/'>
              <Navbar.Brand>Quantum Cart</Navbar.Brand>
            </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                      <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/profile">
                          User Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/orderhistory">
                          Order History
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={signoutHandler}>
                          Sign Out
                        </NavDropdown.Item>
                      </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                   {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/dashboard">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/products">
                      Products
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/users">
                      Users
                    </NavDropdown.Item>
                  </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>

          </Container>
        </Navbar>
      </header> 
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column  w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((categories) => (
              <Nav.Item key={categories}>
                <Nav.Link
                  as={Link}
                  to={`/search?category=${categories}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {categories}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </div>
       <main>
        <Container className='mt-3'>
        <Routes>
          <Route path='/product/:slug' element={<ProductScreen />}/>
          <Route path='/' element={<HomeScreen />}/>
          <Route path='/cart' element={<CartScreen/>} />
          <Route path='/signin' element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/profile" element={
            <ProtectedRoute>
                    <ProfileScreen />
              </ProtectedRoute>
            }
              />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/orderhistory" element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                } />
          <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }>
              </Route>

              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
               <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

        </Routes>
        </Container>
      </main> 

    </div>
    </BrowserRouter>
  );
}

export default App;
