import Hamburger from "../hamburger/Hamburger";
import "./reciever.css"

import React, { useState, useEffect } from 'react';

const Reciever = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:8082/donations/all');
        if (response.ok) {
            console.log("successfull")
          const data = await response.json();
          setDonations(data); // Update state with fetched donation data
        } else {
          console.error('Failed to fetch donation data');
        }
      } catch (error) {
        console.error('Error occurred while fetching donation data:', error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div>
        <Hamburger/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h1 className="donations-in-reciever-page">Welcome To The Receiver's page</h1>
        <br/>
      <h4 className="donations-in-reciever-page">All Donations</h4>
      <table className="table-in-receiver-page">
        <thead>
          <tr className="table-header-in-reciever-page">
            <th>ID</th>
            <th>Type</th>
            <th>Comment</th>
            <th>Phone</th>
            <th>Address</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reciever;
