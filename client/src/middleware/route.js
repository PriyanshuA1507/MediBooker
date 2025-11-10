// Authentication Route Guards for MediBooker
// Developed by Priyanshu

import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// ✅ Protects private routes (requires valid token)
export const Protected = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    jwtDecode(token); // validates token structure
    return children;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};

// ✅ Restricts logged-in users from accessing public routes (like login/register)
export const Public = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return children;

  try {
    const user = jwtDecode(token);
    if (user?.isAdmin) {
      return <Navigate to="/dashboard/users" replace />;
    }
    return <Navigate to="/" replace />;
  } catch (error) {
    localStorage.removeItem("token");
    return children;
  }
};

// ✅ Restricts admin-only routes
export const Admin = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = jwtDecode(token);
    if (user?.isAdmin) {
      return children;
    }
    return <Navigate to="/" replace />;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }
};
