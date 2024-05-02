import { Route, Routes } from "react-router-dom";
import Auth from "./components/layouts/Auth";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import Main from "./components/layouts/Main";
import ErrorPage from "./components/error/ErrorPage";
import Home from "./components/products/Home";
import TokenContext from "./components/context/token/Token";
import { useReducer } from "react";
import userReducer from "./components/context/user/UserReducer";
import tokenReducer from "./components/context/token/TokenReducer";
import ProductPage from "./components/products/ProductPage";

export default function App() {

  const authToken = JSON.parse(localStorage.getItem('authToken'));
  const userInitialState = authToken ? authToken.user : {};
  const tokenInitialState = authToken ? authToken.token : null;

  const [user, setUser] = useReducer(userReducer, userInitialState);
  const [token, setToken] = useReducer(tokenReducer, tokenInitialState);

  return (
    <TokenContext.Provider value={{ user, setUser, token, setToken }}>
        <Routes>
          <Route path="/" element={<Auth/>}>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />

            <Route element={<Main />}>
              <Route path="" element={<Home />} />
              <Route path="product/:id" element={<ProductPage />} />
            </Route>

            <Route path="*" element={<ErrorPage/>} />
          </Route>
        </Routes>
    </TokenContext.Provider>
  );
}
