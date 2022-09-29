import { $fetch } from "ohmyfetch";
import { createApp, reactive } from "petite-vue";
import { WebflowFormComponent } from "../components/WebflowFormComponent";

const statusEnum = Object.freeze({
  idle: 0,
  fetching: 1,
  updating: 2,
  error: 3,
});

// define the reactive store
const store = reactive({
  status: statusEnum.idle,
  visibility: "all", // all, active, completed
  todos: [],
  fields: {
    id: 201,
    title: "",
    completed: false,
  },
});

const mounted = async () => {
  // log to the console
  window.console.log("mounted: app");

  // fetch and store the todos
  store.todos = await fetchTodos();
};

const fetchTodos = async () => {
  // update the status
  store.status = statusEnum.fetching

  // define the endpoint url & query parameters
  const endpointUrl = "https://jsonplaceholder.typicode.com/todos/";
  const queryParams = {
    _limit: 5,
  };

  // fetch the todos using ohmyfetch
  const todos = await $fetch(endpointUrl, {
    query: queryParams,
  }).catch((error) => {
    store.status = statusEnum.error
    throw Error(error);
  });

  // reset the status
  store.status = statusEnum.idle

  // return the todos
  return todos;
};

// todo filters
const filters = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter((todo) => {
      return !todo.completed;
    });
  },
  completed(todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  },
};

// update all todos completed status
const markAll = (value) => {
  store.todos.forEach(function (todo) {
    todo.completed = value;
  });
};

const updateTodo = async (todo) => {
  // define the endpoint url
  const endpointUrl = "https://jsonplaceholder.typicode.com/todos/";

  // update the status
  store.status = statusEnum.updating;

  // make a PUT request to update the todo
  const updatedTodo = await $fetch(endpointUrl + todo.id, {
    method: "PATCH",
    body: {
      completed: todo.completed,
    },
  }).catch((error) => {
    store.status = statusEnum.error;
    throw Error(error);
  });

  // update the todo store
  const todoIndex = store.todos.findIndex((t) => t.id === updatedTodo.id);
  if (todoIndex >= 0) {
    store.todos[todoIndex] = updatedTodo;
  }

  // reset the status
  store.status = statusEnum.idle;
};

// callback function which is passed to the WebflowFormComponent
const addTodo = async (todo) => {
  let value = store.fields.title && store.fields.title.trim();
  if (!value) {
    return;
  }

  // spoof the id as the example api always returns id=201
  todo.id = store.fields.id++;

  // reset the title input
  store.fields.title = "";

  // add the todo to the store
  store.todos.push(todo);
};

const app = createApp({
  // components
  WebflowFormComponent,

  // lifecycle hooks
  mounted,

  // reactive store
  store,

  // methods
  addTodo,
  updateTodo,
  markAll,

  // getters
  get isIdle() {
    return store.status === statusEnum.idle;
  },
  get isFetching() {
    return store.status === statusEnum.fetching;
  },
  get isUpdating() {
    return store.status === statusEnum.updating;
  },
  get isError() {
    return store.status === statusEnum.error;
  },
  get filteredTodos() {
    return filters[store.visibility](store.todos);
  },
  get remaining() {
    return filters.active(store.todos).length;
  },
  get pluralize() {
    return this.remaining === 1 ? "item" : "items";
  },
});

export { app };
