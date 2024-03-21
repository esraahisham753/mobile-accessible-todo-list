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

    this._list = list.filter((item) => item._id != id);
  }
}
