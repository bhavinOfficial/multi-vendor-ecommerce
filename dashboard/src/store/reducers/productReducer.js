import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const add_product = createAsyncThunk(
  "product/add_product",
  async (newproduct, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/product-add", newproduct, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during add product: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


export const get_products = createAsyncThunk(
  "product/get_products",
  async ({ perPage, page, searchValue }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/categories-get?page=${page}&searchValue=${searchValue}&perPage=${perPage}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during fetch products: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);


export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    totalProducts: 0
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_product.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.products = [ action.payload.category, ...state.products];
      })
      .addCase(add_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(get_products.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_products.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = "";
        state.totalProducts = action.payload.totalProducts;
        state.products = action.payload.products;
      })
      .addCase(get_products.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
  },
});

export default productReducer.reducer;
export const { messageClear } = productReducer.actions;
