import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="content">
        <h1>Smart Irrigation System</h1>
        <p>Efficiently monitor and manage your farm's irrigation needs.</p>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
      </div>
    </div>
  );
};

export default HomePage;
