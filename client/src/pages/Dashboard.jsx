import React from "react";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import AdminDoctors from "../pages/AdminDoctors";
import AdminDoctorApplications from "../pages/AdminDoctorApplications";
import AdminAppointments from "../components/AdminAppointments";
import "../styles/dashboard.css";

const Dashboard = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case "users":
        return <Users />;

      case "doctors":              // ✔️ ALL doctors
        return <AdminDoctors />;

      case "doctorApplications":   // ✔️ ONLY PENDING doctors
        return <AdminDoctorApplications />;

      case "appointments":
        return <AdminAppointments />;

      default:
        return <div className="flex-center"><h3>No section selected</h3></div>;
    }
  };

  return (
    <section className="layout-section">
      <div className="layout-container">
        <Sidebar />
        {renderContent()}
      </div>
    </section>
  );
};

export default Dashboard;
