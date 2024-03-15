import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import Products from "./pages/Products.jsx";
import History from "./pages/History.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";

import "./index.css";

const requireLogin = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {code: 0}
  if(user.code){
      return null
  }
  return redirect("/")
}

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    loader: requireLogin
  },
  {
    path: "/categories",
    element: <Categories />,
    loader: requireLogin
  },
  {
    path: "/products",
    element: <Products />,
    loader: requireLogin
  },
  {
    path: "/history",
    element: <History />,
    loader: requireLogin
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
