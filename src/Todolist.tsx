import React, {ChangeEvent,KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodolistType =
    {
        todolistID:string
        title:string
        tasks:TaskType[]

        removeTask: (todolistID:string,taskId:string) => void
        changeFilter:(todolistID:string,nextFilter:FilterValuesType)=>void

        filter:FilterValuesType
        addTask:(todolistID:string,title:string) =>void
        changeIsDone:(todolistID:string,id:string,newIsDone:boolean)=>void
        removeTodo:(todolistID:string)=>void
        updateTask:(todolistId:string,taskId:string,updateTitle:string)=>void
        updateTodolistTitle:(todolistId:string,updateTitle:string)=>void
    }

export type TaskType = {
    id:string
    title:string
    isDone:boolean

}



export const Todolist:FC<TodolistType> = (props) => {

    // let [title,setTitle] =useState<string>('')
    // let [error, setError]=useState<string|null>('')
    let [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const changeIsDoneHandler =(tID:string,newIsDone:boolean) =>{
        props.changeIsDone(props.todolistID,tID, newIsDone)
        // console.log(t.id)

    }
    const updateTaskHandler=(taskID:string,updateTitle:string)=>{
        props.updateTask(props.todolistID,taskID,updateTitle)
    }



    const taskJSXElement:Array<JSX.Element> = props.tasks.map((t:TaskType):JSX.Element =>{

        // const updateTaskHandler=(updateTitle:string)=>{
        //     props.updateTask(props.todolistID, t.id,updateTitle)
        // }



        return(
            <li key={t.id} className={t.isDone ? styles.isDone: ''}>
                <input type="checkbox" checked={t.isDone} onChange={(e)=>changeIsDoneHandler(t.id,e.currentTarget.checked)}/>
                <EditableSpan oldTitle={t.title} callBack={(updateTitle)=>updateTaskHandler(t.id,updateTitle)}/>
                <button onClick={()=>props.removeTask(props.todolistID,t.id)}>+</button>
            </li>
        )
    })


    const onAllClickHandler = () =>{
        props.changeFilter(props.todolistID,"all")
        setButtonName("all")
    };
    const onActiveClickHandler = () =>{
        props.changeFilter(props.todolistID,"active")
        setButtonName("active")
    };
    const onCompletedClickHandler = () =>{
        props.changeFilter(props.todolistID,"completed")
        setButtonName("completed")
    };

    const removeTodoHandler =() =>{
    props.removeTodo(props.todolistID)
    }

    const addTaskHandler =(newTitle:string) =>{
        props.addTask(props.todolistID,newTitle)
    }


    const updateTodolistTitleHandler=(updateTitle:string)=>{
        props.updateTodolistTitle(props.todolistID,updateTitle)
    }



    return (
        <div>
                <h3>
                    {/*{props.title}*/}
                    <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler}/>
                    <button onClick={removeTodoHandler}>х</button>
                </h3>
                  <AddItemForm  callBack={addTaskHandler}/>

                <ul>
                    {taskJSXElement}
                </ul>
                <div>
                    <button className={buttonName==='all'? styles.activeFilter: ''} onClick={onAllClickHandler}>All</button>
                    <button className={buttonName==='active'? styles.activeFilter: ''} onClick={onActiveClickHandler}>Active</button>
                    <button className={buttonName==='completed'? styles.activeFilter: ''} onClick={onCompletedClickHandler}>Completed</button>
                </div>
        </div>
    );
}


