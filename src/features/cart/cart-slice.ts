import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

export interface CartItem { product: Product; quantity: number; }
interface CartState { items: CartItem[]; }
const initialState: CartState = { items: [] };
const cartSlice = createSlice({
  name: 'cart', initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) { const item = state.items.find(({ product }) => product.id === action.payload.id); if (item) item.quantity += 1; else state.items.push({ product: action.payload, quantity: 1 }); },
    removeItem(state, action: PayloadAction<number>) { state.items = state.items.filter(({ product }) => product.id !== action.payload); },
    setQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) { const item = state.items.find(({ product }) => product.id === action.payload.id); if (item) item.quantity = Math.max(1, action.payload.quantity); },
    clearCart: (state) => { state.items = []; },
  },
});
export const { addItem, removeItem, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
