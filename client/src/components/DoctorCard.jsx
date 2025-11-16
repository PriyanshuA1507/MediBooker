import "../styles/doctorcard.css";
import React, { useState } from "react";
import BookDoctorAppointment from "./BookAppointment";
import { toast } from "react-hot-toast";

const DoctorCard = ({ ele }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token") || "";
  const doctor = ele;

  const handleAppointmentModal = () => {
    if (!token) return toast.error("Please log in to book an appointment.");
    setIsModalOpen(true);
  };

  return (
    <div className="doctor-card">
      <div className="card-img flex-center">
        <img
          src={
            doctor?.userId?.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt={`${doctor?.userId?.firstname} ${doctor?.userId?.lastname}`}
          className="doctor-profile-img"
        />
      </div>

      <h3 className="card-name">
        Dr. {doctor?.userId?.firstname || "Unknown"}{" "}
        {doctor?.userId?.lastname || ""}
      </h3>

      <p className="specialization">
        <strong>Specialization:</strong> {doctor?.specialization}
      </p>

      <p className="experience">
        <strong>Experience:</strong> {doctor?.experience} yrs
      </p>

      <p className="fees">
        <strong>Consultation Fee:</strong> ₹{doctor?.fees}
      </p>

      <p className="phone">
        <strong>Phone:</strong> {doctor?.userId?.mobile || "Not available"}
      </p>

      <button className="btn appointment-btn" onClick={handleAppointmentModal}>
        Book Appointment
      </button>

      {isModalOpen && (
        <BookDoctorAppointment setModalOpen={setIsModalOpen} ele={doctor} />
      )}
    </div>
  );
};

export default DoctorCard;
