import { makeAutoObservable } from "mobx";

class Todo {
  todos = [];
  constructor() {
    makeAutoObservable(this);
  }
  addTodo(todo) {
    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((json) => {
        this.todos.push(json);
      });
  }
  removeTodo(id) {
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // this.todos = this.todos.filter((todo) => todo.id != id);
    this.fetchTodos();
  }
  completeTodo(t) {
    fetch(`http://localhost:8000/todos/${t.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...t, completed: !t.completed }),
    });
    // this.todos = this.todos.map((todo) =>
    //   todo.id === id ? { ...todo, completed: !todo.completed } : todo
    // );
    this.fetchTodos();
  }
  fetchTodos() {
    fetch("http://localhost:8000/todos")
      .then((response) => response.json())
      .then((json) => {
        this.todos = [...json];
      });
  }
}
export default new Todo();
