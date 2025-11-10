import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseURL = "https://dummyjson.com/todos";
const headers = { "Content-Type": "application/json" };

export const fetchTodoData = createAsyncThunk(
  "todo/fetchTodoData",
  async () => {
    return fetch(baseURL).then((res) => res.json());
  }
);

let idCount = 0;
export const createTodo = createAsyncThunk("todo/createTodo", async (todo) => {
  return fetch(`${baseURL}/add`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      todo,
      completed: false,
      userId: 1,
    }),
  }).then((res) => res.json());
});

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async (id) => {
  return fetch(`${baseURL}/${id}`, {
    headers,
    method: "DELETE",
  }).then((res) => res.json());
});

export const editTodo = createAsyncThunk("todo/editTodo", async (payload) => {
  return fetch(`${baseURL}/${payload.id}`, {
    headers,
    method: "PATCH",
    body: payload.body,
  }).then((res) => res.json());
});

const TodoSlice = createSlice({
  name: "todo",
  initialState: {
    todoData: {},
    loaded: false,
  },
  reducers: {
    async updateTodo(id, body) {
      return fetch(`${baseURL}/${id}`, {
        headers,
        method: "PATCH",
        body,
      }).then((res) => res.json());
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoData.fulfilled, (state, action) => {
      state.todoData = action.payload;
      state.loaded = true;
    });
    builder.addCase(fetchTodoData.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(fetchTodoData.rejected, (state) => {
      state.loaded = true;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todoData.todos.push({
        ...action.payload,
        id: action.payload.id + idCount,
      });
      idCount++;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todoData.todos = state.todoData.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      state.todoData.todos = state.todoData.todos.map((todo) => {
        return todo.id === action.payload?.id ? action.payload : todo;
      });
    });
  },
});

export default TodoSlice.reducer;
