import { Component, useRef } from '@odoo/owl'
import { registry } from "@web/core/registry";
import { Dialog } from '@web/core/dialog/dialog'

const DashboardRegistry = registry.category("awesome_dashboard");

export class ConfigurationDialog extends Component {
  static template = 'awesome_dashboard.ConfigurationDialog';
  static props = { getPayload:  Function, close: Function }
  static components = { Dialog }

  setup(){
    this.removed = JSON.parse(localStorage.getItem("awesome_dashboard_configuration") || "[]");
    this.items = DashboardRegistry.getAll()
    this.itemsRef = useRef("items");
  }

  getUncheckedIds() {
    const checkboxes = this.itemsRef.el.querySelectorAll("input[type='checkbox']:not(:checked)");
        return Array.from(checkboxes).map(cb => cb.value);
  }

  confirm(){
    this.props.getPayload(this.getUncheckedIds())
    this.props.close();
  }

}
