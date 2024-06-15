// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        ...action.payload,
        amount: 1, 
      };
      state.items.push(newItem);
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const existingItem = state.items.find((item) => item.cartID === cartID);
      if (existingItem) {
        existingItem.amount += amount;
      }
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      state.items = state.items.filter((item) => item.cartID !== cartID);
    },
  },
});

export const { addItem, editItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
