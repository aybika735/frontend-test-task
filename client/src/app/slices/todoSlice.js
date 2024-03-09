import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todosReducer/fetch-todos/pending",
  async function (_, { rejectWithValue }) {
    const response = await fetch("http://localhost:8081/productTypes");
    if (!response.ok) {
      return rejectWithValue("server is not okey");
    }

    return await response.json();
  }
);
export const fetchTodobyId = createAsyncThunk(
  "getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8081/productTypes/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        return rejectWithValue(data);
      }

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const editTodobyId = createAsyncThunk(
  "editTodoById",
  async (
    { id, packsNumber, packageType, isArchived, description },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`http://localhost:8081/productTypes/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          packsNumber,
          packageType,
          isArchived,
          description,
        }),
      });
      const data = await response.json();
      if (response.status !== 200) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const todoDeleteById = createAsyncThunk(
  "todoDeleteById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8081/productTypes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        return rejectWithValue(data);
      }

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createTodo = createAsyncThunk(
  "createTodo",
  async (
    { packsNumber, packageType, isArchived, description },
    { rejectWithValue }
  ) => {
    const numericPacksNumber = parseInt(packsNumber, 10);
    console.log(typeof numericPacksNumber);
    try {
      const response = await fetch("http://localhost:8081/productTypes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packsNumber: numericPacksNumber,
          packageType,
          isArchived,
          description,
        }),
      });
      const data = await response.json();

      if (response.status !== 201) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (e) {
      return rejectWithValue(e.toString());
    }
  }
);

const initialState = {
  loading: true,
  todos: [],
  todosId: [],
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.todos = [];
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTodobyId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.todosId = [];
      })
      .addCase(fetchTodobyId.fulfilled, (state, action) => {
        state.todosId = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodobyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editTodobyId.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.todos = [];
      })
      .addCase(editTodobyId.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(editTodobyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(todoDeleteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(todoDeleteById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos = state.todos.filter((item) => {
          if (item.id === action.payload.id) {
            return false;
          } else {
            return true;
          }
        });
      })
      .addCase(todoDeleteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos.push(action.payload)
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todosSlice.reducer;
