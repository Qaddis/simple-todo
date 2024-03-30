<script setup>
import { onMounted } from "vue";
import Plotly from "plotly.js-dist";

const props = defineProps({
	tasks: Array,
});

const letTasksCompleted = () => {
	let isCompletedData = [0, 0];

	for (let task in props.tasks) {
		if (props.tasks[task].isCompleted) isCompletedData[0]++;
		else isCompletedData[1]++;
	}

	return isCompletedData;
};

const letTasksTypes = () => {
	let tasksTypes = [0, 0, 0, 0]; // Учёба, работа, дела по дому, другое

	for (let i in props.tasks) {
		if (props.tasks[i].category === "study") tasksTypes[0]++;
		else if (props.tasks[i].category === "work") tasksTypes[1]++;
		else if (props.tasks[i].category === "routine") tasksTypes[2]++;
		else tasksTypes[3]++;
	}

	return tasksTypes;
};

function createPlots() {
	const plotsData = [
		{
			values: letTasksCompleted(),
			labels: ["Выполнено", "Не выполнено"],
			type: "pie",
			name: "Выполнено/Не выполнено",
			marker: {
				colors: ["#47ed95", "#A447DE"],
			},
			domain: {
				row: 0,
				column: 0,
			},
			textinfo: "label+percent",
			textposition: "inside",
			hoverinfo: "value",
		},
		{
			values: letTasksTypes(),
			labels: ["Учёба", "Работа", "Дела по дому", "Другое"],
			type: "pie",
			name: "Соотношение типов задач",
			marker: {
				colors: ["#f88b47", "#7273b9", "#2980d6", "#2fe9ae"],
			},
			domain: {
				row: 0,
				column: 1,
			},
			textinfo: "label+percent",
			textposition: "inside",
			hoverinfo: "value",
		},
	];

	const plotsLayout = {
		height: 400,
		width: 800,
		grid: { rows: 1, columns: 2 },
		plot_bgcolor: "rgba(0, 0, 0, 0)",
		paper_bgcolor: "rgba(0, 0, 0, 0)",
		title: "Статистика",
		titlefont: {
			size: 20,
			color: "#A447DE",
		},
		font: {
			color: "#FAFAFA",
			size: 14,
		},
		showlegend: false,
	};

	Plotly.newPlot("stat-output", plotsData, plotsLayout);
}

onMounted(createPlots);
</script>

<template>
	<div id="stat-output"></div>
</template>

<style>
#stat-output {
	width: 800px;
	height: 400px;
}
</style>
