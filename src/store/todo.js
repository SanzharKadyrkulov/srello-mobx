import { makeAutoObservable } from 'mobx';
import { API } from '../helpers/consts';

class Todo {
	todos = [];
	constructor() {
		makeAutoObservable(this);
	}
	addTodo(todo) {
		fetch(`${API}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
		})
			.then((response) => response.json())
			.then((json) => {
				this.todos.push(json);
			});
	}
	removeTodo(id) {
		fetch(`${API}/todos/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// this.todos = this.todos.filter((todo) => todo.id != id);
		this.fetchTodos();
	}
	completeTodo(t) {
		fetch(`${API}/todos/${t.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...t, completed: !t.completed }),
		});
		// this.todos = this.todos.map((todo) =>
		//   todo.id === id ? { ...todo, completed: !todo.completed } : todo
		// );
		this.fetchTodos();
	}
	fetchTodos() {
		fetch(`${API}/todos`)
			.then((response) => response.json())
			.then((json) => {
				this.todos = [...json];
			});
	}
}
export default new Todo();
