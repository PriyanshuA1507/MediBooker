

import React, { useState } from "react";
import "../styles/contact.css";
import toast from "react-hot-toast";

// Developed by Priyanshu for MediBooker
const ContactForm = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    if (!contactDetails.name || !contactDetails.email || !contactDetails.message) {
      e.preventDefault();
      toast.error("Please fill in all the fields before sending your message.");
      return;
    }
    toast.success("Your message has been sent successfully!");
  };

  return (
    <section className="register-section flex-center" id="contact">
      <div className="contact-container flex-center contact">
        <h2 className="form-heading">Get in Touch</h2>
        <form
          method="POST"
          action={`https://formspree.io/f/${process.env.REACT_APP_FORMIK_SECRET}`}
          className="register-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Your Name"
            value={contactDetails.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Your Email"
            value={contactDetails.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            className="form-input"
            placeholder="Write your message..."
            value={contactDetails.message}
            onChange={handleChange}
            rows="8"
            required
          ></textarea>

          <button type="submit" className="btn form-btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
