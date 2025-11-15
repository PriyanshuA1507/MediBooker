import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";

// Fix axios base URL for production
axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_DOMAIN || "https://medibooker-1.onrender.com/api";

function Register() {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (element) => {
    setLoading(true);

    if (element.type === "image/jpeg" || element.type === "image/png") {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

      fetch(process.env.REACT_APP_CLOUDINARY_BASE_URL, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => setFile(data.url.toString()))
        .catch((err) => toast.error("Upload failed"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      toast.error("Please select a jpeg or png image");
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const { firstname, lastname, email, password, confpassword } = formDetails;

    if (!firstname || !lastname || !email || !password || !confpassword)
      return toast.error("All fields are required");

    if (firstname.length < 3)
      return toast.error("First name must be at least 3 characters");

    if (lastname.length < 3)
      return toast.error("Last name must be at least 3 characters");

    if (password.length < 5)
      return toast.error("Password must be at least 5 characters");

    if (password !== confpassword)
      return toast.error("Passwords do not match");

    try {
      await toast.promise(
        axios.post("/api/user/register", {
          firstname,
          lastname,
          email,
          password,
          pic: file,
        }),
        {
          loading: "Registering user...",
          success: "Registration successful!",
          error: "Unable to register user.",
        }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <h2 className="form-heading">Sign Up</h2>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="text"
            name="firstname"
            className="form-input"
            placeholder="Enter your first name"
            value={formDetails.firstname}
            onChange={inputChange}
          />
          <input
            type="text"
            name="lastname"
            className="form-input"
            placeholder="Enter your last name"
            value={formDetails.lastname}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="file"
            onChange={(e) => onUpload(e.target.files[0])}
            className="form-input"
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <input
            type="password"
            name="confpassword"
            className="form-input"
            placeholder="Confirm your password"
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <button type="submit" className="btn form-btn" disabled={loading}>
            Sign Up
          </button>
        </form>
        <p>
          Already a user?{" "}
          <NavLink className="login-link" to="/login">
            Log in
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
