import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  value: boolean
}

const initialState: UserState = {
  value: false,
}

export const darkSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
      setDarkMode: (state, action) => {
          state.value  = action.payload;
      }
  },
})

export const {setDarkMode} = darkSlice.actions;

export default darkSlice.reducer