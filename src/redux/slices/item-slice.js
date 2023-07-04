// src/redux/slices/item-slice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from '../../axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await server.get('items');
  return response.data;
});

export const getItem = createAsyncThunk('items/getItem', async (name) => {
  const response = await server.get(`items/${name}`);
  return response.data;
});

export const searchItems = createAsyncThunk(
  'items/searchItems',
  async (name) => {
    const response = await server.get(`search?q=${name}`);
    return response.data;
  }
);

export const addItem = createAsyncThunk('items/addItem', async (item) => {
  const response = await server.post('items', item);
  return response.data;
});

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ name, item }) => {
    const response = await server.patch(`items/${name}`, item);
    return { formData: item, data: response.data };
  }
);

export const removeItem = createAsyncThunk('items/removeItem', async (name) => {
  const response = await server.delete(`items/${name}`);
  return response.data;
});

export const removeAllItems = createAsyncThunk(
  'items/removeAllItems',
  async () => {
    const response = await server.delete('items');
    return response.data;
  }
);

const itemSlice = createSlice({
  name: 'itemSlice',
  initialState: { items: [], edit: false, formData: {} },
  reducers: {
    setEdit(state, { payload }) {
      state.edit = payload;
    },
  },
  extraReducers: {
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [getItem.fulfilled]: (state, action) => {
      state.formData = action.payload;
      state.edit = true;
    },
    [addItem.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [searchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [updateItem.fulfilled]: (state, action) => {
      state.items = action.payload.data;
      state.formData = action.payload.formData;
    },
    [removeItem.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [removeAllItems.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setEdit } = itemSlice.actions;

export default itemSlice.reducer;
