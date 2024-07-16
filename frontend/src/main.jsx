import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./redux/store";
import App from "./App";
import "./index.css";

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
import { Shipping } from "./pages/orders/Shipping.jsx";
import { PlaceOrder } from "./pages/orders/PlaceOrder.jsx";
import { Order } from "./pages/orders/Order.jsx";
import { UserOrders } from "./pages/user/UserOrders.jsx";
import { OrderList } from "./pages/admin/OrderList.jsx";

const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FAVOURITES: "/favourites",
  PRODUCT_DETAILS: "/product/:id",
  CART: "/cart",
  SHOP: "/shop",
  USER_ORDERS: "/user-orders",
  PROFILE: "/profile",
  SHIPPING: "/shipping",
  PLACE_ORDER: "/placeorder",
  ORDER: "/order/:id",
  ADMIN_USER_LIST: "/admin/userlist",
  ADMIN_ORDER_LIST: "/admin/orderlist",
  ADMIN_CATEGORY_LIST: "/admin/categorylist",
  ADMIN_PRODUCT_LIST: "/admin/productlist",
  ADMIN_ALL_PRODUCTS: "/admin/allproductslist",
  ADMIN_PRODUCT_UPDATE: "/admin/product/update/:_id",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTES.HOME} element={<App />}>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route index element={<Home />} />
      <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
      <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.SHOP} element={<Shop />} />
      <Route path={ROUTES.USER_ORDERS} element={<UserOrders />} />

      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.SHIPPING} element={<Shipping />} />
        <Route path={ROUTES.PLACE_ORDER} element={<PlaceOrder />} />
        <Route path={ROUTES.ORDER} element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path={ROUTES.ADMIN_USER_LIST} element={<UserList />} />
        <Route path={ROUTES.ADMIN_ORDER_LIST} element={<OrderList />} />
        <Route path={ROUTES.ADMIN_CATEGORY_LIST} element={<CategoryList />} />
        <Route path={ROUTES.ADMIN_PRODUCT_LIST} element={<ProductList />} />
        <Route path={ROUTES.ADMIN_ALL_PRODUCTS} element={<AllProducts />} />
        <Route path={ROUTES.ADMIN_PRODUCT_UPDATE} element={<ProductUpdate />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </PayPalScriptProvider>
  </Provider>
);
