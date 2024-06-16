import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const cartStore = localStorage.getItem("cart");
    if (cartStore === null) {
      return {
        items: [],
        totalItems: 0,
      };
    }
    return JSON.parse(cartStore);
  } catch (err) {
    return {
      items: [],
      totalItems: 0,
    };
  }
};

const saveState = (state) => {
  try {
    const cartStore = JSON.stringify(state);
    localStorage.setItem("cart", cartStore);
  } catch (err) {}
};

const initialState = loadState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, { payload }) {
      const newItem = payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalItems += newItem.quantity || 1;
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      } else {
        existingItem.quantity += newItem.quantity || 1;
      }
      saveState(state);
    },
    minusItem(state, { payload }) {
      const id = payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalItems--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
        }
        saveState(state);
      }
    },
    plusItem(state, { payload }) {
      const id = payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalItems++;
        existingItem.quantity++;
        saveState(state);
      }
    },
    deleteItem(state, { payload }) {
      const id = payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalItems -= existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
        saveState(state);
      }
    },
  },
});

export const { addItem, minusItem, plusItem, deleteItem ,editItem} = cartSlice.actions;
export default cartSlice.reducer;
