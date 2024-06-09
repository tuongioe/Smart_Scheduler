import '../assets/User.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <form
      className="Register__Block"
      style={{ backgroundImage: 'linear-gradient(to right, #146D78, #1F3336)' }}
    >
      <h1>Register</h1>
      <p className="error_notification">Error</p>
      <div className="Register__Input">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your E-mail"
          style={{
            backgroundImage: 'linear-gradient(to right, #59898F, #2F4244)',
          }}
        ></input>
      </div>
      <div className="Register__Input">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your username"
          style={{
            backgroundImage: 'linear-gradient(to right, #59898F, #2F4244)',
          }}
        ></input>
      </div>
      <div className="Register__Input">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Enter your password"
          style={{
            backgroundImage: 'linear-gradient(to right, #59898F, #2F4244)',
          }}
        ></input>
        {showPassword ? (
          <FiEye
            size={24}
            className="Register__Icon1"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FiEyeOff
            size={24}
            className="Register__Icon1"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      <div className="Register__Input">
        <label htmlFor="confirmpassword">Confirm Password</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmpassword"
          placeholder="Enter your password"
          style={{
            backgroundImage: 'linear-gradient(to right, #59898F, #2F4244)',
          }}
        ></input>
        {showConfirmPassword ? (
          <FiEye
            size={24}
            className="Register__Icon2"
            onClick={toggleConfirmPasswordVisibility}
          />
        ) : (
          <FiEyeOff
            size={24}
            className="Register__Icon2"
            onClick={toggleConfirmPasswordVisibility}
          />
        )}
      </div>
      <button
        className="Register__Button"
        style={{
          backgroundImage: 'linear-gradient(to left, #00717F, #00777F)',
        }}
      >
        Register
      </button>
      <p className="Login__Text">
        Already have account ?
        <Link
          to="/"
          style={{ fontWeight: 'bold', color: 'white', textDecoration: 'none' }}
        >
          {' '}
          Login{' '}
        </Link>
        here
      </p>
    </form>
  );
}

export default RegisterPage;
