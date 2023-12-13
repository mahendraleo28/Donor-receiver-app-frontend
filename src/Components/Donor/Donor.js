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
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [message, setMessage] = useState("")
  const reset=() => {
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
    setMessage('')
  }
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
      setMessage(`${error}`)
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
        setMessage("Last Donation Successful")
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
        const errorData = await response.json();
        setMessage(`${errorData}`)
        alert('Failed to submit donation.')
        console.error('Failed to submit donation.');
      }
    } catch (error){
      alert('Error occurred while submitting donation:', error)
      console.error('Error occurred while submitting donation:', error);
      setMessage(`${error}`)
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
      setMessage(`${error}`)
    }
  };

  const handleUpdate = (donation) => {
    setSelectedDonation(donation);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8081/donations/${selectedDonation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedDonation),
      });

      if (response.ok) {
        fetchDonations();
        alert('Donation updated successfully!');
        setShowUpdateForm(false);
        setSelectedDonation(null);
      } else {
        alert('Failed to update donation.');
        console.error('Failed to update donation.');
      }
    } catch (error) {
      alert('Error occurred while updating donation: ' + error);
      console.error('Error occurred while updating donation:', error);
    }
  };


  return (
    <div>
      <div>
        <Hamburger />
      </div>
      <div className='overall-page-content'>
      <br />
      <br />
      <br />
      <br />
      <form className='form-tag-in-donor-page' onSubmit={handleSubmit}>
        <h1 className='Donor-page-heading'>Welcome to the Donor's Page</h1>
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
            className='comment-tag-in-donor-page'
            type="textarea"
            name="comment"
            value={donation.comment}
            onChange={handleInputChange}
            placeholder="Please Type Here.... Description About What You Are Donating"
            required
          />
          <input
            type="text"
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
        <p className='This-is-for-errror-message'>{message}</p>
        <div className='for-both-buttons-in-donor-page'>
        <button className='submit-button-in-donor-page' type="submit">Submit Donation</button>
        <button onClick={reset} className='Reset-button-in-donr-page' type='reset'>Reset</button>
        </div>
        <br/>
      </form>
      </div>
               {showUpdateForm && selectedDonation && (
          <form className='for-update-forms-in-donor-page' onSubmit={handleUpdateSubmit}>
            {/* Display fields of selectedDonation for updating */}
            
            <h4 className='text-in-update-form'>Update Form</h4>
            <label>
          <select
            className='dropdown-for-donor-1st-dropdown'
            name="donationType"
            value={selectedDonation.donationType}
            onChange={(e) =>
              setSelectedDonation({
                ...selectedDonation,
                donationType: e.target.value,
              })
            }
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
            <textarea
            className='textarea-tag-in-donor-page-to-update'
            type="textarea"
            name="comment"
            value={selectedDonation.comment}
            onChange={(e) =>
              setSelectedDonation({
                ...selectedDonation,
                comment: e.target.value,
              })
            }
            placeholder="Please Type Here.... What You Are Donating"
            required
          />
            <input
              type='text'
              name='phonenumber'
              value={selectedDonation.phonenumber}
              onChange={(e) =>
                setSelectedDonation({
                  ...selectedDonation,
                  phonenumber: e.target.value,
                })
              }
              placeholder='Mobile number'
              required
            />   
            <input
              type='text'
              name='addressLine1'
              value={selectedDonation.addressLine1}
              onChange={(e) =>
                setSelectedDonation({
                  ...selectedDonation,
                  addressLine1: e.target.value,
                })
              }
              placeholder='addressLine1'
              required
            />
            <input
              type='text'
              name='addressLine2'
              value={selectedDonation.addressLine2}
              onChange={(e) =>
                setSelectedDonation({
                  ...selectedDonation,
                  addressLine2: e.target.value,
                })
              }
              placeholder='addressLine2'
            />
            
            <input
              type='text'
              name='state'
              value={selectedDonation.state}
              onChange={(e) =>
                setSelectedDonation({
                  ...selectedDonation,
                  state: e.target.value,
                })
              }
              placeholder='State'
              required
            />
            <input
              type='text'
              name='Country'
              value={selectedDonation.country}
              onChange={(e) =>
                setSelectedDonation({
                  ...selectedDonation,
                  country: e.target.value,
                })
              }
              placeholder='Country'
              required
            />
            <input
              type='number'
              name='postalcode'
              value={selectedDonation.postalCode}
              onChange={(e) =>
                setSelectedDonation({
                  ...selectedDonation,
                  postalCode: e.target.value,
                })
              }
              placeholder='Postal Code'
              required
            />
            
            {/* Add other fields similarly */}

            <button className='update-buton-in-donor-page' type='submit'>Update Donation</button>
          </form>
        )}
      <div className='this-is-for-table-data-in-donor-page'>
        <h4 className="donations-in-donor-page">All Donations</h4>
        <table className='table-in-receiver-page1'>
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
                  <span
                    className='delete-button'
                    onClick={() => handleDelete(donation.id)}
                  >
                    Delete
                  </span>
                  <span
                      className='delete-button'
                      onClick={() => handleUpdate(donation)}
                    >
                      Update
                    </span>
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