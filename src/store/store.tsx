import { configureStore } from "@reduxjs/toolkit";
import { catsApi } from "../services/catsService";
import authReducer from "./slices/authSlice";
import { useDispatch, useSelector } from "react-redux";


const store = configureStore({
  reducer: {
    cats: catsApi.reducer,
    auth: authReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([catsApi.middleware])
      .concat(catsApi.middleware),
});

export type RootState = ReturnType<any>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch();
export const useAppSelector = <T extends any>(selector: (state: any) => T) =>
  useSelector((state: RootState) => selector(state as any));

export { store };
