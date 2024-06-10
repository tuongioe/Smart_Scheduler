import '../assets/User.css';
import { useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
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
  const [showPassword, setShowPassword] = useState({});
  const [error, setError] = useState();
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const resetError = () => {
    setError(null);
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const email = e.target.elements['email'].value;
    const password = e.target.elements['password'].value;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    try {
      console.log(`${process.env.REACT_APP_SERVER_URL}login`);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}login`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      localStorage.setItem('token', response.data.data.token);
      navigate('/survey');
    } catch (e) {
      setError({
        msg: e.response.data.message,
        email: e.response.data.email,
        password: e.response.data.password,
      });
    }
  };
  return (
    <form
      className="Login__Block"
      onSubmit={loginHandler}
      style={{ backgroundImage: 'linear-gradient(to right, #146D78, #1F3336)' }}
    >
      <h1>Login</h1>
      {error && (
        <p className="error_notification">
          {error.msg && <p>{error.msg}</p>}
          {error.email && <p>{error.email}</p>}
          {error.password && <p>{error.password}</p>}
        </p>
      )}
      <div
        className={`Login__Input ${
          error && error.email && 'Login__Input__error'
        }`}
      >
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          placeholder="Enter your E-mail"
          onChange={resetError}
        ></input>
      </div>
      <div
        className={`Login__Input ${
          error && error.password && 'Login__Input__error'
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Enter your password"
          autoComplete="off"
          onChange={resetError}
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
      {/* <p className="Forgot">Forgot password ?</p> */}

      <button
        className="Login__Button"
        type="submit"
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
          style={{ fontWeight: 'bold', color: 'white', textDecoration: 'none' }}
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
