import React, { useState } from 'react';
import { Clipboard2Plus, Trash, Pencil } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)




function Todo() {
    
    const [inputTask, setInputTask] = useState('');
    const [todoTasks, setTodoTasks] = useState([]);
    const [editTaskId, setEditTaskId ] = useState(false);
    
    const [showOnlyDone, setShowOnlyDone] = useState(false);
    
    
    const showAllert = (title, message, status) => {
        MySwal.fire({
            title: <strong>{title}</strong>,
            html: <i>{message}</i>,
            icon: status
        })
    }
    
    
    const checkTask = () => {
        let check = false;
        
        console.log(inputTask);
        
        todoTasks.forEach(todo => {
            if(todo.title===inputTask){
                check = true;
            }
        });
        
        return check;
    }
    
    
    const addTask = () =>{
       
        
        if(checkTask() === true){
            showAllert("Error!", "Task already exists", "error");
            return;
        }
        
        if(inputTask !== ''){
            let id = 0;
            let newTodoTasks = [...todoTasks];
            
            if(newTodoTasks.length > 0){
                id = newTodoTasks[newTodoTasks.length-1].id + 1;
            }
            
            
            
            
            if(editTaskId){
                newTodoTasks = newTodoTasks.map((todo) => {
                    if(todo.id === editTaskId){
                        todo.title = inputTask;
                    }
                    
                    return todo;
                })
            }else{
                let task = {id: id, title: inputTask, status: 'active'}
                newTodoTasks.push(task);
            }
               
            setTodoTasks(newTodoTasks);
            
            setInputTask('');
            setEditTaskId(false);
            
            
            
            showAllert("Good Job!", "Task added!", "success");
        }else{
            showAllert("Error!", "Task is empty", "error");
        }
    }
       
    
    const inputTaskNameHandler = (e) => {
        setInputTask(e.target.value)
    }
    
    
    const deleteTask = (task_id) => {
        setTodoTasks(todoTasks.filter((todo, id) => { return todo.id !== task_id}))
        console.log(todoTasks)
    }
    
    
    const doneTask = (task_id) => {
        todoTasks[task_id].status = (todoTasks[task_id].status === false) ? true : false;    
        console.log(todoTasks);    
        setTodoTasks(todoTasks);
    }
    
    
    const deleteAllTasks = () => {
        setTodoTasks([]);
    }
    
    
    const showDoneTasks = () => {
        setShowOnlyDone(!showOnlyDone)
        console.log(showOnlyDone)
    }
    
    const editTask = (taskId) =>{
        setEditTaskId(taskId);
        setInputTask(todoTasks[taskId].title);
        console.log("EDIT TASK ID: " + taskId)
    }
    
 
    
    
    

    

    return (
    
        <div className="card card-white">
            
            <div className="card-body">
                <div className="card-title">
                <h3 className='mb-5'>My Task Manager</h3>
                </div>
                <div className="input-group mb-3">
                    <input type="text" value={inputTask} onChange={inputTaskNameHandler} className="form-control" placeholder="Add New Task" aria-label="Add New Task" aria-describedby="button-addon2" />
                    <button onClick={addTask} className="btn btn-warning" type="button" id="button-addon2"><Clipboard2Plus /></button>
                </div>

                <ul className="nav nav-pills todo-nav">
                    <li role="presentation" key="all" className="nav-item all-task active"><button className="nav-link">All</button></li>
                    <li role="presentation" key="active" className="nav-item active-task"><button onClick={(showDoneTasks)} className="nav-link">Done</button></li>
                    <li role="presentation" kay="complated" className="nav-item completed-task"><button onClick={deleteAllTasks} className="nav-link">Delete All</button></li>
                </ul>
                
                <div className="todo-list">
                    
                    {/* <RenderData/> */}
                    
                    {
                       
                            
                            todoTasks.map( (task) => {
                            
                                return (
                                
                                    <div key={task.id} className="todo-item">
                                        <div className="checker"><span className=""><input type="checkbox" onChange={() => doneTask(task.id)} defaultChecked={ (task.status==='done') ? true: false}/></span></div>
                                            <span>{task.title}</span>
                                        <button className="btn float-end" onClick={() => deleteTask(task.id)}><Trash className="text-danger pull-end" /></button>
                                        <button className="btn float-end" onClick={() => editTask(task.id)}><Pencil className="text-primary pull-end" /></button>
                                        
                                        
                                    </div>
                                )
                            })
                        
                    }
                     
                </div>
            </div>
        </div>
    )
    

}
export default Todo





