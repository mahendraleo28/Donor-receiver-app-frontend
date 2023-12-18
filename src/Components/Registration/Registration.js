import "./registration.css";
import React, { useState } from 'react';
import {Link} from "react-router-dom";

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState(null);
  const [role, setRole] = useState('');
  const reset =()=>{
    setUsername("")
    setPassword("")
    setEmail("")
    setMobile("")
    setAddress("")
    setMessage("")
    setRole("")
 }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8082/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, mobile, address ,role})
      });

      if (response.ok) {
        console.log("Registration successful!")
        setMessage('Registration successful!');
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message}`);
      }
    }
     catch (error) {
      console.error('An error occurred:', error);
      setMessage(`${error}`);
    }
  };

  return (
    <div className="for-overall-page-container">
    <div className="yedookati">
    <form className="form-container-container" onSubmit={handleSubmit}>
  <label>
    {/* <span>Username:</span> */}
    <input placeholder="Username" className="form-container-input" type="text" value={username} onChange={handleUsernameChange} required />
  </label>
  <label>
    {/* <span>Password:</span> */}
    <input placeholder="Password"  className="form-container-input" type="password" value={password} onChange={handlePasswordChange} required />
  </label>
  <label>
    {/* <span>Email:</span> */}
    <input placeholder="Email" className="form-container-input" type="email" value={email} onChange={handleEmailChange} required />
  </label>
  <label>
    {/* <span>Phone:</span> */}
    <input placeholder="Phone" className="form-container-input" type="mobile" value={mobile} onChange={handleMobileChange} required />
  </label>
  <label>
    {/* <span>Address:</span> */}
    <input placeholder="Address" className="form-container-input" type="text" value={address} onChange={handleAddressChange} required />
  </label>
  <div >
          {/* <label className="fornametagindrop" htmlFor="role">Role:</label> */}
          <select className="form-container-input1" id="role" name="role" value={role} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            <option value="donor">Donor</option>
            <option value="reciever">Reciever</option>
          </select>
        </div>
  <div className="button-container">
    <button type="submit">Register</button>
    <button className="resetbuttoninreg" type="button" onClick={reset}>reset</button>
  </div>
  {message && <p>{message}</p>}
</form>
<h6 className="forbuttoninregistration"> If you have an Account!
<Link to ="/">
  <button className="login" type='button'>Login</button>
  </Link>
  </h6>
</div>
</div>
  );
}

export default Registration;
