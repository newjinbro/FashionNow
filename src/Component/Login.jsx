import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const nav = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    nav("/Register");
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3001/users',
        {
          email: user.email,
          password: user.password,
        }
      );
      const result = response.data;
      const found = result.find(
        (data) => data.email === user.email && data.password === user.password
      );
      if (found) {
        console.log("success");
        setSuccess("Successfully logged in");
        setError("");
        setUser({
          email: "",
          password: "",
          role: "user",
        });
        nav('/Home');
      } else {
        console.log("Login failed");
        setSuccess("");
        setError("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error occurred", error);
      setSuccess("");
      setError("An error occurred during login");
    }
  };

  return (
    <div className='login-page'>
      <form className='form'>
        <h4 className='logo-login'>
          Fashion
          <span style={{ color: "Blue", fontSize: "35px", fontFamily: "monospace" }}>
            Now
          </span>
        </h4>
        <h1 className='heading'>Login</h1>
        <div className='field'>
          <i className="bi bi-envelope-at-fill input-icon"></i>
          <input
            className='input-field'
            type="text"
            placeholder='E-mail'
            name='email'
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className='field'>
          <i className="bi bi-lock input-icon"></i>
          <input
            className='input-field'
            type="password"
            placeholder='Password'
            name='password'
            value={user.password}
            onChange={handleChange}
          />
        </div>

        {/* Success or Error Messages */}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className='btn'>
          <button className="button1" onClick={handleLogin}>LogIn</button>
          <button className='button2' onClick={handleRegister}>Register</button>
        </div>
      </form>
    </div>
  );
};
