import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://wallet.b.goit.study/api';

export const instance = axios.create({
  baseURL: 'https://connections-api.goit.global',
})

const API_URL = 'https://wallet.b.goit.study/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// const 
const setAuthHeader = token => {
  axios.defaults.headers.common.authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.authorization = null;
};



export const setFilter = createAction('filter/set');

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts', {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post(
        '/contacts',
        JSON.stringify(newContact),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// signup

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials);
      const response = await axios.post('/users/signup', credentials, {
        headers: { 'Content-Type': 'application/json' },
        
      });
      alert("New Account Created Successfully! Click on Login to sign-in.");
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      alert("Account Creation Error.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const current = createAsyncThunk('auth/current', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue();
  }

  try {
    const response = await axios.get('/users/current');
    setAuthHeader(persistedToken);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});