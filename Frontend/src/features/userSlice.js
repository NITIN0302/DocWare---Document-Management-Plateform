import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  pageCount: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.userName = action.payload; // direct payload, not `action.payload.username`
    },
    setPagecount: (state,action) => {
      state.pageCount = action.payload;
    },
  },
});

export const { setUsername, setPagecount } = userSlice.actions;
export default userSlice.reducer;
