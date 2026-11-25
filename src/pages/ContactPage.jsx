import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="card">
      <h2>Contact Me!</h2>
      {submitted ? (
        <p style={{ marginTop: '1rem', color: '#16a34a' }}>Thank you! Your message has been sent.</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" required placeholder="Your Name" />
          
          <label>Email:</label>
          <input type="email" required placeholder="Your Email" />
          
          <label>Message:</label>
          <textarea rows="4" required placeholder="Your Message..."></textarea>
          
          <button type="submit" className="submit-btn">Send</button>
        </form>
      )}
    </div>
  );
}