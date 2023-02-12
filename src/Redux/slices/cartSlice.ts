import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootType } from "../store";

export type AddedPizza = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  count: number;
  type: string;
  size: number;
  description: string;
};
interface cartSliceState {
  totalPrice: number;
  addedPizzas: AddedPizza[];
}

const initialState: cartSliceState = {
  totalPrice: 0,
  addedPizzas: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<AddedPizza>) {
      const findPizza = state.addedPizzas.find(
        (pizza) => pizza.id === action.payload.id
      );
      if (findPizza) {
        findPizza.count++;
      } else {
        state.addedPizzas.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.addedPizzas.reduce(
        (sum, pizza) => pizza.price * pizza.count + sum,
        0
      );
    },
    minusPizza(state, action: PayloadAction<string>) {
      const findPizza = state.addedPizzas.find(
        (pizza) => pizza.id === action.payload
      );
      if (findPizza) {
        findPizza.count--;
      }
      state.totalPrice = state.addedPizzas.reduce(
        (sum, pizza) => pizza.price * pizza.count + sum,
        0
      );
    },
    removePizza(state, action: PayloadAction<string>) {
      state.addedPizzas = state.addedPizzas.filter(
        (pizza) => pizza.id !== action.payload
      );
      state.totalPrice = state.addedPizzas.reduce(
        (sum, pizza) => pizza.price * pizza.count + sum,
        0
      );
    },
    clearCart(state) {
      state.addedPizzas = [];
      state.totalPrice = 0;
    },
  },
});
export const cartSelector = (state: RootType) => state.cart;
export const { addPizza, removePizza, minusPizza, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
