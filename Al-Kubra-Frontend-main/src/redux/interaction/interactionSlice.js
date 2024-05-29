import { createSlice } from "@reduxjs/toolkit";

export const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    interaction: localStorage.getItem("interaction")
      ? JSON.parse(localStorage.getItem("interaction"))
      : [],
  },
  reducers: {
    addToInteraction: (state, action) => {
      const alreadyExist = state.interaction.find(
        (product) => product.productId === action.payload.productId
      );
      if (!alreadyExist) {
        state.interaction.unshift({
          productId: action.payload.productId,
          category: action.payload.category,
        });
        localStorage.setItem("interaction", JSON.stringify(state.interaction));
      }
    },
  },
});

export const { addToInteraction, clearInteraction } = interactionSlice.actions;

export default interactionSlice.reducer;
