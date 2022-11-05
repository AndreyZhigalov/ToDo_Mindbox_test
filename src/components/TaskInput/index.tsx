import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setInputValue, clearInput } from '../../redux/slices/inputSlice';
import { setTask } from '../../redux/slices/tasksSlice';

const TaskInput: React.FC = () => {
  const inputValue = useAppSelector((state) => state.input.value);
  const dispatch = useAppDispatch();
  const taskInputRef = React.useRef<HTMLInputElement>(null);

  const updateNewTaskValue = () => {
    return taskInputRef.current?.value
      ? dispatch(setInputValue(taskInputRef.current.value))
      : dispatch(clearInput());
  };

  const addNewTask = () => {
    dispatch(setTask(inputValue));
    dispatch(clearInput());
  };

  return (
    <div className="input_container">
      <img src="img/arrow_down.svg" className="arrowButton" onClick={addNewTask} alt={'Добавить'} />
      <input
        ref={taskInputRef}
        value={inputValue}
        onChange={updateNewTaskValue}
        className={'task_input'}
        type={'text'}
        placeholder={'Что планируете сделать?'}
      />
      {inputValue && (
        <span className={'clearInput'} title="отчистить" onClick={() => dispatch(clearInput())}>
          &#9587;
        </span>
      )}
    </div>
  );
};

export default TaskInput;
