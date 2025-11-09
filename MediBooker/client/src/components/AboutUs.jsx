
import React from "react";
import aboutBanner from "../images/aboutimg.jpg";

const AboutMediBooker = () => {
  return (
    <>
      <section className="container about-container">
        <h2 className="page-heading about-heading">About MediBooker</h2>
        <div className="about">
          <div className="hero-img">
            <img src={aboutBanner} alt="about-mediBooker" />
          </div>
          <div className="about-content">
            <p>
              MediBooker is a modern healthcare appointment platform designed by Priyanshu.
              It helps patients connect instantly with trusted doctors and manage consultations
              without hassle. Built with precision, privacy, and user experience in mind,
              MediBooker aims to simplify your healthcare journey from booking to follow-up.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMediBooker;



