export default class ToDoItem {
  constructor() {
    this._id = null;
    this._item = null;
  }

  getid() {
    return this._id;
  }

  setid(id) {
    this._id = id;
  }

  getitem() {
    return this._item;
  }

  setitem(item) {
    this._item = item;
  }
}
