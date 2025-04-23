import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { reactive } from "@odoo/owl";

const statisticsService = {
    async start() {
        const data = reactive({});  // empty reactive object

        async function loadData() {
            const result = await rpc("/awesome_dashboard/statistics");
            // Update keys in-place to preserve reactivity
            for (const key in result) {
                data[key] = result[key];
            }
        }

        // Initial load
        await loadData();

        // Refresh every 10 seconds (for testing)
        setInterval(loadData, 10000);  // use 600000 for 10 minutes in prod

        return {
            statistics: data,
        };
    },
};

registry.category("services").add("statistics", statisticsService);
