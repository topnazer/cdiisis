import React, { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; 

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("intern");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
        role,
        status: "pending",
        createdAt: new Date(),
      });

      alert(`Sign up successful! Your account is pending admin approval.`);
      navigate("/login"); // Redirect to login after sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="unique-signup-container">
      <div className="unique-signup-box">
        <h2 className="unique-signup-title">Sign Up</h2>
        {error && <p className="unique-signup-error">{error}</p>}
        <form onSubmit={handleSignUp} className="unique-signup-form">
          <input className="unique-signup-input" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="unique-signup-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="unique-signup-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label className="unique-signup-label">Select Role:</label>
          <select className="unique-signup-select" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="intern">Intern</option>
            <option value="company">Company</option>
          </select>
          <button type="submit" className="unique-signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
