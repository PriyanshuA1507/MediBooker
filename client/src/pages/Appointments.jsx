// User Appointment Management - FIXED VERSION
// Developed by Priyanshu for MediBooker

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import fetchData from "../helper/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import jwtDecode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const token = localStorage.getItem("token");
  let userId = "";

  try {
    userId = jwtDecode(token)?.userId;
  } catch (error) {
    localStorage.removeItem("token");
  }

  // Fetch appointments
  const loadAppointments = async () => {
    try {
      dispatch(setLoading(true));

      const res = await fetchData(
        `/appointment/getallappointments?search=${userId}`
      );

      console.log("📌 APPOINTMENT RESPONSE:", res);

      setAppointments(Array.isArray(res) ? res : []);
    } catch (error) {
      toast.error("Unable to fetch appointments.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Mark completed
  const markCompleted = async (appointment) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointmentId: appointment?._id, // FIXED
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        {
          loading: "Updating...",
          success: "Appointment marked complete!",
          error: "Failed to update appointment.",
        }
      );

      loadAppointments();
    } catch (error) {
      toast.error("Unexpected error.");
    }
  };

  useEffect(() => {
    if (userId) loadAppointments();
  }, []);

  return (
    <>
      <Navbar />

      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Created At</th>
                    <th>Status</th>
                    {appointments.some((a) => a?.doctorId?._id === userId) && (
                      <th>Action</th>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((a, i) => (
                    <tr key={a?._id}>
                      <td>{i + 1}</td>
                      <td>
                        {a?.doctorId?.firstname} {a?.doctorId?.lastname}
                      </td>
                      <td>
                        {a?.userId?.firstname} {a?.userId?.lastname}
                      </td>
                      <td>{a?.date}</td>
                      <td>{a?.time}</td>
                      <td>{a?.createdAt?.split("T")[0]}</td>
                      <td>{a?.status}</td>

                      {userId === a?.doctorId?._id && (
                        <td>
                          <button
                            className={`btn user-btn accept-btn ${
                              a?.status === "completed" ? "disable-btn" : ""
                            }`}
                            disabled={a?.status === "completed"}
                            onClick={() => markCompleted(a)}
                          >
                            Complete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}

      <Footer />
    </>
  );
};

export default Appointments;
