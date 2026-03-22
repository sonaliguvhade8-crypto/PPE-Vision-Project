import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
     <div>
      
        <img
          src="/images/image1.png"
          alt="PPE Detection Overview"
          style={{ width: '100%', borderRadius: '0px',height:'390px' , margin: '0px 0' }}
        />
          </div>
       
      <div
        style={{
          width: '100%',
          backgroundColor: 'rgb(10, 46, 71)',
          color: 'white',
          padding: '2rem 4%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        {/* 3D Model */}
        <div style={{ flex: '1 1 300px', maxWidth: '300px', height: '250px' }}>
          <spline-viewer
            url="https://prod.spline.design/KFRXAZswMYqs1AqD/scene.splinecode"
            style={{ width: '100%', height: '100%', border: 'none' }}
          ></spline-viewer>
        </div>

        {/* Image next to model */}
        <div style={{ flex: '1 1 300px', maxWidth: '300px', height: '250px', marginLeft: '2rem' }}>
          <img
            src="/images/ppe.png"
            alt="PPE Example"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>

        {/* Text description */}
        <div style={{ flex: '2 1 400px', marginTop: '1rem', marginLeft: '2rem' }}>
          <h4 style={{ marginBottom: '1rem' }}> PPE Overview</h4>
          <p style={{ lineHeight: '1.6' }}>
            <strong>Personal Protective Equipment (PPE)</strong> is essential for ensuring worker safety in high-risk environments such as
            construction sites, manufacturing plants, and laboratories. PPE includes gear like helmets, gloves, safety vests, goggles, and boots
            designed to minimize exposure to workplace hazards.
            <br /><br />
            <strong>PPE Vision</strong> is a real-time AI-powered system that leverages computer vision to detect the presence or absence of critical PPE
            on workers. By using a webcam feed and deep learning models, it identifies violations (e.g., missing helmet or gloves) and raises alerts
            instantly—helping to enforce compliance and prevent accidents.
          </p>
        </div>
      </div>
 <div
  style={{
    width: '100%',
    backgroundColor: 'rgb(0, 2, 4)',
    color: 'white',
    padding: '4rem 4%',
    textAlign: 'center',
  }}
>
  <h2 style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>Let's get started</h2>

  <button
    style={{
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '0.8rem 2rem',
      fontSize: '1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    }}
    onClick={() => navigate("/live")}
  >
    Live Detection
  </button>
</div>

      <Footer />
    </>
  );
}
