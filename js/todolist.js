export default class TodoList {
  constructor() {
    this._list = [];
  }

  getList() {
    return this._list;
  }

  addItem(item) {
    this._list.push(item);
  }

  clearList() {
    this._list = [];
  }

  deleteItem(id) {
    const list = this._list;

    for (let i = 0; i < list.length; i++) {
      if (i == id) {
        list.splice(i, 1);
        break;
      }
    }
  }
}
