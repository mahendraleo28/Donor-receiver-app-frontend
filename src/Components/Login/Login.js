import "./login.css";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole] = useState('employee');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleRoleChange = (event) => {
  //   setSelectedRole(event.target.value);
  // };
  
  const reset =()=>{
    setEmail("")
    setPassword("")
 }
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: selectedRole })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful!', data.role);
        const userrole = data.role;
        console.log(userrole);
        if (userrole === "donor") {
          navigate('/Donor');
        } else if(userrole === "reciever") {
          navigate('/Reciever');
        }
      } else {
        const errorData = await response.json();
        console.log('Login failed:', errorData);
        setMessage(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage(`${error}`);
    }
  };

  return (
    <div className="yedookatiinlogin">
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        {/* Email: */}
        <input placeholder="Email" className="username-input" type="email" value={email} onChange={handleEmailChange} required />
      </label>
      <label>
        {/* Password: */}
        <input placeholder="Password" className="password-input" type="password" value={password} onChange={handlePasswordChange} required/>
      </label>
      <div className="button-container">
        <button className="login-button" type="submit">Login</button>
        <br/>
        <button className="reset-button" type="button" onClick={reset}>reset</button>
      </div>
      {message && <p className="error-message">{message}</p>}
    </form>
    <h6 className="formmovingthetagtoleft">If you don't have an Acccount!
    <Link to ="/Registration">
      <button className="registration" type="button"> Register </button>
    </Link>
    </h6>
    </div>
  );
}

export default Login;