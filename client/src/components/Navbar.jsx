
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import jwt_decode from "jwt-decode";

// Navbar component designed and authored by Priyanshu for MediBooker
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "";
  const user = token ? jwt_decode(token) : null;

  const handleLogout = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar-header">
      <nav className={`navbar ${isMenuOpen ? "active" : ""}`}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>MediBooker</NavLink>
        </h2>

        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/doctors"}>Doctors</NavLink>
          </li>

          {token && user?.isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
            </li>
          )}

          {token && !user?.isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              <li>
                <NavLink to={"/notifications"}>Notifications</NavLink>
              </li>
              <li>
                <NavLink to={"/applyfordoctor"}>Apply as Doctor</NavLink>
              </li>
              <li>
                <HashLink to={"/#contact"}>Contact</HashLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </>
          )}

          {!token ? (
            <>
              <li>
                <NavLink className="btn nav-btn" to={"/login"}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="btn nav-btn" to={"/register"}>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span className="btn nav-btn" onClick={handleLogout}>
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>

      <div className="menu-icons">
        {!isMenuOpen ? (
          <FiMenu className="menu-open" onClick={handleMenuToggle} />
        ) : (
          <RxCross1 className="menu-close" onClick={handleMenuToggle} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
