import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import "./AdminDashboard.css"; // Import unique styles

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch only pending Interns & Companies
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userList = [];
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.role !== "admin") { // Exclude admins
          userList.push({ id: doc.id, ...userData });
        }
      });
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  // Function to handle status updates
  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      await updateDoc(doc(db, "users", userId), { status: newStatus });

      // Update state instantly
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <table className="admin-dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="admin-dashboard-row">
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td className={`admin-dashboard-status ${user.status}`}>{user.status}</td>
              <td>
                {user.status === "pending" && (
                  <div className="admin-dashboard-actions">
                    <button 
                      className="admin-dashboard-approve" 
                      onClick={() => handleStatusUpdate(user.id, "approved")}
                    >
                      Approve
                    </button>
                    <button 
                      className="admin-dashboard-decline" 
                      onClick={() => handleStatusUpdate(user.id, "declined")}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
