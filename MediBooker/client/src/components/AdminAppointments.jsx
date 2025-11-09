

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

// Developed by Priyanshu for MediBooker Admin Dashboard
axios.defaults.baseURL = process.env.REACT_APP_MEDIBOOKER_API;

const AdminAllAppointments = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllAppointments = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchData(`/appointment/getallappointments`);
      setAllAppointments(data);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const markAsComplete = async (appointment) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: appointment?._id,
            doctorId: appointment?.doctorId._id,
            doctorname: `${appointment?.userId?.firstname} ${appointment?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment marked as completed",
          error: "Unable to update appointment status",
          loading: "Updating appointment status...",
        }
      );
      fetchAllAppointments();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">All Appointments</h3>
          {allAppointments.length > 0 ? (
            <div className="appointment-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allAppointments?.map((appointment, i) => (
                    <tr key={appointment?._id}>
                      <td>{i + 1}</td>
                      <td>
                        {appointment?.doctorId?.firstname +
                          " " +
                          appointment?.doctorId?.lastname}
                      </td>
                      <td>
                        {appointment?.userId?.firstname +
                          " " +
                          appointment?.userId?.lastname}
                      </td>
                      <td>{appointment?.date}</td>
                      <td>{appointment?.time}</td>
                      <td>{appointment?.createdAt.split("T")[0]}</td>
                      <td>{appointment?.updatedAt.split("T")[1].split(".")[0]}</td>
                      <td>{appointment?.status}</td>
                      <td>
                        <button
                          className={`btn user-btn accept-btn ${
                            appointment?.status === "Completed" ? "disable-btn" : ""
                          }`}
                          disabled={appointment?.status === "Completed"}
                          onClick={() => markAsComplete(appointment)}
                        >
                          Complete
                        </button>
                      </td>
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
    </>
  );
};

export default AdminAllAppointments;
