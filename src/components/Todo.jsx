import React, { useState, useMemo, useEffect } from "react";
import { Clipboard2Plus } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Menu from "./Menu";
import TodoList from "./TodoList";

const MySwal = withReactContent(Swal);

function Todo() {
    const [allTasks, setAllTasks] = useState([]); // for saving all tasks
    const [inputTask, setInputTask] = useState(""); // input field task
    // const [filterTasks, setFilterTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(false);
    const [status, setStatus] = useState("");

    // useEffect(() => {
    //     if (status === "done") {
    //         setFilterTasks(
    //             allTasks.filter((task) => {
    //                 return task.status === "done";
    //             })
    //         );
    //     } else {
    //         setFilterTasks(allTasks);
    //     }
    // }, [allTasks, status]);

    const showAllert = (title, message, status) => {
        MySwal.fire({
            title: <strong>{title}</strong>,
            html: <i>{message}</i>,
            icon: status,
        });
    };

    const checkTask = () => {
        let status = false;
        allTasks.forEach((todo) => {
            if (todo.title === inputTask.trim()) {
                status = true;
            }
        });
        return status;
    };

    const addTask = () => {
        if (checkTask()) {
            setInputTask("");
            showAllert("Error!", "Task already exists", "error");
            return;
        }

        if (inputTask.trim() !== "") {
            let id = 0;
            if (allTasks.length > 0) {
                id = allTasks[allTasks.length - 1].id + 1;
            }
            // If task is edeted
            if (editTaskId) {
                allTasks.map((todo) => {
                    if (todo.id === editTaskId) {
                        todo.title = inputTask;
                    }
                    setEditTaskId(false);
                    return todo;
                });
            } else {
                let task = {
                    id: id,
                    title: inputTask.trim(),
                    status: "active",
                };
                setAllTasks([...allTasks, task]);
            }

            setInputTask("");
            setStatus("");
            // showAllert("Good Job!", "Task added!", "success");
        } else {
            showAllert("Error!", "Task is empty", "error");
        }
    };

    const inputTaskNameHandler = (e) => {
        setInputTask(e.target.value);
    };

    const deleteTask = (task_id) => {
        showAllert("Task will delete...", "Are you sure?", "warning");
        setAllTasks(
            allTasks.filter((todo, id) => {
                return todo.id !== task_id;
            })
        );
        console.log(allTasks);
    };

    const doneTask = (task_id) => {
        // showAllert("Task will done...", "Are you sure?", "warning");
        let newTasks = allTasks.map((todo) => {
            if (todo.id === task_id) {
                if (todo.status === "done") {
                    todo.status = "active";
                } else {
                    todo.status = "done";
                }
            }
            return todo;
        });
        setAllTasks(newTasks);
    };

    const deleteAllTasks = () => {
        // showAllert("All tasks will be delete...", "Are you sure?", "warning");
        setStatus("");
        setAllTasks([]);
    };

    const showAllTasks = () => {
        setInputTask("");
        setStatus("");
        console.log("ALL");
    };

    const showDoneTasks = () => {
        setInputTask("");
        console.log("DONE");
        setStatus("done");
    };

    const editTask = (taskId) => {
        setEditTaskId(taskId);
        setInputTask(allTasks[taskId].title);
        console.log("EDIT TASK ID: " + taskId);
    };

    console.log("render");

    return (
        <div className="card card-white">
            <div className="card-body">
                <div className="card-title">
                    <h3 className="mb-5">My Task Manager</h3>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={inputTask}
                        onChange={inputTaskNameHandler}
                        className="form-control"
                        placeholder="Add New Task"
                        aria-label="Add New Task"
                        aria-describedby="button-addon2"
                    />
                    <button
                        onClick={addTask}
                        className="btn btn-warning"
                        type="button"
                        id="button-addon2"
                    >
                        <Clipboard2Plus />
                    </button>
                </div>

                <Menu
                    showAllTasks={showAllTasks}
                    showDoneTasks={showDoneTasks}
                    deleteAllTasks={deleteAllTasks}
                />

                <TodoList
                    filterTasks={allTasks}
                    status={status}
                    editTask={editTask}
                    doneTask={doneTask}
                    deleteTask={deleteTask}
                />
            </div>
        </div>
    );
}
export default Todo;
