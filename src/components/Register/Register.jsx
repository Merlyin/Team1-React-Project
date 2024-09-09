import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { signUpUser } from '../../api';
import logo from '../../Images/logo.png';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      const response = await signUpUser(name, email, password);
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLoginClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <img src={logo} alt="Money Guard Logo" className={styles.logo} />{' '}
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="👤  Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="✉️  E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒  Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒  Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>
        <button className={styles.loginButton} onClick={handleLoginClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Register;
