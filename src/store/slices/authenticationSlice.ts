import { IUser } from "@/store/models/IUser";
import { CookieManager } from "@/utils/CookieManager";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  userInfo: IUser | null;
}

const initialState: UserInfoState = {
  userInfo: CookieManager.getUserInfoFromAccessToken(),
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser | null>) => {
      state.userInfo = action.payload;
    },
    removeCredentials: (state) => {
      state.userInfo = null;
      CookieManager.removeAccessToken();
    },
  },
});

export const { setCredentials, removeCredentials } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
