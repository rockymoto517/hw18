import * as API from "./endpoints";

/* 
 * dummyjson seems to constantly give the same
 * id? so we need to find a way to make it unique
 */
let idCount = 0;

/* 
 * HTTP Request handler singleton
 * Technically the 'controller'
 *
 * NOTE: If a custom added todo is modified, the response becomes:
 * { message: "Todo with id '{id}' not found" }
 * Solution: Look out for this particular message
 * If found, ignore the response and update locally
 */
export default function handlers(todos, setTodos) {
	/*
	 * DELETE returns the body
	 * { isDeleted: <bool>, deletedOn: <string> }
	 */
	const del = (event, id) => {
		event.stopPropagation();
		API.deleteTodo(id).then(res => {
			if (res.isDeleted) {
				setTodos(todos.filter(e => e.id !== id));
			} else if (res.message === `Todo with id '${id}' not found`) {
				setTodos(todos.filter(e => e.id !== id));
			}
		})
	}

	/*
	 * Update snapshot using a callback so I can 
	 * move the todo before changing how it's rendered
	 */
	const mark = (event, id, completed, clbk) => {
		event.stopPropagation();
		API.updateTodo(id, `{"completed": ${completed}}`).then(res => {
			if (clbk !== undefined) {
				clbk();
			}

			let val = res.completed;
			if (res.message === `Todo with id '${id}' not found`) {
				val = completed;
			}

			setTodos( 
				todos.map(todo => {
					if (todo.id === id) todo.completed = val;
					return todo;
			}))
		})
	}

	const edit = (event, id, editMode, todo) => {
		event.stopPropagation();
		if (editMode) {
			API.updateTodo(id, `{"todo": "${todo}"}`).then(res => {
				let val = res.todo;
				if (res.message === `Todo with id '${id}' not found`) {
					val = todo;
				}
				
				setTodos( 
					todos.map(todo => {
						if (todo.id === id) todo.todo = val;
						return todo;
					}));
				}
			)
		}
	}

	const add = (event, todo, setInput) => {
		event.stopPropagation();
		API.createTodo(todo).then(res => {
			console.log(idCount);
			setTodos([...todos, {
				...res,
				id: res.id + idCount,
			}]);
			idCount++;
			setInput("");
		})
	}

	return {
		del,
		mark,
		edit,
		add,
	}
}
