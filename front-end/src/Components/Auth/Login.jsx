import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // same CSS as register

export const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://your-api-url.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      });

      const data = await response.json();

      if (data.success) {
        // Save token or user data if needed
        // localStorage.setItem('token', data.token);
        navigate("/dashboard"); // or any other route
      } else {
        setMessage(data.message || "Login failed. Try again.");
      }

    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChanges}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChanges}
          required
        />

        <div className="error">{message}</div>

        <button type="submit">Login</button>

        <div className="login">
          Don't have an account? <a href="/register">Sign Up</a>
        </div>
      </form>
    </div>
  );
};
