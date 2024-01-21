import "./App.css"
import { ToastContainer } from 'react-toastify';
import { TodoList } from './components/TodoLists/TodoList'
import 'react-toastify/dist/ReactToastify.css';
function App() {


  return (
    <>
      <div className="App">
        <TodoList />
        <ToastContainer />
      </div>
    </>
  )
}

export default App
