import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { changeTaskStatus, setTaskStorage, taskListSelector } from '../../redux/slices/tasksSlice';
import { TaskItem } from '../../types/Global';

const TasksContainer: React.FC = () => {
  const { taskStorage } = useAppSelector(taskListSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setTaskStorage());
  }, []);

  return (
    <div className={'tasks_container'}>
      {taskStorage?.length ? (
        taskStorage
          .map(({ taskID, task, isDone }: TaskItem, index: number) => (
            <label key={taskID} className={isDone ? 'task_card strikethrough' : 'task_card'}>
              <input
                type={'radio'}
                checked={isDone}
                onClick={() => dispatch(changeTaskStatus(taskID))}
                onChange={() => {}}
              />
              {task}
            </label>
          ))
          .reverse()
      ) : (
        <h2>Список задач пуст</h2>
      )}
    </div>
  );
};

export default TasksContainer;
