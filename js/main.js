import TodoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

let todolist = new TodoList();
const inputEl = document.getElementById("itemInput");

document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState == "complete") {
    initApp();
  }
});

const initApp = () => {
  const form = document.getElementById("addItem");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    processSubmit();
  });
  
  refreshThePage();
};

const refreshThePage = () => {
  clearListDisplay();
  renderItems();
  clearInput();
  returnFocus();
};

const clearListDisplay = () => {
  const parentEl = document.getElementById("items");
  removeChildren(parentEl);
};

const removeChildren = (parentEl) => {
  let child = parentEl.lastElementChild;
  while (child) {
    parentEl.removeChild(child);
    child = parentEl.lastElementChild;
  }
};

const renderItems = () => {
  todolist.getList().forEach((item) => {
    buildTheItem(item);
  });
};

const buildTheItem = (item) => {
  const li = document.createElement("li");
  li.className = "list-container__item";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = item.getid();
  checkbox.tabIndex = "0";
  addCheckEventListener(checkbox);
  const label = document.createElement("label");
  label.htmlFor = item.getid();
  label.textContent = item.getitem();
  li.appendChild(checkbox);
  li.appendChild(label);
  const container = document.getElementById("items");
  container.appendChild(li);
};

const addCheckEventListener = (checkEl) => {
  checkEl.addEventListener("click", (event) => {
    const id = checkEl.id;
    todolist.deleteItem(id);
    setTimeout(() => {
      refreshThePage();
    }, 1000);
  });
};

const clearInput = () => {
  inputEl.value = "";
};

const returnFocus = () => {
  inputEl.focus();
};

const processSubmit = () => {
  console.log("Form submit");
  const newItem = inputEl.value.trim();
  const newid = getNextId();
  let newItemObj = new ToDoItem();
  newItemObj.setid(newid);
  newItemObj._item = newItem;
  todolist.addItem(newItemObj);
  refreshThePage();
};

const getNextId = () => {
  const list = todolist.getList();
  const nextId = list.length ? list[list.length - 1].id + 1 : 1;
  return nextId;
};
