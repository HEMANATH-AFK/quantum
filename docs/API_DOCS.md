# QuantumCart API Documentation

## Auth Routes
- `POST /api/users/login` - Authenticate user & get token
- `POST /api/users/logout` - Logout user / clear cookie
- `POST /api/users` - Register a new user

## User Routes
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/wishlist` - Get user wishlist
- `POST /api/users/wishlist` - Add item to wishlist
- `DELETE /api/users/wishlist/:id` - Remove item from wishlist
- `POST /api/users/addresses` - Add shipping address

## Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/related/:id` - Get related products
- `POST /api/products/:id/reviews` - Create a product review
- `GET /api/products/top` - Get top rated products

## Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin only)
- `GET /api/orders` - Get all orders (Admin only)

## Coupon Routes
- `GET /api/coupons` - Get all active coupons
- `GET /api/coupons/:code` - Get coupon by code
- `POST /api/coupons` - Create a coupon (Admin only)
