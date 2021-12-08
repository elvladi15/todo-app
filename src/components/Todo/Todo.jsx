import React, { useState, useReducer } from "react";
import Task from "../Task/Task";
import "./Todo.css";
import emptyState from "../../images/empty-state-img.png";

export const ACTIONS = {
  ADD_TASK: "add-task",
  TOGGLE_TASK: "toggle-task",
  DELETE_TASK: "delete-task",
};
function reducer(tasks, { type, payload }) {
  if (type === ACTIONS.ADD_TASK) {
    const newTasks = [
      ...tasks,
      {
        id: Date.now().toString(),
        description: payload.description,
        checked: false,
      },
    ];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    return newTasks;
  } else if (type === ACTIONS.TOGGLE_TASK) {
    const newTasks = tasks.map((task) => {
      if (task.id === payload.id) {
        return {
          ...task,
          checked: !task.checked,
        };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    return newTasks;
  } else if (type === ACTIONS.DELETE_TASK) {
    const newTasks = tasks.filter((task) => task.id !== payload.id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    return newTasks;
  }
}
export default function Todo() {
  const [description, setTaskDescription] = useState("");
  const [tasks, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const handleCLick = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: { description },
    });
    setTaskDescription("");
  };
  return (
    <div className="todo">
      <div className="container">
        <form className="top" onSubmit={handleCLick}>
          <input
            type="text"
            placeholder="Enter task"
            value={description}
            required
            onChange={(e) => {
              setTaskDescription(e.target.value);
            }}
          />
          <button type="submit">Add task</button>
        </form>
        {tasks.length === 0 ? (
          <div className="no-elements">
            <div className="container">
              <div className="empty-state-img">
                <img src={emptyState} alt="" />
              </div>
              <label>
                There are no tasks created. You can start adding your tasks now!
              </label>
            </div>
          </div>
        ) : (
          <div className="tasks">
            {tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                description={task.description}
                checked={task.checked}
                dispatch={dispatch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
