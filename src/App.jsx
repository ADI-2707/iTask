import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";


function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString !== null
    ) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])


  const saveToLocalStorage = (items) => {
    localStorage.setItem("todos", JSON.stringify(items));
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLocalStorage([...todos, { id: uuidv4(), todo, isCompleted: false }]);
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[86.5vh] md:w-1/2">
        <h1 className='font-bold text-2xl text-center text-violet-900'>iTask - Manage your todos at one place</h1>
        <div className="addTodo m-5 flex flex-col gap-1">
          <div className="flex justify-center">
            <h2 className='font-semibold text-lg text-violet-500'>Add a Todo</h2>
          </div>

          <input placeholder='Add a todo'
          onChange={handleChange} 
          onKeyDown={(e) => {
            if (e.key === 'Enter' && todo.length > 3) {
              handleAdd();
            }
          }} value={todo} type="text" className='bg-white w-full border-1 rounded-lg px-3 py-1.5' />
          <div className='flex justify-center'>
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-700 hover:bg-violet-900  hover:scale-105 cursor-pointer text-white disabled:bg-violet-500 rounded-md px-4 py-1 m-4 text-sm w-1/6' title='Save the new todo'>Save</button>
          </div>
        </div>

        <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> Show Finished

        <h2 className='font-bold text-lg mx-4'>Your Todos</h2>
        <div className="todos">
          <AnimatePresence>

          {todos.length === 0 && <div className='mx-4 text-gray-400'>No Todos To Display </div>}

          {todos.map(item => {

            return (showFinished || !item.isCompleted) && 
            <motion.div key={item.id} className="todo flex w-full my-3 justify-between"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >

              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" className='mx-5' />

                <div className={`text ${item.isCompleted ? "line-through" : ""}`}>{item.todo}</div>
              </div>

              <div className="button flex h-full">

                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 hover:scale-105 hover:bg-violet-900 text-white rounded-md px-4 py-1 mx-2 text-sm cursor-pointer' title='Edit Todo'><FaEdit /></button>

                <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-700 hover:scale-105 hover:bg-violet-900 text-white rounded-md px-4 py-1 mx-2 text-sm cursor-pointer' title='Delete Todo'><MdDeleteSweep /></button>

              </div>
            </motion.div>
          })}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default App