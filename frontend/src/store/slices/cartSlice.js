import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const calculatePrices = (state) => {
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    
    // Calculate discounts
    let discountPrice = 0;
    if (state.coupon) {
        discountPrice = (Number(state.itemsPrice) * (state.coupon.discount / 100)).toFixed(2);
    }
    state.discountPrice = addDecimals(discountPrice);

    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice) - 
        Number(state.discountPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      calculatePrices(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      calculatePrices(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveCoupon: (state, action) => {
        state.coupon = action.payload;
        calculatePrices(state);
    },
    removeCoupon: (state) => {
        state.coupon = null;
        calculatePrices(state);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  saveCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
