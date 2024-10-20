import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: {
    kw: "",
    page: 1,
    type: ["PNG", "JPEG"]
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
