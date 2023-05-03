import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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


    const updateTodolistTitle=(todolistId:string,updateTitle:string)=>{
        setTodolists(todolist.map(el=>el.id===todolistId ? {...el,title:updateTitle} :el) )
    }
    const updateTask=(todolistId:string,taskId:string,updateTitle:string)=>{
        setTasks ({...tasks,[todolistId]:tasks[todolistId].map(el=>el.id===taskId ? {...el,title:updateTitle } : el)})

    }


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


    function changeFilter(todolistID:string,valueFilter: "all" | "active" | "completed") {
        setTodolists(todolist.map(el=>el.id===todolistID ? {...el,filter:valueFilter} :el))
        // setFilter(value)
    }

    const addTodolist = (newTitle: string) =>{
        const newTodolistID=v1()
        const newTodo:TodolistsType = {id: newTodolistID, title: newTitle, filter: 'all'}
        setTodolists([...todolist,newTodo])
        setTasks({...tasks, [newTodolistID]: [ {id: v1(), title: 'HTML&CSS', isDone: true}]})
    }


    return (
        <div className="App">
            <AddItemForm callBack={addTodolist} />

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
                        updateTask={updateTask}
                        updateTodolistTitle={updateTodolistTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
