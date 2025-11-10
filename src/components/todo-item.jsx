import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, editTodo } from "../slices/todoSlice";

function TodoText({ todo, editMode, setTitle, inputRef }) {
  if (editMode) {
    return (
      <input
        ref={inputRef}
        className="todo__inp-edit todo__title"
        type="text"
        value={todo}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
    );
  } else {
    return <span className="todo__title">{todo}</span>;
  }
}

export default function TodoItem({ todo }) {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.todo);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  if (todo.completed) {
    return (
      <div className="todo__item">
        <button
          className="todo__btn-mark"
          disabled={editMode}
          onClick={() => {
            dispatch(editTodo({ id: todo.id, body: `{"completed":false}` }));
          }}
        >
          Uncomplete
        </button>
        <TodoText
          todo={editTitle}
          editMode={editMode}
          setTitle={setEditTitle}
          inputRef={inputRef}
        />
        <div>
          <button
            className="todo__btn-edit"
            onClick={() => {
              setEditMode((c) => !c);
              if (editMode) {
                dispatch(
                  editTodo({ id: todo.id, body: `{"todo":"${editTitle}"}` })
                );
              }
            }}
          >
            {editMode ? "Save" : "Edit"}
          </button>
          <button
            className="todo__btn-delete"
            disabled={editMode}
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="todo__item">
        <div>
          <button
            className="todo__btn-delete"
            disabled={editMode}
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Delete
          </button>
          <button
            className="todo__btn-edit"
            onClick={() => {
              setEditMode((c) => !c);
              if (editMode) {
                dispatch(
                  editTodo({ id: todo.id, body: `{"todo":"${editTitle}"}` })
                );
              }
            }}
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
        <TodoText
          todo={editTitle}
          editMode={editMode}
          setTitle={setEditTitle}
          inputRef={inputRef}
        />
        <button
          className="todo__btn-mark"
          disabled={editMode}
          onClick={() => {
            dispatch(editTodo({ id: todo.id, body: `{"completed":true}` }));
          }}
        >
          Complete
        </button>
      </div>
    );
  }
}
