import React from "react";

const Contact: React.FC = () => {
  return (
    <section className="dashboard">
      <div className="main">
        <h2 className="breadcrumb-title">
          We're here to help
        </h2>
        <div className="contact-content">
          <h4>Contact Us</h4>
          <p>Has encountered a problem with FT Corpex, send us an email and we will help you as soon as possible.</p>
          <br/>
          <a href="mailto:contact@ftcorpex.com" className="btn">contact@ftcorpex.com</a>
        </div>

      </div>
    </section>

  );
};

export default Contact;
