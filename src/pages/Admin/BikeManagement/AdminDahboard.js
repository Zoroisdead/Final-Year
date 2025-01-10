import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [userList, setUserList] = useState([]); // State for user list
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(''); // State for errors

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Adjust the API URL if needed
        console.log('Fetched Users:', response.data); // Log the response to check for username
        setUserList(response.data); // Set the fetched data to state
      } catch (err) {
        setError('Error fetching user data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle actions like View, Suspend, or Delete
  const handleAction = async (action, userEmail) => {
    switch (action) {
      case 'View':
        alert(`Viewing details of ${userEmail}`);
        break;
      case 'Suspend':
        alert(`Suspending ${userEmail}`);
        break;
      case 'Delete':
        await handleDelete(userEmail); // Call the delete handler when the delete button is clicked
        break;
      default:
        break;
    }
  };

  // Delete user from the database
  const handleDelete = async (userEmail) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/users/${userEmail}`);
        alert('User deleted successfully');
        
        // Remove the deleted user from the UI (filter it out from the user list)
        setUserList(userList.filter(user => user.email !== userEmail));
      } catch (err) {
        alert('Error deleting user');
        console.error('Error:', err);
      }
    }
  };

  // Loading and Error handling UI
  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="user-stats">
        <span>Total Users: {userList.length}</span>
        {/* Active and Inactive users logic can be implemented if needed */}
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            {/* <th>Register Date</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              {/* Render the username, ensure 'username' is in the response */}
              <td>{user.username}</td>
              <td>{user.email}</td>
              {/* <td>{user.register_date}</td> */}
              <td>
                <button className="btn btn-primary" onClick={() => handleAction('View', user.email)}>View</button>
                <button className="btn btn-secondary" onClick={() => handleAction('Suspend', user.email)}>Suspend</button>
                <button className="btn btn-danger" onClick={() => handleAction('Delete', user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>x
      </table>
    </div>
  );
};

export default AdminDashboard;
