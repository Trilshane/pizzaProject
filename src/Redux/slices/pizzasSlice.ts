import { RootType } from "../store";
import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: Record<string, string>) => {
    const { category, sort, order } = params;
    const { data } = await axios.get(
      `https://63d8f16874f386d4efe13bb7.mockapi.io/Pizzas?&${category}&sortBy=${sort}&order=${order}`
    );
    return data as PizzaType[];
  }
);

export type PizzaType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  description: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  pizzas: PizzaType[];
  status: Status;
}

const initialState: PizzaSliceState = {
  pizzas: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<PizzaType[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzas = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.pizzas = [];
      state.status = Status.ERROR;
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.pizzas = [];
  //     state.status = "loading";
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.pizzas = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.pizzas = [];
  //     state.status = "error";
  //   },
  // },
});
export const pizzaSelector = (state: RootType) => state.pizza;
export const { setPizzas } = pizzaSlice.actions;
export default pizzaSlice.reducer;
