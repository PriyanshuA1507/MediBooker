import React from "react";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";

// FIXED IMPORTS — AdminDoctors is inside /pages, NOT /components
import AdminDoctors from "../pages/AdminDoctors";

import AdminApplications from "../components/AdminApplications";
import AdminAppointments from "../components/AdminAppointments";
import "../styles/dashboard.css";

const Dashboard = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case "users":
        return <Users />;
      case "doctors":
        return <AdminDoctors />;
      case "doctorApplications":
        return <AdminDoctors />; // NEW TYPE SUPPORT
      case "applications":
        return <AdminApplications />;
      case "appointments":
        return <AdminAppointments />;
      default:
        return (
          <div className="flex-center" style={{ flex: 1 }}>
            <h3>No section selected</h3>
          </div>
        );
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
