import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import fetchData from "../helper/apiCall";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import "../styles/admin.css";

const AdminDoctors = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPendingDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetchData("/doctor/getnotdoctors");
      setPendingDoctors(res || []);
    } catch {
      toast.error("Unable to load doctor applications");
    } finally {
      setLoading(false);
    }
  };

  const approveDoctor = async (doc) => {
    try {
      await toast.promise(
        axios.put(
          "/doctor/acceptdoctor",
          { id: doc?.userId?._id },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        ),
        {
          loading: "Approving doctor...",
          success: "Doctor approved!",
          error: "Approval failed!",
        }
      );

      loadPendingDoctors();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const rejectDoctor = async (doc) => {
    try {
      await toast.promise(
        axios.put(
          "/doctor/rejectdoctor",
          { id: doc?.userId?._id },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        ),
        {
          loading: "Rejecting doctor...",
          success: "Doctor rejected!",
          error: "Rejection failed!",
        }
      );

      loadPendingDoctors();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const deleteDoctor = async (doc) => {
    try {
      await toast.promise(
        axios.delete(`/doctor/deletedoctor/${doc?.userId?._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        {
          loading: "Deleting doctor...",
          success: "Doctor deleted!",
          error: "Delete failed!",
        }
      );

      loadPendingDoctors();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    loadPendingDoctors();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Pending Doctor Applications</h2>

          {pendingDoctors.length === 0 ? (
            <p>No pending applications</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Fees</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {pendingDoctors.map((doc) => (
                  <tr key={doc._id}>
                    <td>
                      {doc?.userId?.firstname} {doc?.userId?.lastname}
                    </td>
                    <td>{doc.specialization}</td>
                    <td>{doc.experience} yrs</td>
                    <td>₹{doc.fees}</td>
                    <td>
                      <button className="btn accept-btn" onClick={() => approveDoctor(doc)}>
                        Approve
                      </button>

                      <button className="btn reject-btn" onClick={() => rejectDoctor(doc)}>
                        Reject
                      </button>

                      <button className="btn delete-btn" onClick={() => deleteDoctor(doc)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
      <Footer />
    </>
  );
};

export default AdminDoctors;
