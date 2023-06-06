import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userDataType } from "../components/interface/interfaceList";
import { LoginInitalStateType, userSlice } from "./userSlice";
import { userLoginSlice } from "./userSlice";

export interface Rootstate {
  userSlice: userDataType[];
  userLoginSlice: LoginInitalStateType;
}
const store = configureStore({
  reducer: {
    userSlice: userSlice.reducer,
    userLoginSlice: userLoginSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
