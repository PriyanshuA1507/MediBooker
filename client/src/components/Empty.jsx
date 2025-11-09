
import React from "react";
import "../styles/empty.css";

// Component created by Priyanshu for MediBooker
const EmptyState = ({ message = "Nothing to show right now." }) => {
  return (
    <div className="empty-container flex-center">
      <h2 className="empty-text">{message}</h2>
    </div>
  );
};

export default EmptyState;
