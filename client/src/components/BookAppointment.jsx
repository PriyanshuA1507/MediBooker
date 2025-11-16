

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
            doctorId: ele?.userId?._id,
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
          <h2 className="page-heading">Book an Appointment</h2>
          <IoMdClose
            onClick={() => setModalOpen(false)}
            className="close-btn"
            title="Close"
          />

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
