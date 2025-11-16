import "../styles/doctorcard.css";
import React, { useState } from "react";
import BookDoctorAppointment from "./BookAppointment";
import { toast } from "react-hot-toast";

const DoctorCard = ({ ele }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token") || "";

  const doctor = ele || {};
  const user = doctor.userId || {};

  const handleAppointmentModal = () => {
    if (!token) {
      toast.error("Please log in to book an appointment.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <div className="doctor-card">
      <div className="card-img flex-center">
        <img
          src={
            user.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt={`${user.firstname || ""} ${user.lastname || ""}`}
          className="doctor-profile-img"
        />
      </div>

      <h3 className="card-name">
        Dr. {user.firstname || "Unknown"} {user.lastname || ""}
      </h3>

      <p className="specialization">
        <strong>Specialization:</strong> {doctor.specialization || "N/A"}
      </p>

      <p className="experience">
        <strong>Experience:</strong> {doctor.experience || 0} yrs
      </p>

      <p className="fees">
        <strong>Consultation Fee:</strong> ₹{doctor.fees || 0}
      </p>

      <p className="phone">
        <strong>Phone:</strong> {user.mobile || "Not available"}
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
