import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setRole(userDoc.data().role);
      }
      setLoading(false);
    };
    checkRole();
  }, []);

  if (loading) return <p>Loading...</p>;

  return role === requiredRole ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
