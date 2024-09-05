import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { signInUser } from '../../api';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await signInUser(email, password);
      localStorage.setItem('token', response.token); 
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Money Guard</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
          <button
            type="button"
            className={styles.registerButton}
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
