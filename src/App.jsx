import { useState } from "react";
import TodosContainer from "./components/todo-container";
import TodoItem from "./components/todo-item";
import handlers from "./handlers";
import * as API from "./endpoints";
import './App.css'

const initTodoData = (await API.getTodos()).todos;

function App() {
	const [todoData, setTodoData] = useState(initTodoData);
	const [addTodo, setAddTodo] = useState("");
	const handlersInstance = handlers(todoData, setTodoData);

  return (
    <>
			<div className="todo">
				<h1>Todo List</h1>
				<div className="todo__form">
					<input id="todo__input" type="text" value={addTodo} onChange={e => setAddTodo(e.target.value)} />
					<button id="todo__btn-add" onClick={e => handlersInstance.add(e, addTodo, setAddTodo)}>submit</button>
				</div>
			</div>

			<div id="todo__lists">
				<TodosContainer
					name="Pending Tasks"
					id="todo__pending"
				>
				{todoData.filter(todo => !todo.completed)
					.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
							handlers={handlersInstance}
						/>
					))}
				</TodosContainer>
				<TodosContainer
					name="Completed Tasks"
					id="todo__completed"
				>
				{todoData.filter(todo => todo.completed)
					.map(todo => (
						<TodoItem
							key={todo.id}
							todo={todo}
							handlers={handlersInstance}
						/>
					))}
				</TodosContainer>
			</div>
    </>
  )
}

export default App
