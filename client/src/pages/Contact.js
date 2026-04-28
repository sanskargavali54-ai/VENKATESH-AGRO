import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <div className="container">
        <h1>Contact Us</h1>
        <div className="contact-info">
          <div>
            <h3>Phone</h3>
            <p>+91 12345 67890</p>
          </div>
          <div>
            <h3>Email</h3>
            <p>info@saraswatiagro.com</p>
          </div>
          <div>
            <h3>WhatsApp</h3>
            <a href="https://wa.me/1234567890" className="btn">Chat on WhatsApp</a>
          </div>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5!2d74.55!3d19.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDM0JzEyLjAiTiA3NMKwMzMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{border:0}}
            allowFullScreen=""
            loading="lazy"
            title="Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;