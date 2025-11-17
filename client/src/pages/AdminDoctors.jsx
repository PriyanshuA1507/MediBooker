import React, { useEffect, useState } from "react";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import "../styles/admin.css";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetchData("/doctor/getalldoctors");   // ✔️ ALL doctors
      setDoctors(res || []);
    } catch (err) {
      toast.error("Unable to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section className="container notif-section">
      <h2 className="page-heading">All Doctors</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Fees</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td>{doc?.userId?.firstname} {doc?.userId?.lastname}</td>
              <td>{doc.specialization}</td>
              <td>{doc.experience} yrs</td>
              <td>₹{doc.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminDoctors;
