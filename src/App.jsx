import TodosContainer from "./components/todo-container";
import TodoItem from "./components/todo-item";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTodoData, createTodo } from "./slices/todoSlice";

function App() {
  const { todoData, loaded } = useSelector((state) => state.todo);
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodoData());
  }, []);

  return (
    <>
      <div className="todo">
        <h1>Todo List</h1>
        <div className="todo__form">
          <input
            id="todo__input"
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button
            id="todo__btn-add"
            onClick={() => {
              dispatch(createTodo(todoInput));
              setTodoInput("");
            }}
          >
            submit
          </button>
        </div>
      </div>

      <div id="todo__lists">
        <TodosContainer name="Pending Tasks" id="todo__pending">
          {!loaded
            ? "...loading"
            : todoData?.todos
                .filter((todo) => !todo.completed)
                .map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </TodosContainer>
        <TodosContainer name="Completed Tasks" id="todo__completed">
          {!loaded
            ? "...loading"
            : todoData?.todos
                .filter((todo) => todo.completed)
                .map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </TodosContainer>
      </div>
    </>
  );
}

export default App;
