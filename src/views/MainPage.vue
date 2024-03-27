<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

import TaskCard from "../components/TaskCard.vue";
import TaskForm from "../components/TaskForm.vue";
import GoLogin from "../components/GoLogin.vue";

const tasks = ref("");
const byCategory = ref("all");
const byNovelty = ref("new");
const ifCompleted = ref("all");

async function getTasks() {
	let user = Cookies.get("user");

	if (user) {
		let response = await axios.get("/tasks/get", {
			params: {
				id: user,
				category: byCategory.value,
				novelty: byNovelty.value,
				completed: ifCompleted.value,
			},
		});

		tasks.value = response.data;

		if (tasks.value === "no such user") {
			Cookies.remove("user");
		}
	} else {
		tasks.value = "no such user";
		Cookies.remove("user");
	}
}

async function completeTask(task) {
	const user = Cookies.get("user");

	if (user) {
		const response = await axios.get("/tasks/complete", {
			params: { id: user, task: task },
		});

		if (response.data === "yep") {
			getTasks();
		} else if (response.data === "error") {
			console.log("error - not completed");
		}
	} else {
		tasks.value = "no such user";
		Cookies.remove("user");
	}
}

async function removeTask(task) {
	const user = Cookies.get("user");

	if (user) {
		const response = await axios.post("/tasks/remove", {
			id: user,
			task: task,
		});

		if (response.data === "yep") {
			getTasks();
		} else if (response.data === "error") {
			console.log("error - not removed");
		}
	} else {
		tasks.value = "no such user";
		Cookies.remove("user");
	}
}

onMounted(getTasks);
</script>

<template>
	<section v-if="tasks === 'no such user'">
		<GoLogin />
	</section>
	<section v-else>
		<h2>Задачи</h2>
		<div class="task-view">
			<div class="filters">
				<h3>Фильтры</h3>

				<label for="category">Категория:</label>
				<select
					@change="getTasks"
					v-model="byCategory"
					name="sbc"
					id="category"
				>
					<option value="work">Работа</option>
					<option value="study">Учеба</option>
					<option value="routine">Дела по дому</option>
					<option value="else">Другое</option>
					<option value="all">Все</option>
				</select>

				<label for="novelty">Создание:</label>
				<select @change="getTasks" v-model="byNovelty" id="novelty">
					<option value="new">Сначала новые</option>
					<option value="old">Сначала старые</option>
				</select>

				<label for="state">Состояние:</label>
				<select @change="getTasks" v-model="ifCompleted" id="state">
					<option value="true">Выполнено</option>
					<option value="false">Не выполнено</option>
					<option value="all">Все</option>
				</select>
			</div>
			<div class="tasks">
				<TaskCard
					v-if="tasks != ''"
					v-for="item in tasks"
					:title="item.title"
					:description="item.description"
					:category="item.category"
					:isCompleted="item.isCompleted"
					:id="item._id"
					@click="completeTask(item._id)"
					:clickHandler="removeTask"
				/>
				<h3 v-else>Пока что здесь пусто...</h3>
			</div>
		</div>

		<TaskForm :tasksHandler="getTasks" />
	</section>
</template>

<style>
section {
	width: 100%;
	height: auto;
	border: 3px solid var(--violet);
	border-radius: 10px;
	padding: 30px;
}

h2 {
	margin-bottom: 25px;
	text-align: center;
	color: var(--violet);
}

.task-view {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
}

.filters {
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: flex-start;

	width: 30%;
	height: auto;
	border: 3px dashed var(--violet);
	border-radius: 20px;
	padding: 20px;
}

.filters label {
	color: var(--dark);
	transition: 0.1s all;
	margin-bottom: 5px;
}

.filters select {
	width: 100%;
	height: auto;
}

.filters h3 {
	color: var(--violet);
}

.filters h3,
.filters select {
	margin-bottom: 20px;
}

.filters select:last-child {
	margin: 0;
}

.tasks {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	row-gap: 25px;

	max-height: 600px;
	overflow: scroll;
	overflow-x: hidden;
}

.tasks h3 {
	color: var(--violet);
	opacity: 0.75;
}
</style>
