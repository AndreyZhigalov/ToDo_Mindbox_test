import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { clearCompletedTasks, setSortType, taskListSelector } from '../../redux/slices/tasksSlice';

const OptionsPanel: React.FC = () => {
  const { taskStorage, sortType } = useAppSelector(taskListSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={'options'}>
        <p>{`Кол-во заданий: ${taskStorage?.length}`}</p>
        <div>
          <button
            onClick={() => dispatch(setSortType('all'))}
            className={sortType === 'all' ? 'filterButton active' : 'filterButton'}>
            Все
          </button>
          <button
            onClick={() => dispatch(setSortType('active'))}
            className={sortType === 'active' ? 'filterButton active' : 'filterButton'}>
            Активные
          </button>
          <button
            onClick={() => dispatch(setSortType('completed'))}
            className={sortType === 'completed' ? 'filterButton active' : 'filterButton'}>
            Завершённые
          </button>
        </div>
        <button className={'filterButton'} onClick={() => dispatch(clearCompletedTasks())}>
          Отчистить завершённые
        </button>
      </div>
      <div className={'cardborder'} />
      <div className={'cardborder2'} />
    </>
  );
};

export default OptionsPanel;
