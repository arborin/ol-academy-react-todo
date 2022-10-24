import React, { useState } from 'react';
import { Clipboard2Plus, Trash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)




function Todo() {
    
    const [inputTask, setInputTask] = useState('');
    const [todoTasks, setTodoTasks] = useState([]);
    
    
    const showAllert = (title, message, status) => {
        MySwal.fire({
            title: <strong>{title}</strong>,
            html: <i>{message}</i>,
            icon: status
        })
    }
    
    
    
    const addTask = () =>{
         
        if(inputTask !== ''){
            let task = {title: inputTask, status: 'active'}
            todoTasks.push(task);
            
            setTodoTasks(todoTasks);
            setInputTask('');
            
            showAllert("Good Job!", "Task added!", "success");
        }else{
            showAllert("Error!", "Task is empty", "error");
        }
    }
       
    
    const inputTaskNameHandler = (e) => {
        setInputTask(e.target.value)
    }
    
    
    const deleteAllTasks = () => {
        setTodoTasks([]);
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
                    <li role="presentation" key="active" className="nav-item active-task"><button className="nav-link">Done</button></li>
                    <li role="presentation" kay="complated" className="nav-item completed-task"><button onClick={deleteAllTasks} className="nav-link">Delete All</button></li>
                </ul>
                
                <div className="todo-list">
                    
                    { 
                        todoTasks.map((task, id) => {
                            console.log(task);
                            return (
                                    <div key={id} className="todo-item">
                                        <div className="checker"><span className=""><input type="checkbox" /></span></div>
                                            <span>{task.title}</span>
                                        <button className="btn float-end"><Trash className="text-danger pull-end" /></button>
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