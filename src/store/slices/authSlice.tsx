import { createSlice } from "@reduxjs/toolkit";


interface User {
	email: string;
	name: string;
	id: number | null;
	role: string;
  }
  
  interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	error: string | null;
	data: Record<string, any>;
	status: "idle" | "loading" | "succeeded" | "failed";
	userInfo: User;
  }

const initialState:AuthState  = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  data: {},
  status: "idle",
  userInfo: {
    email: "",
    name: "",
    id: null,
    role: "",
  },
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.status = "loading";
      state.data = {};
    },
    loginSuccess(state, { payload }) {
      state.isAuthenticated = true;
      state.user = payload;
      state.loading = false;
      state.error = null;
      state.status = "succeeded";
      state.data = payload;
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
    },
    loginFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
      state.status = "failed";
      state.data = {};
      state.user = null;
    },
    logout(_) {
      return initialState;
    },
    updateUserInfo(state, { payload }) {
      state.userInfo = {
        ...state.userInfo,
        ...payload,
      };
      state.user = {
        ...state.user,
        ...payload,
      };
      state.data = {
        ...state.data,
        ...payload,
      };
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
