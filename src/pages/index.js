import { $fetch } from "ohmyfetch";
import { createApp, reactive } from "petite-vue";
import { WebflowFormComponent } from "../components/WebflowFormComponent";

// define the reactive store
const store = reactive({
  isLoading: false,
  visibility: "all", // all, active, completed
  todos: [],
  fields: {
    id: 201,
    title: "",
    completed: false
  }
});

const mounted = async () => {
  // log to the console
  window.console.log("mounted: app");

  // fetch and store the todos
  store.todos = await fetchTodos();
};

const fetchTodos = async () => {
  // set the loading flag
  store.isLoading = true;

  // define the endpoint url & query parameters
  const endpointUrl = "https://jsonplaceholder.typicode.com/todos/";
  const queryParams = {
    _limit: 5
  };

  // fetch the todos using ohmyfetch
  const todos = await $fetch(endpointUrl, {
    query: queryParams
  }).catch((error) => {
    this.isError = false;
    throw Error(error);
  });

  // reset the loading flag
  store.isLoading = false;

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
  }
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

  // make a PUT request to update the todo
  const updatedTodo = await $fetch(endpointUrl + todo.id, {
    method: "PATCH",
    body: {
      completed: todo.completed
    }
  }).catch((error) => {
    this.isError = false;
    throw Error(error);
  });

  // update the todo store
  const todoIndex = store.todos.findIndex((t) => t.id === updatedTodo.id);
  if (todoIndex >= 0) {
    store.todos[todoIndex] = updatedTodo;
  }
};

// callback function which is passed to the WebflowFormComponent
const addTodo = async (todo) => {
  var value = store.fields.title && store.fields.title.trim();
  if (!value) {
    return;
  }

  // spoof the id as the example api allways returns id=201
  todo.id = store.fields.id++;

  // reset the title input
  store.fields.title = "";

  // addend the todo to the store
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
  get filteredTodos() {
    return filters[store.visibility](store.todos);
  },
  get remaining() {
    return filters.active(store.todos).length;
  },
  get pluralize() {
    return this.remaining === 1 ? "item" : "items";
  }
});

export { app };
