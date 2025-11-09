// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../styles/register.css";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { setUserInfo } from "../redux/reducers/rootSlice";
// import jwt_decode from "jwt-decode";
// import fetchData from "../helper/apiCall";

// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// function Login() {
//   const dispatch = useDispatch();
//   const [formDetails, setFormDetails] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const inputChange = (e) => {
//     const { name, value } = e.target;
//     return setFormDetails({
//       ...formDetails,
//       [name]: value,
//     });
//   };

//   const formSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       const { email, password } = formDetails;
//       if (!email || !password) {
//         return toast.error("Input field should not be empty");
//       } else if (password.length < 5) {
//         return toast.error("Password must be at least 5 characters long");
//       }

//       const { data } = await toast.promise(
//         axios.post("/user/login", {
//           email,
//           password,
//         }),
//         {
//           pending: "Logging in...",
//           success: "Login successfully",
//           error: "Unable to login user",
//           loading: "Logging user...",
//         }
//       );
//       localStorage.setItem("token", data.token);
//       dispatch(setUserInfo(jwt_decode(data.token).userId));
//       getUser(jwt_decode(data.token).userId);
//     } catch (error) {
//       return error;
//     }
//   };

//   const getUser = async (id) => {
//     try {
//       const temp = await fetchData(`/user/getuser/${id}`);
//       dispatch(setUserInfo(temp));
//       return navigate("/");
//     } catch (error) {
//       return error;
//     }
//   };

//   return (
//     <section className="register-section flex-center">
//       <div className="register-container flex-center">
//         <h2 className="form-heading">Sign In</h2>
//         <form
//           onSubmit={formSubmit}
//           className="register-form"
//         >
//           <input
//             type="email"
//             name="email"
//             className="form-input"
//             placeholder="Enter your email"
//             value={formDetails.email}
//             onChange={inputChange}
//           />
//           <input
//             type="password"
//             name="password"
//             className="form-input"
//             placeholder="Enter your password"
//             value={formDetails.password}
//             onChange={inputChange}
//           />
//           <button
//             type="submit"
//             className="btn form-btn"
//           >
//             sign in
//           </button>
//         </form>
//         <p>
//           Not a user?{" "}
//           <NavLink
//             className="login-link"
//             to={"/register"}
//           >
//             Register
//           </NavLink>
//         </p>
//       </div>
//     </section>
//   );
// }

// export default Login;
// Login Page
// Developed by Priyanshu for MediBooker

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setUserInfo } from "../redux/reducers/rootSlice";
import fetchData from "../helper/apiCall";
import "../styles/register.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

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
        axios.post("/user/login", { email, password }),
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
