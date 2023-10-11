import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import colors from "../assets/colors/colors.json";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
);

ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.borderColor = colors["basic-light-dull"];
ChartJS.defaults.layout = {
    padding: {
        top: 20,
    },
};
ChartJS.defaults.plugins.legend.display = false;
ChartJS.defaults.plugins.tooltip.enabled = false;
if (ChartJS.defaults.plugins.datalabels) {
    ChartJS.defaults.plugins.datalabels.color = colors["basic-light"];
    ChartJS.defaults.plugins.datalabels.anchor = "end";
    ChartJS.defaults.plugins.datalabels.align = "top";
    ChartJS.defaults.plugins.datalabels.offset = 2;
    ChartJS.defaults.plugins.datalabels.padding = {
        top: 0,
        bottom: 0,
    };
}
ChartJS.defaults.interaction.mode = "nearest";
ChartJS.defaults.interaction.axis = "x";
ChartJS.defaults.interaction.intersect = false;
ChartJS.defaults.elements.point.pointStyle = "circle";
ChartJS.defaults.elements.point.hoverRadius = 3;

export const useChart = () => {};
