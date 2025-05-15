import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

 // src/pages/Login.js
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent form from reloading page

  try {
    const res = await loginUser({ email, password });

    const token = res.token; // <-- Should be res.token, check if it's correct.
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard'); // Navigate after successful login
    } else {
      console.error('No token received:', res);
      setError('Login failed. Please try again.');
    }
  } catch (err) {
    console.error('Login failed:', err);
    setError('Login failed. Please try again.');
  }
};

  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p className="redirect-msg">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
