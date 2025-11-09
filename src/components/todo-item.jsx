import { useEffect, useRef, useState } from "react";

function TodoText({todo, editMode, setTitle, inputRef}) {
	if (editMode) {
		return (
			<input 
				ref={inputRef}
				className="todo__inp-edit todo__title" 
				type="text" 
				value={todo} 
				onChange={ e => {
					setTitle(e.target.value);
				}} 
			/>
		);
  } else {
		return <span className="todo__title">{todo}</span>;
	}
}

export default function TodoItem({todo, handlers}) {
	const [editMode, setEditMode] = useState(false);
	const [editTodo, setEditTitle] = useState(todo.todo);
	const [isComplete, setIsComplete] = useState(todo.completed);
	const inputRef = useRef(null);
	useEffect(() => {
		if (editMode) {
			inputRef.current?.focus()
		}
	}, [editMode])


	if (isComplete) {
		return (
			<div className="todo__item">
				<button 
					className="todo__btn-mark" 
					disabled={editMode}
					onClick={e =>  {
						handlers.mark(e, todo.id, !isComplete, () => setIsComplete(!isComplete));
					}}
				>
					Uncomplete
				</button>
				<TodoText todo={editTodo} editMode={editMode} setTitle={setEditTitle} inputRef={inputRef} />
				<div>
					<button className="todo__btn-edit" onClick={e => {
						setEditMode(c => !c);
						handlers.edit(e, todo.id, editMode, editTodo);
					}}>{editMode ? "Save" : "Edit"}</button>
					<button 
						className="todo__btn-delete" 
						disabled={editMode}
						onClick={e => handlers.del(e, todo.id)}
					>
						Delete
					</button>
				</div>
			</div>
		)
	} else {
		return (
			<div className="todo__item">
				<div>
					<button 
						className="todo__btn-delete" 
						disabled={editMode}
						onClick={e => handlers.del(e, todo.id)}
					>
						Delete
					</button>
					<button className="todo__btn-edit" onClick={e => {
						setEditMode(c => !c);
						handlers.edit(e, todo.id, editMode, editTodo);
					}}>{editMode ? "Save" : "Edit"}</button>
				</div>
				<TodoText todo={editTodo} editMode={editMode} setTitle={setEditTitle} inputRef={inputRef} />
				<button 
					className="todo__btn-mark" 
					disabled={editMode}
					onClick={e =>  {
						handlers.mark(e, todo.id, !isComplete, () => setIsComplete(!isComplete));
					}}
				>
					Uncomplete
				</button>
			</div>
		)
	}
}
