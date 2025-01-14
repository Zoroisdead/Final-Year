import React, { useEffect, useState } from 'react';
import Modal from '../../../components/modal'; // Import the Modal component

const Rented = () => {
  const [checkoutData, setCheckoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [currentCheckoutId, setCurrentCheckoutId] = useState(null); // State to store the checkout ID for confirmation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/checkout/rented');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setCheckoutData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccept = async (checkoutid) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkout/accept/${checkoutid}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to accept the rental');
      }

      const updatedData = checkoutData.map(item =>
        item.checkoutid === checkoutid ? { ...item, status: 'Accepted' } : item
      );
      setCheckoutData(updatedData);

      alert('Rental request accepted!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDecline = (checkoutid) => {
    setCurrentCheckoutId(checkoutid);
    setShowModal(true); // Show the confirmation modal
  };

  const confirmDecline = async () => {
    if (!currentCheckoutId) {
      alert('Invalid checkoutid');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/checkout/decline/${currentCheckoutId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to decline and delete the rental');
      }

      const updatedData = checkoutData.filter(item => item.checkoutid !== currentCheckoutId);
      setCheckoutData(updatedData);

      // alert('Rental request declined and deleted!');
    } catch (error) {
      console.error('Error in handleDecline:', error);
      alert('Error: ' + error.message);
    } finally {
      setShowModal(false); // Close the modal after confirming
    }
  };

  const cancelDecline = () => {
    setShowModal(false); // Close the modal without deleting
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="heading">Rented Bikes</h1>
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
            <th>Actions</th>
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
                <button className='btn btn-primary' onClick={() => handleAccept(item.checkoutid)}>Accept</button>
                <button className='btn btn-danger' onClick={() => handleDecline(item.checkoutid)}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={showModal}
        onClose={cancelDecline}
        onConfirm={confirmDecline}
      />
    </div>
  );
};

export default Rented;
