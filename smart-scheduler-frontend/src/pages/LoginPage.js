import "../assets/User.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div
      className="Login__Block"
      style={{ backgroundImage: "linear-gradient(to right, #146D78, #1F3336)" }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="Login__Input">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              backgroundImage: "linear-gradient(to right, #59898F, #2F4244)",
            }}
          />
        </div>
        <div className="Login__Input">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              backgroundImage: "linear-gradient(to right, #59898F, #2F4244)",
            }}
          />
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
          type="submit"
          className="Login__Button"
          style={{
            backgroundImage: "linear-gradient(to left, #00717F, #00777F)",
          }}
        >
          Login
        </button>
      </form>
      <p className="Login__Text">
        No account ?
        <Link
          to="/register"
          style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}
        >
          {" "}
          Register{" "}
        </Link>
        here
      </p>
    </div>
  );
};

export default LoginPage;
