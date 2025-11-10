import React from "react";
import "../styles/footer.css";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

// Developed by Priyanshu for MediBooker
const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/doctors"}>Doctors</NavLink>
            </li>
            <li>
              <NavLink to={"/appointments"}>Appointments</NavLink>
            </li>
            <li>
              <NavLink to={"/notifications"}>Notifications</NavLink>
            </li>
            <li>
              <HashLink to={"/#contact"}>Contact Us</HashLink>
            </li>
            <li>
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
          </ul>
        </div>

        <div className="social">
          <h3>Connect With Us</h3>
          <ul>
            <li className="facebook">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </li>
            <li className="youtube">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </li>
            <li className="instagram">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
