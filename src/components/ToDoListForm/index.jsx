import React, { useState } from "react";
import { Button, Input } from "antd";
import './style.scss';
const ToDoListForm = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const handleNewTaskChange = (e) => {
        setNewTask(e.target.value);
    };

    const addNewTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), completed: false, text: newTask }])
            setNewTask('');
            setAlertMessage('Task added successfuly!')
            setTimeout(() => {
                setAlertMessage('');
            }, 2000);
        }
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setAlertMessage('Task deleted successfuly!')
        setTimeout(() => {
            setAlertMessage('');
        }, 2000);
    }

    const toggleCompletedTask = (id) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === id) {
                    setAlertMessage('your task is completed!')
                    setTimeout(() => {
                        setAlertMessage('');
                    }, 2000);
                    return { ...task, completed: !task.completed };
                }
                return task;
            })
        );
    }
    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            <div className="todolist-form">
                <Input
                    type="text"
                    className="todolist-field"
                    value={newTask}
                    onChange={handleNewTaskChange}
                    placeholder="Enter a new task"
                />
                <Button type="primary" onClick={addNewTask}>Add Task</Button>
            </div>
            {alertMessage && <div className="alert">{alertMessage}</div>}
            <div className="todolist-table">
                <table>
                    <tr>
                        <th>task completion</th>
                        <th>Task Name</th>
                        <th>Delete Task</th>
                    </tr>
                    {
                        tasks.length === 0 ? (
                            <div className="table_no_record"><p>No record found</p></div>
                        ) : (
                            tasks.map((task) => (
                                <>
                                    <tr>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => toggleCompletedTask(task.id)}
                                                allowClear
                                            />
                                        </td>
                                        <td>
                                            {task.text}
                                        </td>
                                        <td>
                                            <Button type="primary" onClick={() => deleteTask(task.id)}>Delete</Button>
                                        </td>
                                    </tr>

                                </>
                            ))
                        )
                    }
                </table>

            </div>
        </div>
    )
}
export default ToDoListForm;