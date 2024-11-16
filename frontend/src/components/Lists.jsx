import React from 'react'
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";


const Lists = ({text,updateMode,deleteTodo}) => {
  return (

      <div className="todo">
        <div className="text">
          {text}
        </div>
        <div className="icons">
    <BiEdit className='icon edit' onClick={updateMode} />
    <AiFillDelete className='icon delete' onClick={deleteTodo}/>
        </div>
      </div>
  )
}

export default Lists
