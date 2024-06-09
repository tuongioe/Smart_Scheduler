import './User.css';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useState } from 'react';
import { Form, Link } from 'react-router-dom';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <form
      className="Login__Block"
      onSubmit={loginHandler}
      style={{ backgroundImage: 'linear-gradient(to right, #146D78, #1F3336)' }}
    >
      <h1>Login</h1>
      <div className="Login__Input">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your E-mail"
          style={{
            backgroundImage: 'linear-gradient(to right, #59898F, #2F4244)',
          }}
        ></input>
      </div>
      <div className="Login__Input">
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="Enter your password"
          style={{
            backgroundImage: 'linear-gradient(to right, #59898F, #2F4244)',
          }}
        ></input>
        {showPassword ? (
          <FiEye
            size={24}
            className="Login__Icon1"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <FiEyeOff
            size={24}
            className="Login__Icon1"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      <p className="Forgot">Forgot password ?</p>
      <button
        className="Login__Button"
        onClick={loginHandler}
        style={{
          backgroundImage: 'linear-gradient(to left, #00717F, #00777F)',
        }}
      >
        Login
      </button>
      <p className="Login__Text">
        No account ?
        <Link
          to="/register"
          style={{ fontWeight: '600', color: 'white', textDecoration: 'none' }}
        >
          {' '}
          Register{' '}
        </Link>
        here
      </p>
    </form>
  );
}

export default LoginPage;
