import { useState, useEffect } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes.jsx";
import { getRoutes } from "./router/routes/index.jsx";
import { useSelector, useDispatch } from "react-redux";
import { get_user_info } from "./store/reducers/authReducer.js";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([ ...allRoutes, routes ]);
  }, []);


  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }
  }, [token]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
