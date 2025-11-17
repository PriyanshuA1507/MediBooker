import React, { useEffect, useState } from "react";
import fetchData from "../helper/apiCall";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const AdminDoctorApplications = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPending = async () => {
    try {
      setLoading(true);
      const res = await fetchData("/doctor/getnotdoctors");   // ✔️ ONLY pending
      setPending(res || []);
    } catch {
      toast.error("Unable to load pending applications");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (doc) => {
    try {
      await axios.put(
        "/doctor/acceptdoctor",
        { id: doc?.userId?._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Approved!");
      loadPending();
    } catch {
      toast.error("Failed");
    }
  };

  const reject = async (doc) => {
    try {
      await axios.put(
        "/doctor/rejectdoctor",
        { id: doc?.userId?._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Rejected!");
      loadPending();
    } catch {
      toast.error("Failed");
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section className="container notif-section">
      <h2 className="page-heading">Pending Doctor Applications</h2>

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
          {pending.map((p) => (
            <tr key={p._id}>
              <td>{p?.userId?.firstname} {p?.userId?.lastname}</td>
              <td>{p.specialization}</td>
              <td>{p.experience} yrs</td>
              <td>₹{p.fees}</td>
              <td>
                <button className="btn accept-btn" onClick={() => approve(p)}>Approve</button>
                <button className="btn reject-btn" onClick={() => reject(p)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminDoctorApplications;
