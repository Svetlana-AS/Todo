import React, {ChangeEvent, useState} from 'react';

type PropsTypes = {
    oldTitle:string
    callBack:(updateTitle:string)=>void
}


export const EditableSpan = (props:PropsTypes) => {

    const [updateTitle,setUpdateTitle]=useState(props.oldTitle)

    const [edit,setEdit]=useState(false)
    const onDoubleClickHandler=() =>{
        setEdit(!edit)
        if(edit){
            addTask()
        }
    }



    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setUpdateTitle(event.currentTarget.value)}

    const addTask = () =>{
    props.callBack(updateTitle)
    }


    return (
        edit
           ? <input type = "text"
                    value={updateTitle}
                    onBlur={onDoubleClickHandler}
                    autoFocus
                    onChange={onChangeHandler}
            />
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>

    );
};

