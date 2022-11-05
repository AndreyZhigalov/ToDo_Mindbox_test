import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TaskStorage } from '../../types/Global';

const initialState = {
  taskStorage: [] as TaskStorage,
  sortType: 'all' as string,
};

const tasksSlice = createSlice({
  name: 'tasksStorage',
  initialState,
  reducers: {
    setTask(state, action: PayloadAction<string>) {
      let taskValue = action.payload;
      let tasks = JSON.parse(localStorage.getItem('taskStorage') as string);
      let newTask = { taskID: state.taskStorage.length, task: taskValue, isDone: false };

      if (taskValue) {
        localStorage.setItem('taskStorage', JSON.stringify([...tasks, newTask]));
        state.taskStorage.push(newTask);
      }
    },
    setTaskStorage(state) {
      let tasks = localStorage.getItem('taskStorage');

      if (tasks) {
        state.taskStorage = JSON.parse(tasks);
      }
      if (!tasks) {
        localStorage.setItem('taskStorage', '[]');
      }
    },
    changeTaskStatus(state, action: PayloadAction<number>) {
      let getStorage = state.taskStorage?.map((item) =>
        item.taskID === action.payload
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item,
      );
      state.taskStorage = getStorage;
      localStorage.setItem('taskStorage', JSON.stringify(getStorage));
    },
    setSortType(state, action: PayloadAction<string>) {
      let sort = (state.sortType = action.payload);
      let tasks = JSON.parse(localStorage.getItem('taskStorage') as string) as TaskStorage;
      if (sort === 'all') {
        state.taskStorage = tasks;
      } else if (sort === 'active') {
        state.taskStorage = tasks.filter((item) => !item.isDone);
      } else if (sort === 'completed') {
        state.taskStorage = tasks.filter((item) => item.isDone);
      }
    },
    clearCompletedTasks(state) {
      let getStorage = state.taskStorage
        ?.filter((item) => item.isDone === false)
        .map((item, index: number) => {
          return { ...item, taskID: index };
        });
      state.taskStorage = getStorage;
      localStorage.setItem('taskStorage', JSON.stringify(getStorage));
    },
  },
});

export const taskListSelector = (state: RootState) => state.taskList;

export const { setTask, setTaskStorage, changeTaskStatus, setSortType, clearCompletedTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
