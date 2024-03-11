import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/pages/Home.jsx";
import Categories from "./components/pages/Categories.jsx";
import Products from "./components/pages/Products.jsx";
import History from "./components/pages/History.jsx";
import Details from "./components/pages/Details.jsx";

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
  {
    path: "/details",
    element: <Details />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
