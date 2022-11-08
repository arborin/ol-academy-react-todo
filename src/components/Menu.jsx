import React from "react";

function Menu(props) {
    const { showAllTasks, showDoneTasks, deleteAllTasks } = props;

    return (
        <div>
            <ul className="nav nav-pills todo-nav">
                <li
                    role="presentation"
                    key="all"
                    className="nav-item all-task active"
                >
                    <button onClick={showAllTasks} className="nav-link">
                        All
                    </button>
                </li>
                <li
                    role="presentation"
                    key="active"
                    className="nav-item active-task"
                >
                    <button onClick={showDoneTasks} className="nav-link">
                        Done
                    </button>
                </li>
                <li
                    role="presentation"
                    kay="complated"
                    className="nav-item completed-task"
                >
                    <button onClick={deleteAllTasks} className="nav-link">
                        Delete All
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Menu;
