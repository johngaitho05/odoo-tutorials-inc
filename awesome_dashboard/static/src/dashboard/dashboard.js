/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {Layout} from '@web/search/layout'
import {ControlPanel} from "@web/search/control_panel/control_panel";
import { useService } from "@web/core/utils/hooks";
import {_t} from "@web/core/l10n/translation";
import { DashboardItem } from './dashboard_item'
import { items } from './dashboard_items'

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, ControlPanel, DashboardItem }

    setup() {
        this.action = useService('action')
        const dataService = useService('statistics')
        this.statistics = useState(dataService.statistics);
        this.items = items
    }

    openCustomers(){
        this.action.doAction("base.action_partner_form");
    }

    openLeads(){
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: _t('Leads'),
            target: 'current',
            res_model: 'crm.lead',
            views: [[false, 'list'], [false, 'form']],
        });
    }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
