import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookDoctorAppointment = ({ ele, setModalOpen }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!date || !time) {
      return toast.error("Please select date and time.");
    }

    try {
      await toast.promise(
        axios.post(
          "https://medibooker-1.onrender.com/api/appointment/bookappointment",
          {
            doctorId: ele._id,
            date,
            time,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          loading: "Booking your appointment...",
          success: "Appointment booked successfully!",
          error: "Failed to book appointment.",
        }
      );

      setModalOpen(false);
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleBooking}>
        <h3>Book Appointment</h3>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookDoctorAppointment;
