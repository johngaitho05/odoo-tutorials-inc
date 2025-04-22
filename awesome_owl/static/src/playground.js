/** @odoo-module **/

import { Component, markup, useState } from "@odoo/owl";
import { Counter } from './components/counter/counter'
import { Card } from './components/card/card'
import { TodoList } from './components/todo/todolist'
import { SlotCard } from './components/slot_card/card'

export class Playground extends Component {
    static template = "awesome_owl.playground";
    static components = { Counter, Card, TodoList, SlotCard }
    static props = {}

    setup() {
        this.state = useState({ sum: 0 })
        this.cards =  [
            {
                title: 'Card 1',
                content: markup("<div>Some content</div>")
            },
            {
                title: 'Card 2',
                content: markup("<div class='text-info'>Some content</div>")
            },
        ]
    }

    incrementSum(){
        this.state.sum++
    }
}
