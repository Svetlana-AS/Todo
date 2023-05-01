import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

// "CRUD" - "Create, Read, Update, Delete" (Создание, Чтение, Обновление, Удаление).


export type FilterValuesType = "all" | "active" | "completed"

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


type TasksType={
    [key:string]:TaskType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolist, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


     const removeTodo =(todolistID:string) =>{
      setTodolists(todolist.filter(el=>el.id!==todolistID))
         delete tasks[todolistID]
     }



    const changeIsDone = (todolistID:string,newId: string, newIsDone: boolean) => {

        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===newId ? {...el,isDone: newIsDone} : el)})
        // setTasks(tasks.map(el => el.id === newId ? {...el, isDone: newIsDone} : el))
    }


    const removeTask = (todolistID:string,taskID: string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id!==taskID)})
        // setTasks(tasks.filter(t => t.id !== taskID))
    }

    const addTask = (todolistID:string,title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks,[todolistID]:[newTask,...tasks[todolistID]]})
        // setTasks([newTask, ...tasks])
    }

    // const [filter, setFilter] = useState<FilterValuesType>("all")


    // const getTasksForMe = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
    //     switch (filterValue) {
    //         case "active":
    //             return tasks.filter(t => t.isDone === true)
    //         case "completed":
    //             return tasks.filter(t => t.isDone === false)
    //         default:
    //             return tasks
    //     }
    // }

    // const tasksWhatIWantToSee = getTasksForMe(tasks, filter)

    function changeFilter(todolistID:string,valueFilter: "all" | "active" | "completed") {
        setTodolists(todolist.map(el=>el.id===todolistID ? {...el,filter:valueFilter} :el))
        // setFilter(value)
    }


    return (
        <div className="App">
            {todolist.map(el => {
                let tasksForTodoList = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodoList = tasks[el.id].filter(task => task.isDone === false);
                } else if (el.filter === "completed") {
                    tasksForTodoList = tasks[el.id].filter(task => task.isDone === true);
                }

                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeIsDone={changeIsDone}
                        filter={el.filter}
                        removeTodo={removeTodo}
                    />
                )
            })}
        </div>
    );
}

export default App;
