import React from "react";
import ReactDOM from "react-dom";
import { combineReducers, createStore } from "redux";
import { Provider, connect } from "react-redux";
import "./index.css";

// Action types - standardizing commands that can be sent to reducers

const TODO_ADD = "TODO_ADD";
const TODO_TOGGLE = "TODO_TOGGLE";
const FILTER_SET = "FILTER_SET";

// Reducers - controllers tied to state that transform the state when certain instructions dispatched by the user are received

const todos = [
  { id: "0", name: "learn redux" },
  { id: "1", name: "learn mobx" },
];

const todoReducer = (state = todos, action) => {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
};

const applyAddTodo = (state, action) => {
  const todo = Object.assign({}, action.todo, { completed: false });
  return state.concat(todo);
};

const applyToggleTodo = (state, action) => {
  return state.map((todo) =>
    todo.id === action.todo.id
      ? Object.assign({}, todo, { completed: !todo.completed })
      : todo
  );
};

const filterReducer = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
};

const applySetFilter = (state, action) => {
  return action.filter;
};

// Action creators - used within dispatch() function to send actions to reducers

const doAddTodo = (id, name) => {
  return {
    type: TODO_ADD,
    todo: { id, name },
  };
};

const doToggleTodo = (id) => {
  return {
    type: TODO_TOGGLE,
    todo: { id },
  };
};

const doSetFilter = (filter) => {
  return {
    type: FILTER_SET,
    filter,
  };
};

// Store - contains sets of state/actions contained in reducer(s)

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
});

const store = createStore(rootReducer);

// Components - ConnectedTodoList has state access capability, ConnectedTodoItem has dispatch method access/use capability

const TodoApp = () => <ConnectedTodoList />;

const TodoList = ({ todos }) => (
  <div>
    {todos.map((todo) => (
      <ConnectedTodoItem key={todo.id} todo={todo} />
    ))}
  </div>
);

const TodoItem = ({ todo, onToggleTodo }) => {
  const { name, id, completed } = todo;
  return (
    <div>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)}>
        {completed ? "Incomplete" : "Complete"}
      </button>
    </div>
  );
};

// Connecting React and Redux

const mapStateToProps = (state) => {
  return {
    todos: state.todoState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleTodo: (id) => dispatch(doToggleTodo(id)),
  };
};

const ConnectedTodoList = connect(mapStateToProps)(TodoList); //TodoList accesses list state to pass to its TodoItem components for presentation
const ConnectedTodoItem = connect(null, mapDispatchToProps)(TodoItem); //TodoItems access dispatch methods to create toggle effect in addition to presenting state, which is passed to it by the parent TodoList

ReactDOM.render(
  //Context API allows all components wrapped in Provider to access store without store being passed through the component tree
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
