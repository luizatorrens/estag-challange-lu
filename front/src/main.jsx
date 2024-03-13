import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import Products from "./pages/Products.jsx";
import History from "./pages/History.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/history",
    element: <History />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
