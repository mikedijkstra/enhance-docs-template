/* global window, Worker */
import Store from "@enhance/store";
const store = Store();

const CREATE = "create";
const LIST = "list";

let worker;
export default function API() {
  if (!worker) {
    worker = new Worker("/_public/browser/worker.mjs");
    worker.onmessage = mutate;
  }

  initialize();

  return {
    create,
    list,
    store,
    subscribe: store.subscribe,
    unsubscribe: store.unsubscribe,
  };
}

function initialize() {
  list();
}

function mutate(e) {
  const { data } = e;
  const { result, type } = data;
  switch (type) {
    case CREATE:
      createMutation(result);
      break;
    case LIST:
      listMutation(result);
      break;
  }
}

function createMutation({ docs = [], problems = {} }) {
  store.searchResults = docs;
  store.problems = problems;
}

function listMutation({ searchResults = [], problems = {} }) {
  store.initialize({ searchResults, problems });
}

function processForm(form) {
  return JSON.stringify(Object.fromEntries(new FormData(form)));
}

function create(form) {
  const search = processForm(form);
  worker.postMessage({
    type: CREATE,
    data: search,
  });
}

function list() {
  worker.postMessage({
    type: LIST,
  });
}
