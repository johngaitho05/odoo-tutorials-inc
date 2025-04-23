import { Component, onWillStart, useEffect, useRef } from '@odoo/owl'
import { getColor } from "@web/core/colors/colors";
import { cookie } from "@web/core/browser/cookie";
import { loadJS } from "@web/core/assets";

const colorScheme = cookie.get("color_scheme");

export class PieChart extends Component {
  static props = {
    data: Object,
  };

  static template = "awesome_dashboard.PieChart";

  setup() {
    this.chart = null;
    this.canvasRef = useRef("canvas");

    onWillStart(async () => loadJS("/web/static/lib/Chart/Chart.js"));
    useEffect(() => {
      this.renderChart();
      return () => {
        if (this.chart) {
          this.chart.destroy();
        }
      };
    });
  }

  getPieChartData() {
    const labels = Object.keys(this.props.data);
    const dataValues = Object.values(this.props.data);

    return {
      type: "pie",
      data: {
        labels: labels,
        datasets: [{
          label: "Orders",
          data: dataValues,
          backgroundColor: labels.map((_, index) =>
            getColor(index, colorScheme, labels.length)
          ),
          borderColor: Array(dataValues).fill('#fff'),
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: "Shirt orders by size",
            position: "left",
          }
        },
      },
    }
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy(); // destroy the previous chart if re-rendered
    }

    this.chart = new Chart(this.canvasRef.el, this.getPieChartData());
  }
}
