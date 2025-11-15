import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

// Fix base URL for production fallback
axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_DOMAIN || "https://medibooker-1.onrender.com/api";

const ApplyDoctor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    fees: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = async (e) => {
    e.preventDefault();

    const { specialization, experience, fees } = formData;

    if (!specialization || !experience || !fees) {
      return toast.error("Please fill all fields before applying.");
    }

    try {
      await toast.promise(
        axios.post(
          "/api/doctor/applyfordoctor",
          { specialization, experience, fees },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          loading: "Submitting your application...",
          success: "Doctor application submitted successfully!",
          error: "Unable to submit your application.",
        }
      );

      navigate("/");
    } catch (error) {
      console.error("Doctor application error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="register-section flex-center apply-doctor">
        <div className="register-container flex-center contact">
          <h2 className="form-heading">Apply as Doctor</h2>

          <form className="register-form" onSubmit={handleApply}>
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder="Enter your specialization"
              value={formData.specialization}
              onChange={handleChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter your experience (in years)"
              value={formData.experience}
              onChange={handleChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder="Enter consultation fees (in ₹)"
              value={formData.fees}
              onChange={handleChange}
            />

            <button type="submit" className="btn form-btn">
              Apply
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyDoctor;
