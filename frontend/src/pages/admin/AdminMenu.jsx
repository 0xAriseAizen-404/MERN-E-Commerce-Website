import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#151515] border p-1 fixed rounded-sm`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-red-400 my-1"></div>
            <div className="w-6 h-0.5 bg-red-400 my-1"></div>
            <div className="w-6 h-0.5 bg-red-400 my-1"></div>
          </>
        )}
      </button>
      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashborad
              </NavLink>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
              <NavLink
                className="list-item py-2 px-3 mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};
