import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem', maxWidth: '1500px', margin: '10px auto' }}>
        <h1 className="mb-4">PPE Vision: Ensuring Safety Through AI</h1>

        <p>
          <strong>PPE Vision</strong> is a real-time Personal Protective Equipment (PPE) detection system designed to promote workplace safety.
          By leveraging computer vision, it identifies whether workers are wearing critical safety gear like helmets, vests, and gloves.
        </p>

       
 <img
          src="/images/ppe-overview.png"
          alt="PPE Detection Overview"
          style={{ width: '30%', borderRadius: '10px', margin: '30px 0' }}
        />
        <h2 className="mt-5"> How It Works</h2>
        <p>
          The system captures video input from a webcam and processes it using deep learning models (YOLOv8, TensorFlow, etc.)
          to detect PPE usage in real time. Violations (e.g., missing helmet) are logged and flagged for further action.
        </p>

        <img
          src="/images/PPEWork.png"
          alt="System Architecture Diagram"
          style={{ width: '60%', borderRadius: '10px', margin: '30px 0' }}
        />

        <h2 className="mt-5"> Technologies Used</h2>
        <ul className="list-unstyled">
          <li className="d-flex align-items-center mb-2">
            <img src="/images/react.png" alt="React" style={{ width: '70px', marginRight: '10px' }} />
            React.js (Frontend)
          </li>
          <li className="d-flex align-items-center mb-2">
            <img src="/images/nodejs.png" alt="Node.js" style={{ width: '70px', marginRight: '10px' }} />
            Node.js & Express.js (Backend)
          </li>
          <li className="d-flex align-items-center mb-2">
            <img src="/images/mongodb.png" alt="MongoDB" style={{ width: '70px', marginRight: '10px' }} />
            MongoDB (Database)
          </li>
          
        </ul>

        <h2 className="mt-5"> Safety Tips for Workers</h2>
        <ul>
          <li>Always wear your helmet, gloves, and reflective vests in designated areas.</li>
          <li>Ensure your safety equipment fits properly and is in good condition.</li>
          <li>Report missing or damaged PPE to your supervisor immediately.</li>
          <li>Follow site safety guidelines and alerts flagged by the PPE Vision system.</li>
        </ul>

        <h2 className="mt-5"> Contact Us</h2>
        <p>
          Want to know more or collaborate? Reach out to us at:<br />
          📧 <a href="mailto:safety@ppevision.ai">safety@ppevision.ai</a>
        </p>
      </div>
      <Footer />
    </>
  );
}
