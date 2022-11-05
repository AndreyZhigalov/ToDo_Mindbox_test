import React from 'react';

import OptionsPanel from './components/OptionsPanel';
import TaskInput from './components/TaskInput';
import TasksContainer from './components/TasksContainer';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>todos</h1>
      <div className="wrapper">
        <TaskInput />
        <TasksContainer />
        <OptionsPanel />
      </div>
    </div>
  );
};

export default App;
