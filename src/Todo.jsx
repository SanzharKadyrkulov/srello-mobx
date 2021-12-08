import React, { useEffect, useState } from "react";
import todo from "./store/todo";
import { observer } from "mobx-react-lite";
const Todo = observer(() => {
  const [newTodo, setNewTodo] = useState({
    completed: false,
    title: "",
  });
  const handleInput = (e) => {
    let obj = {
      ...newTodo,
      [e.target.name]: e.target.value,
    };
    setNewTodo(obj);
    console.log(newTodo);
  };
  const handleAdd = (e, t) => {
    e.preventDefault();
    todo.addTodo(t);
    setNewTodo({
      completed: false,
      title: "",
    });
  };
  useEffect(() => {
    todo.fetchTodos();
  }, []);
  return (
    <div>
      <form onSubmit={(e) => handleAdd(e, newTodo)}>
        <input
          value={newTodo.title}
          type="text"
          name="title"
          onChange={(e) => handleInput(e)}
        />
        <button type="submit">add</button>
      </form>
      {todo.todos.map((t) => (
        <div
          style={t.completed ? { textDecoration: "line-through" } : {}}
          className="t"
          key={t.id}
        >
          <input
            type="checkbox"
            checked={t.completed}
            onChange={() => todo.completeTodo(t)}
          />
          {t.title}
          <button onClick={() => todo.removeTodo(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
});

export default Todo;
