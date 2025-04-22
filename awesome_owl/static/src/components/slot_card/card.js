/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class SlotCard extends Component {
    static props = { title: String, slots: Object };
    static template = "awesome_owl.SlotCard"

    setup(){
        this.state = useState({ visible: true });
    }

    toggleContent(){
        this.state.visible = !this.state.visible
    }
}
