import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./Intro";
import SignUp from "./authentication/SignUp";
import Login from "./authentication/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import InternDashboard from "./components/InternDashboard";
import CompanyDashboard from "./components/CompanyDashboard";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/intern-dashboard" element={<ProtectedRoute requiredRole="intern"><InternDashboard /></ProtectedRoute>} />
          <Route path="/company-dashboard" element={<ProtectedRoute requiredRole="company"><CompanyDashboard /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
