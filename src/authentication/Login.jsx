import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";

const Login = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (!userData) {
        setError("User not found.");
        return;
      }

      if (userData.role === "admin") {
        navigate("/admin");
        return;
      }

      if (userData.status === "pending") {
        setError("Your account is pending approval.");
        return;
      }

      if (userData.status === "declined") {
        setError("Your account has been declined.");
        return;
      }

      if (userData.role === "intern") {
        navigate("/intern-dashboard");
      } else if (userData.role === "company") {
        navigate("/company-dashboard");
      }
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="unique-login-container">
      <div className="unique-login-box">
        <h2 className="unique-login-title">Log In</h2>
        {error && <p className="unique-login-error">{error}</p>}
        <form onSubmit={handleLogin} className="unique-login-form">
          <input
            className="unique-login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="unique-login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="unique-login-button">Log In</button>
        </form>
        <p className="unique-login-signup-text">
          No account? <span onClick={() => navigate("/signup")} className="unique-login-signup-link">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
