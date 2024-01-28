import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';
import { toast } from 'react-toastify';
import { useState } from 'react';
import "./Todos.css"
const Todos = ({todoList , setTodoList}) => {

  const [editId , setEditId] = useState(null);
  const [editTitle , setEditTitle] = useState('');
  //deleting a todo
  const handleDelete = async(id)=>{
    
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      })
      if(!response.ok){
        throw new Error("Couldn't delete todo")
      }

      const updatedTodoList = todoList.filter((todo)=> todo.id !== id)
      setTodoList(updatedTodoList);
      toast.success("Deleted successfully!",{position:"top-center"})
    } catch (error) {
      toast.error(error.message,{position:"top-center"})
    }
  }

  //Completion Toogle
  const handleEdit = async(id,title)=>{
    setEditId(id);
    setEditTitle(title)
    console.log("edit id",editId);
  }

  const handleUpdate = async(id)=>{
      try {
  
        const updatedTodoList = todoList.map((todo)=> todo.id === id ? {...todo ,title:editTitle } : todo)
  
        setTodoList(updatedTodoList);
        setEditId(null);
        setEditTitle("");
        toast.success("Edited successfully!",{position:"top-center"})
        console.log(updatedTodoList);
      } catch (error) {
        toast.error(error.message,{position:"top-center"})
      }

  }

  const handleCompletion = (id)=>{
    const updatedTodoList = todoList.map((todo)=>(
      todo.id === id ? {...todo , completed : !todo.completed} : todo
    ))
    setTodoList(updatedTodoList)
    

  }



  return (
   <>
   <ul >
   {todoList.map((todo,index)=>(
      <li key={index} className='todos-lists'>
        {editId === todo.id ? (
          <>
          <input type='text'
          className='todo-update-input' value={editTitle}  onChange={(e)=> setEditTitle(e.target.value)} placeholder='Add Todo'/>
          <button 
          className='todo-update-button'
          onClick={()=>handleUpdate(todo.id)}>Update Todo</button>
          </>
          
        ) :
        (
          <>
          <div className={` ${todo.completed ? "todo-title-completed" : "todos-title"}`}>{todo.title}</div>
          <div className='todo-buttons'>
            <div><button className='delete' onClick={()=> handleDelete(todo.id)}><DeleteIcon /></button></div>
            <div><button className='edit' onClick={()=>handleEdit(todo.id , todo.title)}><EditIcon /></button></div>
            <div><button className="complete" onClick={()=>handleCompletion(todo.id)}> {todo.completed ? <CheckIcon /> : <Brightness1OutlinedIcon />}</button></div>
          </div>
         
        </>
        )
        }
        
      </li>
      ))}
   </ul>
   
   </>
  )
}

export default Todos