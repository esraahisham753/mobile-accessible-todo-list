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

  const clearBtn = document.getElementById("clear");
  clearBtn.addEventListener("click", (event) => {
    const confirmed = confirm("Are you sure you want to delete all items?");
    if (confirmed) {
      todolist.clearList();
      updateStorage(todolist.getList());
      refreshThePage();
    }
  });

  loadList();
  refreshThePage();
};

const loadList = () => {
  const storageList = localStorage.getItem("todolist");
  if (typeof storageList !== "string") {
    return;
  }
  const parsedList = JSON.parse(storageList);
  parsedList.forEach((itemObj) => {
    let newItem = new ToDoItem();
    newItem.setid(itemObj._id);
    newItem.setitem(itemObj._item);
    todolist.addItem(newItem);
  });
};

const updateStorage = (list) => {
  localStorage.setItem("todolist", JSON.stringify(list));
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
    const id = event.target.id;
    console.log(id);
    todolist.deleteItem(id);
    updateStorage(todolist.getList());
    const labelText = event.target.nextElementSibling.textContent;
    updateConfirmationContent(labelText, "removed");
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
  const newItem = inputEl.value.trim();
  if (!newItem) return;
  const newid = getNextId();
  let newItemObj = new ToDoItem();
  newItemObj.setid(newid);
  newItemObj.setitem(newItem);
  todolist.addItem(newItemObj);
  updateStorage(todolist.getList());
  updateConfirmationContent(newItem, "added");
  setTimeout(() => {
    refreshThePage();
  }, 1000)
};

const getNextId = () => {
  const list = todolist.getList();
  if (list.length) {
    console.log(list[list.length - 1]);
  }
  const nextId = list.length ? list[list.length - 1].getid() + 1 : 1;
  return nextId;
};

const updateConfirmationContent = (inputText, action) => {
  const confirmEl = document.getElementById("confirmation");
  confirmEl.textContent = `${inputText} ${action}`;
};
