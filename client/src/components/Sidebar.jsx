import React from "react";
import {
  FaHome,
  FaList,
  FaUser,
  FaUserMd,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import "../styles/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";

// Admin Sidebar for MediBooker
const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },

    // All users
    { name: "Users", path: "/dashboard/users", icon: <FaUsers /> },

    // All approved doctors
    { name: "Doctors", path: "/dashboard/doctors", icon: <FaUserMd /> },

    // All appointments
    { name: "Appointments", path: "/dashboard/appointments", icon: <FaList /> },

    // Pending Doctor Applications
    {
      name: "Applications",
      path: "/dashboard/doctor-applications",
      icon: <FaEnvelope />,
    },

    { name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  const handleLogout = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="sidebar-section flex-center">
      <div className="sidebar-container">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">MediBooker</h2>
          <p className="sidebar-subtitle">Admin Panel</p>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.icon}
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="logout-container" onClick={handleLogout}>
          <MdLogout className="logout-icon" />
          <p>Logout</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
