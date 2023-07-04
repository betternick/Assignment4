// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import itemSlice from '../redux/slices/item-slice';

const store = configureStore({
  reducer: {
    itemSlice,
  },
});

export default store;
