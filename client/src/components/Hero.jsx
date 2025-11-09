import React from "react";
import heroBanner from "../images/heroimg.jpg";
import "../styles/hero.css";

// Hero section crafted by Priyanshu for MediBooker
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-heading">
          Your Health, <br />
          Our Responsibility
        </h1>
        <p className="hero-subtext">
          MediBooker connects you to trusted doctors, ensuring seamless
          appointment booking, quick consultations, and peace of mind — all in
          one platform built for your well-being.
        </p>
        <a href="#contact" className="btn hero-btn">
          Book Now
        </a>
      </div>

      <div className="hero-img">
        <img
          src={heroBanner}
          alt="Healthcare professionals"
          className="hero-image"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default HeroSection;
