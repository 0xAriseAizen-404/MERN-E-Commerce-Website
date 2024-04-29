// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
// Auth
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { Profile } from "./pages/user/Profile.jsx";
import { AdminRoute } from "./pages/admin/AdminRoute.jsx";
import { UserList } from "./pages/admin/UserList.jsx";
import { CategoryList } from "./pages/admin/CategoryList.jsx";
import { ProductList } from "./pages/admin/ProductList.jsx";
import { ProductUpdate } from "./pages/admin/ProductUpdate.jsx";
import { AllProducts } from "./pages/admin/AllProducts.jsx";
import { Home } from "./pages/Home.jsx";
import { Favourites } from "./pages/products/Favourites.jsx";
import { ProductDetails } from "./pages/products/ProductDetails.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Shop } from "./pages/Shop.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
