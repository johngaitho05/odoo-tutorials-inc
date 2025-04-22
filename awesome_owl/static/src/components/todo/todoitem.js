/** @odoo-module **/

import { Component } from "@odoo/owl";

export class TodoItem extends Component {
    static props = {todo: Object, change: Function, removeTodo: Function};
    static template = "awesome_owl.TodoItem";

    onChange(){
      this.props.change(this.props.todo)
    }

}
