import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params, thunkAPI) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://682dc0774fae188947576122.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`,
  );
  return data;
});

const initialState = {
  pizzas: [],
  status: 'loading',
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.pizzas = [];
      });
  },
});
// export const { } = pizzasSlice.actions;

export default pizzasSlice.reducer;
