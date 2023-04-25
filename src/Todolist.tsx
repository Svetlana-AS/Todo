import React, {ChangeEvent,KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
import styles from './Todolist.module.css'


type TodolistType =
    {
        title:string
        task:TaskType[]

        removeTask: (taskId:string) => void
        changeFilter:(nextFilter:FilterValuesType)=>void
        addTask:(title:string) =>void
        changeIsDone:(id:string,newIsDone:boolean)=>void
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
        props.changeIsDone(tID, newIsDone)
        // console.log(t.id)

    }


    const taskJSXElement:Array<JSX.Element> = props.task.map((t:TaskType):JSX.Element =>{




        return(
            <li key={t.id} className={t.isDone ? styles.isDone: ''}>
                <input type="checkbox" checked={t.isDone} onChange={(e)=>changeIsDoneHandler(t.id,e.currentTarget.checked)}/>
                <span>{t.title}</span>
                <button onClick={()=>props.removeTask(t.id)}>+</button>
            </li>
        )
    })

    const setTitleHandler =(event:ChangeEvent<HTMLInputElement>)=>{
        setError('')
        setTitle(event.currentTarget.value)}
    const addTaskHandler = () =>{
        if(title.trim()!==''){
            props.addTask(title.trim())
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
        props.changeFilter("all")
        setButtonName("all")
    };
    const onActiveClickHandler = () =>{
        props.changeFilter("active")
        setButtonName("active")
    };
    const onCompletedClickHandler = () =>{
        props.changeFilter("completed")
        setButtonName("completed")
    };

    return (
        <div className="App">
            <div className='todolist'>
                <h3>{props.title}</h3>
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


