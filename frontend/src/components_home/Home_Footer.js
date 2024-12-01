import React from "react";

const UamFooter = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
            <p className="logo-container">AMS</p>
            <p className="footer-logo-text">
                We are committed to providing exceptional legal services with expertise in various fields of law. Our team of professionals is dedicated to ensuring your legal matters are handled efficiently and effectively.
            </p>
        </div>        
      </div>

      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Our Services</span>
          <span>Contact Us</span>
          <span>About Us</span>
          <span>Careers</span>
          <span>Client Testimonials</span>
          <span>Case Studies</span>
        </div>

        <div className="footer-section-columns">
          <span>+1-800-LAW-FIRM</span>
          <span>info@lawfirm.com</span>
          <span>support@lawfirm.com</span>
          <span>careers@lawfirm.com</span>
        </div>

        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default UamFooter;
