import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./Todolist.module.css";
import {FilterValuesType} from "./App";

type AddItemFormType = {
    callBack:(newTitle:string) =>void
}


export const AddItemForm = (props:AddItemFormType) => {

    let [title,setTitle] =useState<string>('')
    let [error, setError]=useState<string|null>('')


    const setTitleHandler =(event:ChangeEvent<HTMLInputElement>)=>{
        setError('')
        setTitle(event.currentTarget.value)}
    const addTaskHandler = () =>{
        if(title.trim()!==''){
            props.callBack(title.trim())
            setTitle('')
        }else {
            setError('Title is reqired')
        }
    }

    const addTaskOnKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && isAddBthDisabled && addTaskHandler()
    }
    const titleMaxLength = 10
    const isTitleLengthToLong:boolean=title.length<titleMaxLength
    const isAddBthDisabled:boolean = !title.length || isTitleLengthToLong
    let titleMaxLengthWaning= isAddBthDisabled
        ? <div style={{color:"red"}}>Title is too long</div>
        : null



    return (
        <div>
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
        </div>
    );
};

