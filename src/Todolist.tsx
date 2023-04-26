import React, {ChangeEvent,KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from './Todolist.module.css'


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
    }

export type TaskType = {
    id:string
    title:string
    isDone:boolean

}



export const Todolist:FC<TodolistType> = (props) => {

    let [title,setTitle] =useState<string>('')
    let [error, setError]=useState<string|null>('')
    let [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const changeIsDoneHandler =(tID:string,newIsDone:boolean) =>{
        props.changeIsDone(props.todolistID,tID, newIsDone)
        // console.log(t.id)

    }


    const taskJSXElement:Array<JSX.Element> = props.tasks.map((t:TaskType):JSX.Element =>{




        return(
            <li key={t.id} className={t.isDone ? styles.isDone: ''}>
                <input type="checkbox" checked={t.isDone} onChange={(e)=>changeIsDoneHandler(t.id,e.currentTarget.checked)}/>
                <span>{t.title}</span>
                <button onClick={()=>props.removeTask(props.todolistID,t.id)}>+</button>
            </li>
        )
    })

    const setTitleHandler =(event:ChangeEvent<HTMLInputElement>)=>{
        setError('')
        setTitle(event.currentTarget.value)}
    const addTaskHandler = () =>{
        if(title.trim()!==''){
            props.addTask(props.todolistID,title.trim())
            setTitle('')
        }else {
            setError('Title is reqired')
        }
    }

    const addTaskOnKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && isAddBthDisabled && addTaskHandler()

    const titleMaxLength =25
    const isTitleLengthToLong:boolean=title.length>titleMaxLength
    const isAddBthDisabled:boolean = !title.length || isTitleLengthToLong
    let titleMaxLengthWaning= isAddBthDisabled
    ? <div style={{color:"red"}}>Title is too long</div>
        : null

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


    return (
        <div className="App">
            <div className='todolist'>
                <h3>
                    {props.title}
                    <button onClick={removeTodoHandler}>х</button>
                </h3>

                <div>
                    <input value={title}
                           className={error ? styles.error : ''}
                           onChange={setTitleHandler}
                           onKeyPress={addTaskOnKeyPressHandler}
                    />
                    <button
                        // disabled={isAddBthDisabled}
                        onClick={addTaskHandler}
                    >+</button>
                    {titleMaxLengthWaning}
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <ul>
                    {taskJSXElement}
                </ul>
                <div>
                    <button className={buttonName==='all'? styles.activeFilter: ''} onClick={onAllClickHandler}>All</button>
                    <button className={buttonName==='active'? styles.activeFilter: ''} onClick={onActiveClickHandler}>Active</button>
                    <button className={buttonName==='completed'? styles.activeFilter: ''} onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
}


