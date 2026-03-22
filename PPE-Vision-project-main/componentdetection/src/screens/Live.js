import React from "react";

export default function Live() {
  // Function to start backend detection (runs YOLO app.py)
  const startDetection = async () => {
    try {
      const res = await fetch("http://localhost:5001/start-detection");
      const data = await res.json();
      alert(data.status || "Detection started successfully!");
    } catch (err) {
      console.error("Error starting detection:", err);
      alert("❌ Failed to start detection. Please check backend logs.");
    }
  };

  // Optional stop detection (if you later implement it in Flask)
  const stopDetection = async () => {
    try {
      const res = await fetch("http://localhost:5001/stop-detection");
      const data = await res.json();
      alert(data.status || "Detection stopped!");
    } catch (err) {
      console.error("Error stopping detection:", err);
      alert("❌ Failed to stop detection. (Backend may not support this yet.)");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        background: "#f4f6f8",
        borderRadius: 10,
        padding: 24,
      }}
    >
      <h2 style={{ color: "#222", marginBottom: 16 }}>🦺 PPE Live Detection</h2>

      <p style={{ marginBottom: 24, color: "#555" }}>
        Click the button below to start the detection system.
      </p>

      <div style={{ display: "flex", gap: 16 }}>
        <button
          onClick={startDetection}
          style={{
            padding: "10px 18px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          ▶️ Start Detection
        </button>

        <button
          onClick={stopDetection}
          style={{
            padding: "10px 18px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          ⏹ Stop Detection
        </button>
      </div>

      <p style={{ marginTop: 30, color: "#777", fontSize: 14 }}>
        Make sure your backend (Flask server) is running before clicking.
      </p>
    </div>
  );
}
