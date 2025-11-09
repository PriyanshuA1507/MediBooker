
import React, { useState } from "react";
import toast from "react-hot-toast";
import "../styles/doctorapply.css";
import axios from "axios";

// Developed by Priyanshu for MediBooker Doctor Onboarding
axios.defaults.baseURL = process.env.REACT_APP_MEDIBOOKER_API;

const DoctorApplicationForm = () => {
  const [applicationDetails, setApplicationDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
    timing: "Select Timing",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicationDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { specialization, experience, fees, timing } = applicationDetails;

    if (!specialization || !experience || !fees || timing === "Select Timing") {
      toast.error("All fields are required before submitting.");
      return;
    }

    try {
      await toast.promise(
        axios.post(
          "/doctor/applyfordoctor",
          { specialization, experience, fees, timing },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          loading: "Submitting your application...",
          success: "Thank you for applying! Your profile is under review.",
          error: "Failed to submit your application. Please try again later.",
        }
      );

      // Reset form after successful submission
      setApplicationDetails({
        specialization: "",
        experience: "",
        fees: "",
        timing: "Select Timing",
      });
    } catch (error) {
      toast.error("An unexpected error occurred. Please retry.");
    }
  };

  return (
    <section className="apply-doctor-section flex-center">
      <div className="apply-doctor-container flex-center">
        <h2 className="form-heading">Apply as a Doctor</h2>
        <p className="form-subtext">
          Join MediBooker and connect with patients across India.
        </p>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="specialization"
            className="form-input"
            placeholder="Your specialization (e.g., Cardiologist)"
            value={applicationDetails.specialization}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="experience"
            className="form-input"
            placeholder="Years of experience"
            value={applicationDetails.experience}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="fees"
            className="form-input"
            placeholder="Consultation fees (₹)"
            value={applicationDetails.fees}
            onChange={handleChange}
            required
          />
          <select
            name="timing"
            value={applicationDetails.timing}
            className="form-input"
            id="timing"
            onChange={handleChange}
            required
          >
            <option disabled>Select Timing</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>

          <button type="submit" className="btn form-btn">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default DoctorApplicationForm;
