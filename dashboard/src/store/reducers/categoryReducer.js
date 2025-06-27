import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { fulfillWithValue, rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      console.log("🚀 ~ data:", data)
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during add category: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categories: []
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryAdd.pending, (state) => {
        state.loader = true;
      })
      .addCase(categoryAdd.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.categories = [ action.payload.category, ...state.categories];
      })
      .addCase(categoryAdd.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export default categoryReducer.reducer;
export const { messageClear } = categoryReducer.actions;
