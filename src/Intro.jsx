import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css"; // Import unique styles
import Login from "./authentication/Login";

const Intro = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false); // State to show/hide login form

  return (
    <div className="intro-container">
      <h1>Welcome to Jan Jenon</h1>
      <p>
        We connect <strong>Interns</strong> with <strong>Companies</strong> to provide amazing internship opportunities.
        Whether you're an aspiring professional or a business looking for fresh talent, we help you connect.
      </p>

      <p><strong>Join us today!</strong></p>

      {/* Toggle Login Form */}
      {!showLogin ? (
        <button onClick={() => setShowLogin(true)} className="intro-button">
          Login
        </button>
      ) : (
        <Login navigate={navigate} />
      )}
    </div>
  );
};

export default Intro;
