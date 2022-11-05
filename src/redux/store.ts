import { configureStore } from '@reduxjs/toolkit';
import inputSlice from './slices/inputSlice';
import tasksSlice from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    input: inputSlice,
    taskList: tasksSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
