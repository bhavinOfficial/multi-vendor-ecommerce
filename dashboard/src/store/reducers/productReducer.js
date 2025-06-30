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
  async (
    { perPage, page, searchValue },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/products-get?page=${page}&searchValue=${searchValue}&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during fetch products: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during fetch single product: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_product = createAsyncThunk(
  "product/update_product",
  async (product, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(
        `/product-update/${product.productId}`,
        product,
        {
          withCredentials: true,
        }
      );
      console.log("🚀 ~ data:", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during update product: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async (
    { oldImage, newImage, productId },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      const { data } = await api.put(
        `/product-image-update/${productId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("🚀 ~ data:", data);
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during update product image: ", error.response.data);
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
    product: {},
    totalProducts: 0,
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
      .addCase(get_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_product.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = "";
        state.product = action.payload.product;
      })
      .addCase(get_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(update_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_product.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.product = action.payload.product;
      })
      .addCase(update_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(product_image_update.pending, (state) => {
        state.loader = true;
      })
      .addCase(product_image_update.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.product = action.payload.product;
      })
      .addCase(product_image_update.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export default productReducer.reducer;
export const { messageClear } = productReducer.actions;
