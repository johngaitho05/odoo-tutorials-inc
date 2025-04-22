/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Card extends Component {
    static props = {
        title: String,
        content: Object
    };
    static template = "awesome_owl.Card";

}
