import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { FavouritesCount } from "../products/FavouritesCount";
import { CartCount } from "../products/CartCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropDown, setDropDown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const toggleSideBar = () => {
    setShowSideBar((prev) => !prev);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSideBar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between text-white w-[4%] p-4 bg-[#0F0F0F] hover:w-[15%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4 mt-[3rem]">
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome size={26} />
          <span className="nav-item-name hidden">Home</span>{" "}
        </Link>
        <Link
          to="/shop"
          className="flex items-center gap-2 transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping size={26} />
          <span className="nav-item-name hidden">Shopping</span>{" "}
        </Link>
        <Link
          to="/cart"
          className="flex items-center gap-2 transition-transform transform hover:translate-x-2 relative"
        >
          <AiOutlineShoppingCart size={26} />
          <span className="nav-item-name hidden">Cart</span>
          <CartCount />
        </Link>
        <Link
          to="/favourites"
          className="flex items-center gap-2 transition-transform transform hover:translate-x-2 relative"
        >
          <FaHeart size={26} />
          <span className="nav-item-name hidden">Favourites</span>
          <FavouritesCount />
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropDown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo?.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropDown ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropDown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              ></path>
            </svg>
          )}
        </button>
        {dropDown && userInfo && (
          <ul
            className={`absolute -right-10 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      {!userInfo && (
        <div className="flex flex-col justify-center space-y-4 mb-[1rem]">
          <Link
            to="/login"
            className="flex items-center gap-2 transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin size={26} />
            <span className="nav-item-name hidden">Login</span>{" "}
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd size={26} />
            <span className="nav-item-name hidden">Register</span>{" "}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
