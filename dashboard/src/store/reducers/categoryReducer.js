import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { fulfillWithValue, rejectWithValue }) => {
    console.log("🚀 ~ image:", image)
    console.log("🚀 ~ name:", name)
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


export const get_category = createAsyncThunk(
  "category/get_category",
  async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/categories-get?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, {
        withCredentials: true,
      });
      console.log("🚀 ~ data:", data)
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during fetch categories: ", error.response.data);
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
    categories: [],
    totalCategories: 0
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
      })
      .addCase(get_category.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_category.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = "";
        state.totalCategories = action.payload.totalCategories;
        state.categories = action.payload.categories;
      })
      .addCase(get_category.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.error;
      })
  },
});

export default categoryReducer.reducer;
export const { messageClear } = categoryReducer.actions;
