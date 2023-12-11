import React, { useState } from 'react';
import Hamburger from '../hamburger/Hamburger';
import "./donor.css";
import { useEffect } from 'react';

const DonationForm = () => {
  const [donation, setDonation] = useState({
    donationType: '',
    comment: '',
    phonenumber: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [donations, setDonations] = useState([]);
  const fetchDonations = async () => {
    try {
      const response = await fetch('http://localhost:8081/donations/all');
      if (response.ok) {
        console.log('Successfully fetched donations');
        const data = await response.json();
        setDonations(data);
      } else {
        console.error('Failed to fetch donation data');
      }
    } catch (error) {
      console.error('Error occurred while fetching donation data:', error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonation({ ...donation, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/donations/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donation),
      });

      if (response.ok) {
        fetchDonations();
        alert('Donation submitted successfully!')
        console.log('Donation submitted successfully!');
        // Reset the form after successful submission if needed
        setDonation({
          donationType: '',
          comment: '',
          phonenumber: '',
          addressLine1: '',
          addressLine2: '',
          state: '',
          country: '',
          postalCode: '',
        });
      } else {
        alert('Failed to submit donation.')
        console.error('Failed to submit donation.');
      }
    } catch (error) {
      alert('Error occurred while submitting donation:', error)
      console.error('Error occurred while submitting donation:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/donations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDonations();
        alert(`Donation with ID: ${id} deleted successfully!`);
        // Fetch donations again to update the list
      } else {
        alert('Failed to delete donation.');
      }
    } catch (error) {
      alert('Error occurred while deleting donation: ' + error);
      console.error('Error occurred while deleting donation:', error);
    }
  };


  return (
    <div>
      <div>
        <Hamburger />
      </div>
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          <select
            className='dropdown-for-donor-1st-dropdown'
            name="donationType"
            value={donation.donationType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type of donation</option>
            <option value="Clothes">Clothes</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Electronics">Electronics</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <div className='for-input-tags'>
        <textarea
            type="textarea"
            name="comment"
            value={donation.comment}
            onChange={handleInputChange}
            placeholder="Please Type Here.... What You Are Sharing"
            required
          />
          <input
            type="number"
            name="phonenumber"
            value={donation.phonenumber}
            onChange={handleInputChange}
            placeholder="Mobile number"
            required
          />
          <input
            type="text"
            name="addressLine1"
            value={donation.addressLine1}
            onChange={handleInputChange}
            placeholder="Address Line 1"
            required
          />
          <input
            type="text"
            name="addressLine2"
            value={donation.addressLine2}
            onChange={handleInputChange}
            placeholder="Address Line 2"
          />
          <input
            type="text"
            name="state"
            value={donation.state}
            onChange={handleInputChange}
            placeholder="State"
            required
          />
          <input
            type="text"
            name="country"
            value={donation.country}
            onChange={handleInputChange}
            placeholder="Country"
            required
          />
          <input
            type="number"
            name="postalCode"
            value={donation.postalCode}
            onChange={handleInputChange}
            placeholder="Postal Code"
            required
          />
        </div>
        <button className='submit-button-in-donor-page' type="submit">Submit Donation</button>
      </form>
      <div>
        <h4 className="donations-in-donor-page">All Donations</h4>
        <table className='table-move-in-donor-page'>
          <thead>
            <tr className="table-header-in-reciever-page">
              <th>ID</th>
              <th>Type</th>
              <th>Comment</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr className="table-data-in-reciever-page" key={donation.id}>
                <td>{donation.id}</td>
                <td>{donation.donationType}</td>
                <td>{donation.comment}</td>
                <td>{donation.phonenumber}</td>
                <td>{`${donation.addressLine1}, ${donation.addressLine2}, ${donation.state}, ${donation.country} - ${donation.postalCode}`}</td>
                <td>
                  <button
                    className='delete-button'
                    onClick={() => handleDelete(donation.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
    </div>
  );
};

export default DonationForm;
