import '../assets/User.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/survey');
      }
    };
    verifyAuth();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const resetError = () => {
    setError(null);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    const email = e.target.elements['email'].value;
    const username = e.target.elements['username'].value;
    console.log(username);
    const password = e.target.elements['password'].value;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('userName', username);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}sign-up`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      navigate('/login');
    } catch (e) {
      setError({
        msg: e.response.data.message,
        email: e.response.data.email,
        username: e.response.data.userName,
        password: e.response.data.password,
      });
    }
  };

  return (
    <form
      className="Register__Block"
      onSubmit={signUpHandler}
      style={{ backgroundImage: 'linear-gradient(to right, #146D78, #1F3336)' }}
    >
      <h1>Register</h1>
      {error && (
        <p className="error_notification">
          {error.msg && <p>{error.msg}</p>}
          {error.email && <p>{error.email}</p>}
          {error.username && <p>{error.username}</p>}
          {error.password && <p>{error.password}</p>}
        </p>
      )}
      <div className="Register__Input">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your E-mail"
          onChange={resetError}
          style={{
            backgroundImage: 'linear-gradient(to right, #59898F, #2F4244)',
          }}
        ></input>
      </div>
      <div className="Register__Input">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          onChange={resetError}
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
          name="password"
          placeholder="Enter your password"
          autoComplete="off"
          onChange={resetError}
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
          autoComplete="off"
          onChange={resetError}
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
        type="submit"
        style={{
          backgroundImage: 'linear-gradient(to left, #00717F, #00777F)',
        }}
      >
        Register
      </button>
      <p className="Login__Text">
        Already have account ?
        <Link
          to="/login"
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
