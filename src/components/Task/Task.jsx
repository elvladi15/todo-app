import React from "react";
import { ACTIONS } from "../Todo/Todo";
import "./Task.css";
export default function Task({ id, description, checked, dispatch }) {
  return (
    <div className={`task ${checked ? "checked" : null}`}>
      <div className="container">
        <p>{description}</p>
        <div className="bottom">
          <button
            className="btn--check"
            onClick={() => {
              dispatch({ type: ACTIONS.TOGGLE_TASK, payload: { id } });
            }}
          >
            {checked ? "Uncheck task" : "Check task"}
          </button>
          <button
            className="btn--delete"
            onClick={() => {
              dispatch({ type: ACTIONS.DELETE_TASK, payload: { id } });
            }}
          >
            Delete task
          </button>
        </div>
      </div>
    </div>
  );
}
