import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during admin login: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during seller login: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during get user info ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/seller-register", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      console.error("Error during seller register: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const returnRole = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token);
    const expireTime = new Date(decodedToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodedToken.role;
    }
  } else {
    return "";
  }
}

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken")
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(admin_login.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(admin_login.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(seller_login.pending, (state) => {
        state.loader = true;
      })
      .addCase(seller_login.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(seller_login.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(seller_register.pending, (state) => {
        state.loader = true;
      })
      .addCase(seller_register.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.token = action.payload.token;
        state.role = returnRole(action.payload.token);
      })
      .addCase(seller_register.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      })
      .addCase(get_user_info.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_user_info.fulfilled, (state, action) => {
        state.loader = false;
        state.errorMessage = "";
        state.successMessage = action.payload.message;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(get_user_info.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.error;
      });
  },
});

export default authReducer.reducer;
export const { messageClear } = authReducer.actions;
