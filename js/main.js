import TodoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

let todolist = new TodoList();

document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState == "complete") {
    initApp();
  }
});

const initApp = () => {
  refreshThePage();
};

const refreshThePage = () => {
  clearListDisplay();
  renderItems();
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
  checkbox.type = "check";
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
