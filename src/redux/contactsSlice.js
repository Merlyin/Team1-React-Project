import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact, setFilter } from './actions';

export const contactsSlice = createSlice({
  name: 'phonebook',
  initialState: { contacts: [], filter: '' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(setFilter, (state, action) => {
        state.filter = action.payload;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});
export const contactsReducer = contactsSlice.reducer;