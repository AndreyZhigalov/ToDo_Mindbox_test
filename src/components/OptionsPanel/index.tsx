import React from 'react';
import { TaskItem } from '../../types/Global';

const OptionsPanel: React.FC<any> = ({ setTaskStorage, taskStorage }) => {
  const [filterType, setFilterType] = React.useState<string>('all');

  const taskListFilter = (type: string) => {
    setFilterType(type);
    let tasks = JSON.parse(localStorage.getItem('taskStorage') as string);
    if (type === 'all') {
      return setTaskStorage(tasks);
    } else if (type === 'active') {
      return setTaskStorage(tasks.filter((item: TaskItem) => !item.isDone));
    } else if (type === 'completed') {
      return setTaskStorage(tasks.filter((item: TaskItem) => item.isDone));
    }
  };

  const clearCompletedTasks = () => {
    let getStorage = taskStorage
      ?.filter((item: TaskItem) => item.isDone === false)
      .map((item: TaskItem, index: number) => {
        return { ...item, taskID: index };
      });
    setTaskStorage(getStorage);
    localStorage.setItem('taskStorage', JSON.stringify(getStorage));
  };

  return (
    <>
      <div className={'options'}>
        <p>{`Кол-во заданий: ${taskStorage?.length}`}</p>
        <div>
          <button
            onClick={() => taskListFilter('all')}
            className={filterType === 'all' ? 'filterButton active' : 'filterButton'}>
            Все
          </button>
          <button
            onClick={() => taskListFilter('active')}
            className={filterType === 'active' ? 'filterButton active' : 'filterButton'}>
            Активные
          </button>
          <button
            onClick={() => taskListFilter('completed')}
            className={filterType === 'completed' ? 'filterButton active' : 'filterButton'}>
            Завершённые
          </button>
        </div>
        <button className={'filterButton'} onClick={clearCompletedTasks}>
          Отчистить завершённые
        </button>
      </div>
      <div className={'cardBoard'} />
      <div className={'cardBoard2'} />
    </>
  );
};

export default OptionsPanel;
