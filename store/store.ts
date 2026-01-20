
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/features/user/userSlice";
import categoryReducer from "@/features/category/categorySlice"
import menuReducer from "@/features/menu/menuSlice";
import cartReducer from "@/features/cart/cartSlice";
import menuPublicReducer from "@/features/menuPublic/menuSlicePublic";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user", "category", "menu"],
};

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  menu: menuReducer,
  cart: cartReducer,
  menuPublic: menuPublicReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore(preloadedState?: any) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState,
  });
}

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
