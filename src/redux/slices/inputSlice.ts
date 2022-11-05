import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { InputType } from '../../types/Global';

const initialState: InputType = {
  value: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    clearInput(state) {
      state.value = '';
    },
  },
});

export const { setInputValue, clearInput } = inputSlice.actions;
export default inputSlice.reducer;
