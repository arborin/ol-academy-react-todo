import React, { useEffect, useState } from "react";
import {
    Clipboard2Plus,
    Trash,
    Pencil,
    Check2Square,
    Square,
} from "react-bootstrap-icons";

function TodoList(props) {
    const { filterTasks, status, deleteTask, doneTask, editTask } = props;

    return (
        <div className="todo-list">
            {filterTasks.map((task) => {
                let style = {};
                if (task.status !== status && status !== "") {
                    return <></>;
                }

                if (task.status === "done") {
                    style = { backgroundColor: "#d3ffd3" };
                }

                return (
                    <div key={task.id} style={style} className="todo-item">
                        <span>
                            {task.status == "done" ? (
                                <Check2Square
                                    className="text-success"
                                    onClick={() => doneTask(task.id)}
                                />
                            ) : (
                                <Square
                                    className="text-success"
                                    onClick={() => doneTask(task.id)}
                                />
                            )}
                            <span style={{ marginLeft: "10px" }}>
                                {task.title}
                            </span>
                        </span>

                        <div
                            className="btn-group float-end"
                            role="group"
                            aria-label="Basic example"
                        >
                            <button
                                type="button"
                                className="btn btn-warning btn-sm"
                                onClick={() => editTask(task.id)}
                            >
                                <Pencil className="pull-end" />
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteTask(task.id)}
                            >
                                <Trash className="pull-end" />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TodoList;
