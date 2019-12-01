import React, { useContext } from "react";
import { Context } from "./Context";

export default function TodoItem({ title, id, completed }) {
  let cls = ["todo"];
  let { rmTodo, toggleTodo } = useContext(Context);

  if (completed) {
    cls.push("completed");
  }
  return (
    <li className={cls.join(" ")}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id)}
        />
        <span>{title}</span>
        <i onClick={() => rmTodo(id)} className="material-icons red-text">
          delete
        </i>
      </label>
    </li>
  );
}
