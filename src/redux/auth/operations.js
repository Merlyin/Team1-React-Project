import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://wallet.b.goit.study/api';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/sign-in`, credentials);
      
      localStorage.setItem('token', response.data.token);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/sign-up`,
        userData
      );
      localStorage.setItem('token', response.data.token);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No token available');
      }
      const response = await axios.get(`${API_URL}/refresh`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'dashboard/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/transactions', {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectIsRefreshing = state => state.auth.isRefreshing;