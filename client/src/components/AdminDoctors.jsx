

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

const AdminAllDoctors = () => {
  const [doctorList, setDoctorList] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDoctors = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchData(`/doctor/getalldoctors`);
      setDoctorList(data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Failed to fetch doctor list. Please try again later.");
    }
  };

  const handleDeleteDoctor = async (userId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove this doctor?"
      );
      if (confirmDelete) {
        await toast.promise(
          axios.put(
            "/doctor/deletedoctor",
            { userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Doctor removed successfully",
            error: "Unable to remove doctor",
            loading: "Removing doctor...",
          }
        );
        fetchAllDoctors();
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the doctor.");
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">Registered Doctors</h3>
          <p className="data-refresh-time">
            Last refreshed: {new Date().toLocaleString()}
          </p>

          {doctorList.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Profile</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Consultation Fee</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorList?.map((doctor, i) => {
                    const {
                      userId,
                      experience,
                      specialization,
                      fees,
                    } = doctor;

                    const doctorPic =
                      userId?.pic ||
                      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
                    const doctorName = `${userId?.firstname} ${userId?.lastname}`;

                    return (
                      <tr key={doctor?._id}>
                        <td>{i + 1}</td>
                        <td>
                          <img
                            className="user-table-pic"
                            src={doctorPic}
                            alt={doctorName}
                          />
                        </td>
                        <td>{userId?.firstname}</td>
                        <td>{userId?.lastname}</td>
                        <td>{userId?.email}</td>
                        <td>{userId?.mobile}</td>
                        <td>{experience}</td>
                        <td>{specialization}</td>
                        <td>{fees}</td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() => handleDeleteDoctor(userId?._id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <Empty />
              <p className="no-data-text">No doctors registered yet.</p>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default AdminAllDoctors;
