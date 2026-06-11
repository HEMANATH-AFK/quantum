import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  product: null,
};

const quickViewSlice = createSlice({
  name: 'quickView',
  initialState,
  reducers: {
    openQuickView: (state, action) => {
      state.isOpen = true;
      state.product = action.payload;
    },
    closeQuickView: (state) => {
      state.isOpen = false;
      state.product = null;
    },
  },
});

export const { openQuickView, closeQuickView } = quickViewSlice.actions;
export default quickViewSlice.reducer;
