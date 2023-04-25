import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

// "CRUD" - "Create, Read, Update, Delete" (Создание, Чтение, Обновление, Удаление).




export type FilterValuesType = "all" | "active" | "completed"
function App() {
    const todoListTitle ='What to learn'

    const [tasks, setTasks]=useState([
        {id:v1(), title: "HTML&CSS", isDone: false},
        {id:v1(), title: "JS/ES6&TS", isDone: true},
        {id:v1(), title: "REACT/REDUX", isDone: false},
    ] )

    const changeIsDone=(newId:string,newIsDone:boolean)=>{
        setTasks(tasks.map(el=> el.id === newId ? {...el, isDone: newIsDone} :el))
    }


    const removeTask = (taskID:string) => {
        setTasks(tasks.filter(t =>t.id !== taskID))
    }

    const addTask = (title:string) => {
        const newTask:TaskType = {
            id:v1(),
            title: title,
            isDone:false
        }
        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")



    const getTasksForMe = (tasksList:Array<TaskType>,filterValue:FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t=>t.isDone === true)
            case "completed":
                return tasks.filter(t=>t.isDone === false)
            default:
                return tasks
        }
    }

    const tasksWhatIWantToSee=getTasksForMe(tasks,filter)

    function changeFilter (value:"all" | "active" | "completed"){
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title = {todoListTitle}
                      task={tasksWhatIWantToSee}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeIsDone={ changeIsDone}
            />

        </div>
    );
}

export default App;
