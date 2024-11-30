import { createSlice } from "@reduxjs/toolkit";
import { FILE_TYPES } from "../../assets/js/constants";

const initialState = {
  options: {
    title: "",
    page: 1,
    type: Object.values(FILE_TYPES)
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setOptions(state, action) {
      state.options = action.payload;
    },
  },
});

export const { setOptions } = searchSlice.actions;
export default searchSlice.reducer;
