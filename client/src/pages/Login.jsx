import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setUserInfo } from "../redux/reducers/rootSlice";
import fetchData from "../helper/apiCall";
import "../styles/register.css";

// Base URL setup (works for both local + production)
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN || "/api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      return toast.error("All fields are required.");
    }
    if (password.length < 5) {
      return toast.error("Password must be at least 5 characters long.");
    }

    try {
      const { data } = await toast.promise(
        axios.post("/api/user/login", { email, password }), // FIXED
        {
          loading: "Signing you in...",
          success: "Login successful!",
          error: "Invalid credentials or server error.",
        }
      );

      localStorage.setItem("token", data.token);

      const decoded = jwtDecode(data.token);
      dispatch(setUserInfo(decoded.userId));

      await fetchUser(decoded.userId);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unable to log in. Please try again later.");
    }
  };

  const fetchUser = async (id) => {
    try {
      const user = await fetchData(`/user/getuser/${id}`);
      dispatch(setUserInfo(user));
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign In</h2>
        <form onSubmit={handleLogin} className="register-form">
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn form-btn">
            Sign In
          </button>
        </form>
        <p>
          Not a user?{" "}
          <NavLink className="login-link" to="/register">
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
};

export default Login;
