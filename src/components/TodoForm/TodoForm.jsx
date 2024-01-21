import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import "./TodoForm.css"
function TodoForm({todoList , setTodoList,setTodo,todo}) {
    


    const handleAdd = (e)=>{
            e.preventDefault();
            if(!todo){
                toast.error("Enter the TODO",{position:"top-center"})
            }
            if(todo.trim() === ''){
                return;
            }
            addTodo();
        }

       //add the item to the list
       const addTodo = async()=>{
        
        const newTodo ={
            title:todo,
            completed:false,
            
        }
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                method: 'POST',
                body: JSON.stringify(newTodo),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            })
            
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }

            const data = await response.json()
            console.log(data);
            setTodoList([data,...todoList])
            setTodo("")
            
            toast.success("Added successfully!",{position:"top-center"})

        } catch (error) {
            toast.error(error.message,{position:"top-center"})
          

        }
    }

  return (
    <>
    <main>
    
        <div className='todo-form-container'>
            <form onSubmit={handleAdd}>
                <input type='text' value={todo} placeholder='Add a Todo' onChange={(e)=> setTodo(e.target.value)} className='todo-form-input'/>
                <button className='todo-form-button'>Add Todo</button>
            </form>
        </div>
        
    </main>
    
    </>
  )
}

export default TodoForm