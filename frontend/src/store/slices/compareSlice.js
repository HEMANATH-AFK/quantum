import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  compareItems: localStorage.getItem('compare')
    ? JSON.parse(localStorage.getItem('compare'))
    : [],
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const item = action.payload;
      const existItem = state.compareItems.find((x) => x._id === item._id);

      if (!existItem) {
        if (state.compareItems.length >= 4) {
             state.compareItems.shift(); // keep max 4
        }
        state.compareItems.push(item);
        localStorage.setItem('compare', JSON.stringify(state.compareItems));
      }
    },
    removeFromCompare: (state, action) => {
      state.compareItems = state.compareItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('compare', JSON.stringify(state.compareItems));
    },
    clearCompare: (state) => {
      state.compareItems = [];
      localStorage.removeItem('compare');
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
