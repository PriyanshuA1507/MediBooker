import React, { useState } from "react";
import "../styles/bookappointment.css";
import axios from "axios";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

// Component developed by Priyanshu for MediBooker Patient Dashboard
axios.defaults.baseURL = process.env.REACT_APP_MEDIBOOKER_API;

const BookDoctorAppointment = ({ setModalOpen, ele }) => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    date: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();

    if (!appointmentDetails.date || !appointmentDetails.time) {
      toast.error("Please select both date and time before booking.");
      return;
    }

    try {
      await toast.promise(
       axios.post(
  "/appointment/bookappointment",
  {
    doctorId: ele?._id,   // FIXED
    date: appointmentDetails.date,
    time: appointmentDetails.time,
    doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
  },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully ✅",
          error: "Unable to book appointment ❌",
          loading: "Booking your appointment...",
        }
      );

      setModalOpen(false);
    } catch (error) {
      toast.error("Something went wrong while booking. Please try again.");
    }
  };

  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content">

          {/* Close button */}
          <IoMdClose
            onClick={() => setModalOpen(false)}
            className="close-btn"
            title="Close"
          />

          <h2 className="page-heading">Book Appointment</h2>

          {/* ---- Doctor Details Section ---- */}
          <div className="doctor-details-modal">
            <img
              src={
                ele?.userId?.pic ||
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              alt="Doctor"
              className="doctor-modal-img"
            />

            <div className="doctor-modal-info">
              <h3>
                Dr. {ele?.userId?.firstname} {ele?.userId?.lastname}
              </h3>

              <p>
                <strong>Specialization:</strong> {ele?.specialization || "N/A"}
              </p>

              <p>
                <strong>Experience:</strong> {ele?.experience || 0} yrs
              </p>

              <p>
                <strong>Consultation Fee:</strong> ₹{ele?.fees || 0}
              </p>
            </div>
          </div>

          {/* ---- Booking Form ---- */}
          <div className="register-container flex-center book">
            <form className="register-form" onSubmit={handleBookAppointment}>
              <input
                type="date"
                name="date"
                className="form-input"
                value={appointmentDetails.date}
                onChange={handleInputChange}
                required
              />

              <input
                type="time"
                name="time"
                className="form-input"
                value={appointmentDetails.time}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className="btn form-btn">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDoctorAppointment;
