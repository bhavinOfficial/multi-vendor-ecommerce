import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";

const rootReducers = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer
};

export default rootReducers;
