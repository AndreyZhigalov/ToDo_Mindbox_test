import React from 'react';
import { TaskItem } from '../../types/Global';

const TasksContainer: React.FC<any> = ({ setTaskStorage, taskStorage }) => {
  const changeTaskStatus = (id: number) => {
    let getStorage = taskStorage?.map((item: TaskItem) =>
      item.taskID === id
        ? {
            ...item,
            isDone: !item.isDone,
          }
        : item,
    );
    setTaskStorage(getStorage);
    localStorage.setItem('taskStorage', JSON.stringify(getStorage));
  };
  return (
    <div className={'tasks_container'}>
      {taskStorage?.length ? (
        taskStorage.map(({ taskID, task, isDone }: TaskItem, index: number) => (
          <label key={taskID} className={isDone ? 'task_card strikethrough' : 'task_card'}>
            <input
              type={'radio'}
              checked={isDone}
              onClick={() => changeTaskStatus(taskID)}
              onChange={() => {}}
            />
            {task}
          </label>
        ))
      ) : (
        <h2>У вас нет запланированных задач</h2>
      )}
    </div>
  );
};

export default TasksContainer;
