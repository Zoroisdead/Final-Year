import React, { useEffect, useState } from 'react';

const Rented = () => {
  const [checkoutData, setCheckoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/checkout/rented');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setCheckoutData(result.data); // Update state with fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkout/accept/${id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to accept the rental');
      }

      // Optionally, update the local state to reflect the accepted status
      const updatedData = checkoutData.map(item =>
        item.id === id ? { ...item, status: 'Accepted' } : item
      );
      setCheckoutData(updatedData);

      alert('Rental request accepted!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkout/decline/${id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to decline the rental');
      }

      // Optionally, update the local state to reflect the declined status
      const updatedData = checkoutData.filter(item => item.id !== id);
      setCheckoutData(updatedData);

      alert('Rental request declined!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Rented Bikes</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Bike Name</th>
            <th>Bike Image</th>
            <th>Price</th>
            <th>License</th>
            <th>Actions</th> {/* New column for actions */}
          </tr>
        </thead>
        <tbody>
          {checkoutData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.bike_name}</td>
              <td><img src={item.bike_image} alt={item.bike_name} width="100" /></td>
              <td>{item.price}</td>
              <td><img src={item.license} alt={item.bike_name} width="100" /></td>
              <td>
                {/* Accept and Decline buttons */}
                <button className='btn btn-primary' onClick={() => handleAccept(item.id)}>Accept</button>
                <button className='btn btn-danger' onClick={() => handleDecline(item.id)}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rented;
