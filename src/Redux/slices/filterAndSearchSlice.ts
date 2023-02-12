import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootType } from "../store";

export type SortType = {
  name: string;
  sortProperty: "rating" | "price" | "title";
};

interface FilterSliceState {
  filterIndex: number;
  sortObj: SortType;
  searchValue: string;
}
const initialState: FilterSliceState = {
  filterIndex: 0,
  sortObj: { name: "популярности", sortProperty: "rating" },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action: PayloadAction<number>) {
      state.filterIndex = action.payload;
    },
    changeSortCategory(state, action: PayloadAction<SortType>) {
      state.sortObj = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});
export const filterSelector = (state: RootType) => state.filter;
export const { changeFilter, changeSortCategory, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
