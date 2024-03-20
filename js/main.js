import TodoList from "./todolist";
import ToDoItem from "./todoitem";

let todolist = new TodoList();

document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState == "complete") {
    initApp();
  }
});

const initApp = () => {
  clearListDisplay();
  renderItems();
};

const clearListDisplay = () => {
  const parentEl = document.getElementById("items");
  removeChildren(parentEl);
};

const removeChildren = (parentEl) => {
  const child = parentEl.lastElementChild;
  while (child) {
    parentEl.removeChild(child);
    child = parentEl.lastElementChild;
  }
};

const renderItems = () => {
  todolist._list.forEach((item) => {});
};
