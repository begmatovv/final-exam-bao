import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orderTotal: 0,
  discount: 0,
  totalQuantity: 0, // New field for total quantity
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, { payload }) {
      const existingItem = state.items.find((item) => item.id === payload.id);
      if (existingItem) {
        existingItem.quantity += payload.quantity;
        state.orderTotal += payload.price * payload.quantity;
      } else {
        state.items.push({ ...payload, quantity: payload.quantity });
        state.orderTotal += payload.price * payload.quantity;
      }
      state.totalQuantity += payload.quantity; // Update total quantity
    },
    itemMinus(state, { payload }) {
      const existingItem = state.items.find((item) => item.id === payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.orderTotal -= existingItem.price;
        } else {
          state.orderTotal -= existingItem.price;
          state.items = state.items.filter((item) => item.id !== payload);
        }
        state.totalQuantity -= 1; // Update total quantity
      }
    },
    itemPlus(state, { payload }) {
      const existingItem = state.items.find((item) => item.id === payload);
      if (existingItem) {
        existingItem.quantity += 1;
        state.orderTotal += existingItem.price;
        state.totalQuantity += 1; // Update total quantity
      }
    },
    applyDiscount(state, { payload }) {
      state.discount = payload;
      state.orderTotal -= payload;
    },
    resetCart(state) {
      state.items = [];
      state.orderTotal = 0;
      state.discount = 0;
      state.totalQuantity = 0; // Reset total quantity
    },
  },
});

export const { addItem, itemMinus, itemPlus, applyDiscount, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
