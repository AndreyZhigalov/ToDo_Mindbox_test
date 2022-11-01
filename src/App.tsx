import React from 'react';
import { TaskStorage } from './types/Global';

import OptionsPanel from './components/OptionsPanel';
import TaskInput from './components/TaskInput';
import TasksContainer from './components/TasksContainer';

import './App.css';

function App() {
  const [taskStorage, setTaskStorage] = React.useState<TaskStorage>();

  React.useEffect(() => {
    if (localStorage.getItem('taskStorage')) {
      let getStorage = JSON.parse(localStorage.getItem('taskStorage') as string);
      setTaskStorage(getStorage);
    } else {
      localStorage.setItem('taskStorage', '[]');
      setTaskStorage([]);
    }
  }, []);

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="wrapper">
        <TaskInput setTaskStorage={setTaskStorage} />
        <TasksContainer setTaskStorage={setTaskStorage} taskStorage={taskStorage} />
        <OptionsPanel setTaskStorage={setTaskStorage} taskStorage={taskStorage} />
      </div>
    </div>
  );
}

export default App;
