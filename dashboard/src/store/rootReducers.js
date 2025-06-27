import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";

const rootReducers = {
  auth: authReducer,
  category: categoryReducer
};

export default rootReducers;
