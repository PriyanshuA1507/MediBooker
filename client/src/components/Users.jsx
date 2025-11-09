
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

// Developed by Priyanshu for MediBooker Admin Dashboard
axios.defaults.baseURL = process.env.REACT_APP_MEDIBOOKER_API;

const AdminUsers = () => {
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllUsers = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchData(`/user/getallusers`);
      setUserList(data);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      toast.error("Failed to fetch user list. Please try again later.");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this user?");
    if (!confirmDelete) return;

    try {
      await toast.promise(
        axios.delete("/user/deleteuser", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: { userId },
        }),
        {
          loading: "Deleting user...",
          success: "User deleted successfully",
          error: "Failed to delete user",
        }
      );
      fetchAllUsers();
    } catch (error) {
      toast.error("Something went wrong while deleting the user.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="user-section">
          <h3 className="home-sub-heading">Registered Users</h3>
          <p className="data-refresh-time">
            Last updated: {new Date().toLocaleString()}
          </p>

          {userList.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Profile</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Doctor</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, i) => (
                    <tr key={user?._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          className="user-table-pic"
                          src={
                            user?.pic ||
                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                          }
                          alt={user?.firstname}
                        />
                      </td>
                      <td>{user?.firstname}</td>
                      <td>{user?.lastname}</td>
                      <td>{user?.email}</td>
                      <td>{user?.mobile}</td>
                      <td>{user?.age || "-"}</td>
                      <td>{user?.gender || "-"}</td>
                      <td>{user?.isDoctor ? "Yes" : "No"}</td>
                      <td className="select">
                        <button
                          className="btn user-btn"
                          onClick={() => handleDeleteUser(user?._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState message="No registered users found." />
          )}
        </section>
      )}
    </>
  );
};

export default AdminUsers;
