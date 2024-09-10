import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operations';
import { toast } from 'react-toastify';
import styles from './RegisterForm.module.css';
import logo from '../../Images/logo.png';

const basicSchema = yup.object().shape({
  username: yup.string().required('Name is required!'),
  email: yup
    .string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters!')
    .max(12, 'Password must be at most 12 characters!')
    .required('Password is required!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match!')
    .required('Confirm password is required!'),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(basicSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = data => {
    const { username, email, password } = data;
    dispatch(registerThunk({ username, email, password }))
      .unwrap()
      .then(() => {
        toast.success('Registration successful!');
        navigate('/');
      })
      .catch(() => toast.error('Something went wrong!'));
    reset();
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <img src={logo} alt="Money Guard Logo" className={styles.logo} />
        <form className={styles.registerForm} onSubmit={handleSubmit(submit)}>
          <input
            {...register('username')}
            type="text"
            placeholder="        Name"
            className={`${styles.input} ${styles.userInput}`}
          />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
          <input
            {...register('email')}
            type="email"
            placeholder="        Email"
            className={`${styles.input} ${styles.emailInput}`}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
          <input
            {...register('password')}
            type="password"
            placeholder="        Password"
            className={`${styles.input} ${styles.passwordInput}`}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="        Confirm Password"
            className={`${styles.input} ${styles.passwordInput}`}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}

          <button type="submit" className={styles.registerButton}>
            Register
          </button>
        </form>

        <button
          type="button"
          className={styles.loginButton}
          onClick={handleLoginClick}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
