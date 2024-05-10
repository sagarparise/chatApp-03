import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUsers: null,
    getOnlineUsers: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUsers: (state, action) => {
      state.selectedUsers = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.getOnlineUsers = action.payload;
    }
  },
})

export const { setAuthUser, setOtherUsers, setSelectedUsers, setOnlineUsers } = userSlice.actions;

export default userSlice.reducer;