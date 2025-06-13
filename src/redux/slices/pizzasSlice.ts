import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TPizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
};

interface IPizzaSliceState {
  pizzas: TPizzaItem[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const fetchPizzas = createAsyncThunk<TPizzaItem[], Record<string, string>>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<TPizzaItem[]>(
      `https://682dc0774fae188947576122.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}&${search}`,
    );
    return data;
  },
);

const initialState: IPizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
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
        state.status = Status.LOADING;
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<TPizzaItem[]>) => {
        state.pizzas = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.pizzas = [];
      });
  },
});

// export const { } = pizzasSlice.actions;

export default pizzasSlice.reducer;
