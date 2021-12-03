import React, { useEffect ,useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {getTasks} from "../config/Redux/Actions/taskAction"
import * as tasksServices from "../services/tasksServices"
import { stat } from 'fs'


function Todos() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [filterText,setFilterText]= useState()
    const [tasks,setTasks] = useState([])
    const [newTask,setNewTask]=useState({description:"",completed:false})
    const [isLoading,setIsLoading] = useState(false)
    const token = localStorage.getItem("token")
    useEffect(() => {
     dispatch(getTasks())
    }, [])

    useEffect(() => {
      if(state?.tasks?.allTasks?.length != 0)
      { 
          setTasks(state.tasks.allTasks)
      }
    }, [state?.tasks?.allTasks.length])

function handleInput(e)
{
    setNewTask({...newTask,[e.target.name]:e.target.value})
    
}

    async function addNewTask()
    {
       
        try {
            setIsLoading(true)
            const response =  await tasksServices.addTask(newTask)
            dispatch(getTasks())
            setFilterText("all")
            const updatedTasks = [
                ...tasks,
                newTask
            ]
            setTasks(updatedTasks)
            setIsLoading(false)
            alert(response.message)
            setNewTask({description:"",completed:false})
        } catch (error) {
            setIsLoading(false)
            if(error.message)
            {
                return alert(error.message)
            }
            console.log(error)
        }
    }

    async function handleUpdate(task)
    {
       
        try {
            setIsLoading(true)
            const response =  await tasksServices.updateTask(task._id,{completed:!task.completed})
            setFilterText("all")
            dispatch(getTasks())
            const originalTasks = [...tasks]
            const updatedIndex = originalTasks.findIndex((tsk,index)=>{
                return tsk._id === task._id
            })
            originalTasks[updatedIndex].completed = !originalTasks[updatedIndex].completed 
            setTasks(originalTasks)
            setIsLoading(false)
            alert(response.message)
        } catch (error) {
            setIsLoading(false)
            if(error.message)
            {
                return alert(error.message)
            }
            console.log(error)
        }
    }

    async function handleDelete(task)
    {
       
        try {
            setIsLoading(true)
            const response =  await tasksServices.deleteTask(task._id)
            setFilterText("all")
            dispatch(getTasks())
            const originalTasks = [...tasks]
            const updatedIndex = originalTasks.findIndex((tsk,index)=>{
                return tsk._id === task._id
            })
           originalTasks.splice(updatedIndex,1)
            setTasks(originalTasks)
            setIsLoading(false)
            alert(response.message)
        } catch (error) {
            setIsLoading(false)
            if(error.message)
            {
                return alert(error.message)
            }
            console.log(error)
        }
    }

    function filterTasks(value)
    {  
       dispatch(getTasks(value))
        
    }

    useEffect(() => {
       filterTasks(filterText)
    }, [filterText])

    return (
        <div className="main">
            <div className="input_wrapper">
                <input name="description" disabled={isLoading} value={newTask.description} onChange={e=>handleInput(e)} type="text" placeholder="Add todo.." />
                <button onClick={addNewTask}>Add</button>
                <select disabled={isLoading || state.tasks.isLoading} value={filterText} onChange={e=>setFilterText(e.target.value)} style={{ marginLeft: "10px", textAlign: "center", border: "1px solid black", outline: "none" }}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="not completed">Not Completed</option>
                </select>
            </div>
            <div>
                {
                    (state?.tasks?.isLoading && state?.tasks?.allTasks?.length==0) ? 
                    <p className="msg"> Loading...</p> : ( !state?.tasks?.isLoading && state?.tasks?.allTasks?.length == 0 ) ?
                    <p className="msg"> No Tasks Added</p>   : state?.tasks?.allTasks?.map(task=>{
                      return  <div key={task._id} className="todo_style">
                        <div className="todo">
                            <input id={task._id} disabled={isLoading} checked = {task.completed} onChange={()=>handleUpdate(task)} type="checkbox" /> <label htmlFor={task._id}>{task.description}</label>
                        </div>
                        <div>
                            <button onClick={()=>handleDelete(task)}>Delete</button>
                        </div>
    
                    </div> 
                    })
                }
            
                

            </div>
        </div>
    )
}

export default Todos
