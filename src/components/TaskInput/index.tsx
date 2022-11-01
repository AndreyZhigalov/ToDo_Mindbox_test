import React from 'react';

const TaskInput: React.FC<any> = ({ setTaskStorage }) => {
  const taskInputRef = React.useRef<HTMLInputElement>(null);
  const [taskInputValue, setTaskInputValue] = React.useState<string>('');
  const setTask = (taskValue: string) => {
    if (taskValue.length > 0) {
      let getStorage = JSON.parse(localStorage.getItem('taskStorage') as string);
      getStorage.push({ taskID: getStorage.length + 1, task: taskValue, isDone: false });
      setTaskStorage(getStorage);
      localStorage.setItem('taskStorage', JSON.stringify(getStorage));
      setTaskInputValue('');
    }
  };
  const updateNewTaskValue = () => {
    return taskInputRef.current?.value
      ? setTaskInputValue(taskInputRef.current.value)
      : setTaskInputValue('');
  };
  return (
    <div className="input_container">
      <img
        src="img/arrow_down.svg"
        className="arrowButton"
        onClick={() => setTask(taskInputValue)}
        alt={'Добавить'}
      />
      <input
        ref={taskInputRef}
        value={taskInputValue}
        onChange={updateNewTaskValue}
        className={'task_input'}
        type={'text'}
        placeholder={'Что планируете сделать?'}
      />
    </div>
  );
};

export default TaskInput;
