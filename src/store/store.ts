import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '@/features/cart/cart-slice';
import { productsApi } from '@/features/products/products-api';

const rootReducer = combineReducers({ cart: cartReducer, [productsApi.reducerPath]: productsApi.reducer });
const persistedReducer = persistReducer({ key: 'pms', storage, whitelist: ['cart'] }, rootReducer);
export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(productsApi.middleware),
  });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
