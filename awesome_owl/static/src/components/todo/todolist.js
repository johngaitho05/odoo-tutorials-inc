/** @odoo-module **/

import { Component, useState, useRef, onMounted } from "@odoo/owl";
import { TodoItem } from './todoitem'

export class TodoList extends Component {
  static props = {};
  static components = { TodoItem }
  static template = "awesome_owl.TodoList";

  setup() {
    this.nextId = 1
    this.todos = useState([]);
    this.inputRef = useRef('input');
    onMounted(() => {
      this.inputRef.el.focus();
    });

  }

  addTodo(ev) {
    console.log("adding todo")
    if (ev.keyCode === 13 && ev.currentTarget.value.trim()) {
      this.todos.push({
        id: this.nextId++,
        description: ev.currentTarget.value.trim(),
        isCompleted: false,
      });
      this.inputRef.el.value = "";
    }
  }

  toggleState(todo) {
    todo.isCompleted = !todo.isCompleted
  }

  removeTodo(todoId){
    const index = this.todos.findIndex((elem) => elem.id === todoId);
    if (index >= 0) {
      // remove the element at index from list
      this.todos.splice(index, 1);
    }
  }
}
