import { createSlice } from "@reduxjs/toolkit";

// Function to load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("salesState");
    if (serializedState === null) {
      return {
        activeOrders: [],
        completedOrders: [],
        nextOrderId: 1,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      activeOrders: [],
      completedOrders: [],
      nextOrderId: 1,
    };
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("salesState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState();

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    fetchOrders: (state, action) => {
      state.activeOrders = action.payload.activeOrders;
      state.completedOrders = action.payload.completedOrders;
      saveState(state);
    },

    addOrders: (state, action) => {
      const newOrder = {
        id: state.nextOrderId,
        ...action.payload,
      };
      state.activeOrders.push(newOrder);
      state.nextOrderId += 1;
      saveState(state);
    },

    editOrders: (state, action) => {
      const index = state.activeOrders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (index !== -1) {
        const updatedOrder = {
          ...state.activeOrders[index],
          ...action.payload,
        };
        if (updatedOrder.active === "completed") {
          state.completedOrders.push(updatedOrder);
          state.activeOrders.splice(index, 1);
        } else {
          state.activeOrders[index] = updatedOrder;
        }
      }
      saveState(state);
    },

    deleteOrders: (state, action) => {
      state.activeOrders = state.activeOrders.filter(
        (order) => order.id !== action.payload
      );
      saveState(state);
    },
  },
});

export const { fetchOrders, addOrders, editOrders, deleteOrders } =
  salesSlice.actions;

export default salesSlice.reducer;
