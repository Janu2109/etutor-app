import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { user } from '../../types/user'

export interface UserState {
  value: user[]
}

const initialState: UserState = {
  value: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      login: (state, action) => {
          state.value  = action.payload;
      }
  },
})

export const {login} = userSlice.actions;

export default userSlice.reducer