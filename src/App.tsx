import React, {useState} from 'react';
import './App.css';

type TaskStorage = { taskID: number, task: string, isDone: boolean }[] | null;
type TaskItem = { taskID: number, task: string, isDone: boolean }

function App() {
    const taskInputRef = React.useRef<HTMLInputElement>(null)
    const [taskInputValue, setTaskInputValue] = React.useState<string>("")
    const [taskStorage, setTaskStorage] = React.useState<TaskStorage>()
    const [filterType, setFilterType] = useState<string>("all")

    React.useEffect(() => {
        if (localStorage.getItem("taskStorage")) {
            let getStorage = JSON.parse(localStorage.getItem("taskStorage") as string)
            setTaskStorage(getStorage)
        } else {
            localStorage.setItem("taskStorage", "[]")
            setTaskStorage([])
        }
    }, [])

    const setTask = (taskValue: string) => {
        if (taskValue.length > 0) {
            let getStorage = JSON.parse(localStorage.getItem("taskStorage") as string)
            getStorage.push({taskID: getStorage.length + 1, task: taskValue, isDone: false})
            setTaskStorage(getStorage)
            localStorage.setItem("taskStorage", JSON.stringify(getStorage))
            setTaskInputValue("")
        }
    }

    const updateNewTaskValue = () => {
        return taskInputRef.current?.value ? setTaskInputValue(taskInputRef.current.value) : setTaskInputValue("")
    }

    const changeTaskStatus = (id: number) => {
        let getStorage = taskStorage?.map((item: TaskItem) => item.taskID == id ? {
            ...item,
            isDone: !item.isDone
        } : item)
        setTaskStorage(getStorage)
        localStorage.setItem("taskStorage", JSON.stringify(getStorage))
    }

    const clearCompletedTasks = () => {
        let getStorage = taskStorage?.filter((item: TaskItem) => item.isDone == false)
            .map((item, index) => {
                return {...item, taskID: index}
            })
        setTaskStorage(getStorage)
        localStorage.setItem("taskStorage", JSON.stringify(getStorage))
    }

    const taskListFilter = (type: string) => {
        setFilterType(type)
        let tasks = JSON.parse(localStorage.getItem("taskStorage") as string)
        if (type == "all") {
            return setTaskStorage(tasks)
        } else if (type == "active") {
            return setTaskStorage(tasks.filter((item: TaskItem) => !item.isDone))
        } else if (type == "completed") {
            return setTaskStorage(tasks.filter((item: TaskItem) => item.isDone))
        }
    }

    return (
        <div className="App">
            <h1>todos</h1>
            <div className="wrapper">
                <div className="input_container">
                    <img src="../img/arrow_down.svg" className="arrowButton" onClick={() => setTask(taskInputValue)}/>
                    <input ref={taskInputRef}
                           value={taskInputValue}
                           onChange={updateNewTaskValue}
                           className={"task_input"}
                           type={"text"}
                           placeholder={"Что планируете сделать?"}/>
                </div>
                <div className={"tasks_container"}>
                    {taskStorage?.length ? taskStorage.map(({taskID, task, isDone}, index) =>
                        <label key={taskID} className={isDone ? "task_card strikethrough" : "task_card"}>
                            <input type={"radio"}
                                   checked={isDone}
                                   onClick={() => changeTaskStatus(taskID)}
                                   onChange={() => {
                                   }}/>{task}
                        </label>
                    ) : <h2>У вас нет запланированных задач</h2>}
                </div>
                <div className={"options"}>
                    <p>{`Кол-во заданий: ${taskStorage?.length}`}</p>
                    <div>
                        <button onClick={() => taskListFilter("all")}
                                className={filterType == "all" ? "filterButton active" : "filterButton"}>Все
                        </button>
                        <button onClick={() => taskListFilter("active")}
                                className={filterType == "active" ? "filterButton active" : "filterButton"}>Активные
                        </button>
                        <button onClick={() => taskListFilter("completed")}
                                className={filterType == "completed" ? "filterButton active" : "filterButton"}>Завершённые
                        </button>
                    </div>
                    <button className={"filterButton"} onClick={clearCompletedTasks}>Отчистить завершённые</button>
                </div>
                <div className={"cardBoard"}/>
                <div className={"cardBoard2"}/>
            </div>
        </div>
    );
}

export default App;
