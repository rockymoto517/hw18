const baseURL = "https://dummyjson.com/todos";
const headers = { "Content-Type": "application/json" };

export const getTodos = () =>
	fetch(baseURL)
	.then((res) => res.json());

export const createTodo = (text) => fetch(`${baseURL}/add`, {
	headers,
	method: "POST",
	body: JSON.stringify({
		todo: text,
		completed: false,
		userId: 1,
	}),
}).then((res) => res.json());

export const deleteTodo = (id) => fetch(`${baseURL}/${id}`, {
	headers,
	method: "DELETE",
}).then((res) => res.json());

export const updateTodo = (id, body) =>
	fetch(`${baseURL}/${id}`, {
		headers,
		method: "PATCH",
		body,
	})
	.then((res) => res.json());

