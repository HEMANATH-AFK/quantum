# 🛒 QuantumCart

QuantumCart is a premium, full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform designed for high performance and a professional user experience. 


## 🚀 Features

- **Full-featured Shopping Cart**: Add, remove, and update quantities.
- **Product Reviews & Ratings**: Verified customer experiences with rating analytics.
- **Product Comparison**: Compare up to 4 products side-by-side.
- **Advanced Search & Pagination**: Effortlessly browse through a large catalog.
- **User Authentication**: Secure login and professional profile management.
- **Order Management**: Comprehensive checkout process with order history and tracking.
- **Admin Dashboard**: Full CRUD for products, users, and orders.
- **Coupon System**: Discount code support for promotions.
- **High-Quality Local Assets**: Optimized product photography stored locally for speed and reliability.

## 🛠️ Tech Stack

- **Frontend**: React, Redux Toolkit, Tailwind CSS v4, Lucide Icons, Recharts.
- **Backend**: Node.js, Express, MongoDB with Mongoose.
- **Security**: JWT authentication and password hashing with bcryptjs.
- **Tools**: Vite, Vitest, Sharp (image optimization).

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/quantumcart.git
cd quantumcart
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:

```env
NODE_ENV = development
PORT = 5000
MONGODB_URI = your_mongodb_connection_string
JWT_SECRET = your_secret_key
```

### 4. Seed Database (Optional)
To populate the database with initial product and user data:
```bash
npm run data:import
```

### 5. Run the Application
```bash
# Run both backend and frontend concurrently
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).


