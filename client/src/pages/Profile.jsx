import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import fetchData from "../helper/apiCall";
import jwt_decode from "jwt-decode";

// Fix axios baseURL for production
axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_DOMAIN || "https://medibooker-1.onrender.com/api";

function Profile() {
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [file, setFile] = useState("");
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    mobile: "",
    gender: "neither",
    address: "",
    password: "",
    confpassword: "",
  });

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
     const temp = await fetchData(`/user/getuser/${userId}`);

      setFormDetails({
        ...temp,
        password: "",
        confpassword: "",
        mobile: temp.mobile || "",
        age: temp.age || "",
      });

      setFile(temp.pic);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("User fetch failed:", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      const {
        firstname,
        lastname,
        email,
        age,
        mobile,
        address,
        gender,
        password,
        confpassword,
      } = formDetails;

      if (!email) return toast.error("Email should not be empty");
      if (firstname.length < 3)
        return toast.error("First name must be at least 3 characters long");
      if (lastname.length < 3)
        return toast.error("Last name must be at least 3 characters long");
      if (password && password.length < 5)
        return toast.error("Password must be at least 5 characters long");
      if (password !== confpassword)
        return toast.error("Passwords do not match");

      await toast.promise(
        axios.put("/user/updateprofile",
          {
            firstname,
            lastname,
            age,
            mobile,
            address,
            gender,
            email,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          loading: "Updating profile...",
          success: "Profile updated successfully!",
          error: "Unable to update profile.",
        }
      );

      setFormDetails({ ...formDetails, password: "", confpassword: "" });
    } catch (error) {
      console.error(error);
      toast.error("Unable to update profile");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="register-section flex-center">
      <div className="profile-container flex-center">
        <h2 className="form-heading">Profile</h2>
        <img src={file} alt="profile" className="profile-pic" />

        <form onSubmit={formSubmit} className="register-form">
          <div className="form-same-row">
            <input
              type="text"
              name="firstname"
              className="form-input"
              value={formDetails.firstname}
              onChange={inputChange}
              placeholder="Enter your first name"
            />
            <input
              type="text"
              name="lastname"
              className="form-input"
              value={formDetails.lastname}
              onChange={inputChange}
              placeholder="Enter your last name"
            />
          </div>

          <div className="form-same-row">
            <input
              type="email"
              name="email"
              className="form-input"
              value={formDetails.email}
              onChange={inputChange}
              placeholder="Enter your email"
            />

            <select
              name="gender"
              value={formDetails.gender}
              onChange={inputChange}
              className="form-input"
            >
              <option value="neither">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-same-row">
            <input
              type="text"
              name="age"
              className="form-input"
              value={formDetails.age}
              onChange={inputChange}
              placeholder="Enter your age"
            />
            <input
              type="text"
              name="mobile"
              className="form-input"
              value={formDetails.mobile}
              onChange={inputChange}
              placeholder="Enter your mobile number"
            />
          </div>

          <textarea
            name="address"
            className="form-input"
            rows="2"
            value={formDetails.address}
            onChange={inputChange}
            placeholder="Enter your address"
          />

          <div className="form-same-row">
            <input
              type="password"
              name="password"
              className="form-input"
              value={formDetails.password}
              onChange={inputChange}
              placeholder="Enter new password"
            />
            <input
              type="password"
              name="confpassword"
              className="form-input"
              value={formDetails.confpassword}
              onChange={inputChange}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="btn form-btn">
            Update
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
