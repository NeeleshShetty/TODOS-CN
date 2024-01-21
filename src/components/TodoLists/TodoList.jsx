import { useEffect, useState } from 'react'
import TodoForm from '../TodoForm/TodoForm'
import Todos from '../Todos/Todos'
import "./TodoList.css"
export const TodoList = () => {
    const [todoList,setTodoList] = useState([]);
    const [todo,setTodo] = useState("")
    const [loading,setLoading] = useState(false)

    //fetch the todos
    useEffect(() => {
        try {
            async function fetchTodos (){
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            const data = await response.json();
            setTodoList(data)
            
            }

            fetchTodos();
        } catch (error) {
            console.log("Error in Fetching" ,error.message )
        }
      
    }, [])

    
    
    
  return ( 
    <>
    {loading ? "LOADING...." :(
      <>
      <div className='todoList-container'>
        <h1>Todo Lists</h1>
        <div className='todoList-form'>
          <TodoForm todoList={todoList} setTodoList={setTodoList} todo={todo} setTodo={setTodo} loading={loading} setLoading={setLoading}/>
          </div>
          <div className='todoList-todos'>
          <Todos todoList={todoList} setTodoList={setTodoList} loading={loading} setLoading={setLoading} />
        </div>
        
      </div>
      
      </>
    ) }
    
    </>
  )
}
