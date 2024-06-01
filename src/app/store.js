import { configureStore } from "@reduxjs/toolkit";
import salesReducer from "../features/sales/salesSlice";

const store = configureStore({
  reducer: {
    sales: salesReducer,
  },
});

export default store;
