import { createSlice } from "@reduxjs/toolkit";
import {
  signUpInitialValuesTypes,
  userDataType,
} from "../components/interface/interfaceList";

const userData = JSON.parse(localStorage.getItem("userData")!);
const userInitialState: userDataType[] = userData == null ? [] : userData;
export const MailList: string[] = [];
if (userInitialState.length > 0) {
  for (let index = 0; index < userInitialState.length; index++) {
    MailList.push(userInitialState[index].email);
  }
}

export interface LoginInitalStateType {
  loginUser: userDataType | null;
}
const LoginInitalState: LoginInitalStateType = {
  loginUser: null,
};
for (let i = 0; i < userInitialState.length; i++) {
  if (userData[i]["isLogin"] == true) {
    LoginInitalState.loginUser = userData[i];
  }
}
export const userSlice = createSlice({
  name: "userSlice",
  initialState: userInitialState,
  reducers: {
    signUpUser(state, action) {
      const userList: userDataType[] = [];
      if (userInitialState.length > 0) {
        for (let index = 0; index < userInitialState.length; index++) {
          userList.push(userInitialState[index]);
        }
      }
      if (MailList.indexOf(action.payload.email) == -1) {
        userList.push(action.payload);
        localStorage.setItem("userData", JSON.stringify(userList));
        MailList.push(action.payload.email);
        state = userList;
      } else {
        throw new Error("Email Address already used");
      }
    },
  },
});

export const userLoginSlice = createSlice({
  name: "userLoginSlice",
  initialState: LoginInitalState,
  reducers: {
    loginUser(state, action) {
      const userData = JSON.parse(localStorage.getItem("userData")!);
      const userInitialState: userDataType[] = userData == null ? [] : userData;
      let userList: userDataType[] = [];
      for (let i = 0; i < userInitialState.length; i++) {
        userList.push(userInitialState[i]);
      }
      const userPosition = MailList.indexOf(action.payload.email);
      if (userPosition != -1) {
        userList = JSON.parse(JSON.stringify(userList));

        for (let pos = 0; pos < userList.length; pos++) {
          if (pos == userPosition) {

            if (
              action.payload.email == userList[pos]["email"] &&
              action.payload.password == userList[pos]["password"]
            ) {
              userList[pos]["isLogin"] = true;
              state.loginUser = userList[pos];
            } else {
              throw new Error("Invalid Email and Password");
            }
          } else {
            userList[pos]["isLogin"] = false;
          }
        }

        localStorage.setItem("userData", JSON.stringify(userList));
      } else {
        throw new Error("Email Not Found");
      }
    },
    logoutUser(state) {
      const userData = JSON.parse(localStorage.getItem("userData")!);
      const userInitialState: userDataType[] = userData == null ? [] : userData;
      let userList: userDataType[] = [];
      for (let i = 0; i < userInitialState.length; i++) {
        const tempState = JSON.parse(JSON.stringify(userInitialState[i]));
        tempState.isLogin = false;
        userList.push(tempState);
      }
      state.loginUser = null;
      localStorage.setItem("userData", JSON.stringify(userList));
    },
  },
});

export const userLoginActions = userLoginSlice.actions;
export const userActions = userSlice.actions;
