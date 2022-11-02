import React, { useState } from 'react';
import { Clipboard2Plus, Trash, Pencil, Check2Square } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)


let myTasks = [];

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
            myTasks = [...todoTasks];
            
            // Calculate next index
            if(myTasks.length > 0){
                id = myTasks[myTasks.length-1].id + 1;
            }
            
            
            // If task is edeted
            if(editTaskId){
                myTasks = myTasks.map((todo) => {
                    if(todo.id === editTaskId){
                        todo.title = inputTask;
                    }
                    
                    return todo;
                })
            }else{
                let task = {id: id, title: inputTask, status: 'active'}
                myTasks.push(task);
            }
               
            setTodoTasks(myTasks);
            
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
        showAllert("Task will delete...", "Are you sure?", "warning");
        setTodoTasks(todoTasks.filter((todo, id) => { return todo.id !== task_id}))
        console.log(todoTasks)
    }
    
    
    const doneTask = (task_id) => {
        showAllert("Task will done...", "Are you sure?", "warning");
        let newTasks = todoTasks.map((todo)=>{ 
            if(todo.id === task_id){
                todo.status = 'done'
            } 
            
            return todo;
        })   
        console.log("DONE TASK: " + task_id );    
        setTodoTasks(newTasks);
    }
    
    
    const deleteAllTasks = () => {
        setTodoTasks([]);
    }
    
    const showAllTasks = () => {
        setInputTask('');
         setTodoTasks(myTasks);
    }
    
    const showDoneTasks = () => {
        setInputTask('');
        setShowOnlyDone(!showOnlyDone)
        
        
        
        
        if(showDoneTasks){
            console.log("SHOW DONE TASKS:  " + showOnlyDone);
            let showTasks = myTasks.filter((task) => {return task.status === 'done'})
            setTodoTasks(showTasks);
        }else{
            console.log("SHOW ALL TASKS");
            setTodoTasks(myTasks);
        }
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
                    <li role="presentation" key="all" className="nav-item all-task active"><button  onClick={(showAllTasks)} className="nav-link">All</button></li>
                    <li role="presentation" key="active" className="nav-item active-task"><button onClick={(showDoneTasks)} className="nav-link">Done</button></li>
                    <li role="presentation" kay="complated" className="nav-item completed-task"><button onClick={deleteAllTasks} className="nav-link">Delete All</button></li>
                </ul>
                
                <div className="todo-list">
                    
                    {/* <RenderData/> */}
                    
                    {
                          
                            todoTasks.map( (task) => {
                                let style = {};    
                                if(task.status === 'done'){
                                    style = {backgroundColor: '#d3ffd3'}
                                    }
                                   
                                    return (
                                    
                                        <div key={task.id} style={style} className="todo-item">
                                            
                                                <span>{task.title}</span>
                                            <button className="btn float-end" onClick={() => deleteTask(task.id)}><Trash className="text-danger pull-end" /></button>
                                            <button className="btn float-end" onClick={() => doneTask(task.id)}><Check2Square className="text-success" /></button>
                                            
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





