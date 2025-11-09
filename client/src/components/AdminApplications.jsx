

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

// Component developed by Priyanshu for MediBooker Admin Panel
axios.defaults.baseURL = process.env.REACT_APP_MEDIBOOKER_API;

const AdminDoctorRequests = () => {
  const [doctorRequests, setDoctorRequests] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchDoctorRequests = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchData(`/doctor/getnotdoctors`);
      setDoctorRequests(data);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  const handleApprove = async (userId) => {
    try {
      const confirm = window.confirm("Confirm accepting this doctor request?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/doctor/acceptdoctor",
            { id: userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: { userId },
            }
          ),
          {
            success: "Doctor request approved",
            error: "Approval failed. Please retry.",
            loading: "Approving request...",
          }
        );
        fetchDoctorRequests();
      }
    } catch (error) {
      return error;
    }
  };

  const handleReject = async (userId) => {
    try {
      const confirm = window.confirm("Confirm rejecting this doctor request?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/doctor/rejectdoctor",
            { id: userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: { userId },
            }
          ),
          {
            success: "Doctor request rejected",
            error: "Rejection failed. Please retry.",
            loading: "Rejecting request...",
          }
        );
        fetchDoctorRequests();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchDoctorRequests();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">Doctor Verification Requests</h3>
          {doctorRequests.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Fees</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorRequests?.map((req, i) => (
                    <tr key={req?._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          className="user-table-pic"
                          src={
                            req?.userId?.pic ||
                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                          }
                          alt={req?.userId?.firstname}
                        />
                      </td>
                      <td>{req?.userId?.firstname}</td>
                      <td>{req?.userId?.lastname}</td>
                      <td>{req?.userId?.email}</td>
                      <td>{req?.userId?.mobile}</td>
                      <td>{req?.experience}</td>
                      <td>{req?.specialization}</td>
                      <td>{req?.fees}</td>
                      <td className="select">
                        <button
                          className="btn user-btn accept-btn"
                          onClick={() => handleApprove(req?.userId?._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn user-btn"
                          onClick={() => handleReject(req?.userId?._id)}
                        >
                          Reject
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

export default AdminDoctorRequests;
