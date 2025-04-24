/** @odoo-module **/

import {Component, useState, onWillStart} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {Layout} from '@web/search/layout'
import {ControlPanel} from "@web/search/control_panel/control_panel";
import {useService} from "@web/core/utils/hooks";
import {_t} from "@web/core/l10n/translation";
import {DashboardItem} from './dashboard_item'
import {ConfigurationDialog} from './configuration_dialog'

const DashboardRegistry = registry.category("awesome_dashboard");

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { Layout, ControlPanel, DashboardItem, ConfigurationDialog };

    setup() {
        this.action = useService('action')
        this.dialog = useService('dialog')
        const dataService = useService('statistics')
        this.state = useState({statistics: dataService.statistics, items: []})
        this.statistics = useState(dataService.statistics);
        onWillStart(()=>{
            this.setItems()
        })
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

    setItems(){
        const unchecked = JSON.parse(localStorage.getItem("awesome_dashboard_configuration") || "[]");
        this.state.items = DashboardRegistry.getAll().filter(item => {
            return !unchecked.includes(item.id)
        })
    }

    openSettings(){
        let self = this
        this.dialog.add(ConfigurationDialog, {
            getPayload: (removedIds) => {
                localStorage.setItem('awesome_dashboard_configuration',  JSON.stringify(removedIds))
                self.setItems()
            },
        })
    }
}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);
