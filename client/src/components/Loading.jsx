
import React from "react";
import "../styles/loading.css";

// Loading component designed by Priyanshu for MediBooker
const LoadingSpinner = () => {
  return (
    <div className="loading flex-center">
      <div className="spinner"></div>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  );
};

export default LoadingSpinner;
