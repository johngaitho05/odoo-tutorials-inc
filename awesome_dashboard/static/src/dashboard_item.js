import { Component } from '@odoo/owl'

export class DashboardItem extends Component {
  static props = {
    size: Number,
    slots: Object
  }
  defaultProps = {
    size: 1,
  }
  static template = 'awesome_dashboard.DashboardItem'

}
