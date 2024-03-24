<script setup>
import TaskCard from "../components/TaskCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

const tasks = ref("");
const error = ref("");

const title = ref("");
const description = ref("");
const category = ref("else");

const byCategory = ref("");
const byNovelty = ref("");
const ifCompleted = ref("");

const showError = (msg) => {
	error.value = msg;
	setTimeout(() => {
		error.value = "";
	}, 3000);
};

async function getTasks() {
	let user = Cookies.get("user");

	if (user) {
		let response = await axios.get("/tasks/get", { params: { id: user } });

		tasks.value = response.data;
	} else {
		tasks.value = "no such user";
	}
}

async function createTask(evt) {
	evt.preventDefault();

	let user = Cookies.get("user");

	if (user) {
		if (title.value != "" && description != "") {
			let response = await axios.post("/tasks/create", {
				id: user,
				title: title.value,
				description: description.value,
				category: category.value,
			});

			if (response.data === "error") {
				showError("Ошибка! Попробуйте ещё раз!");
			} else {
				tasks.value = response.data;

				title.value = "";
				description.value = "";
			}
		} else {
			showError("Не все поля заполнены корректно!");
		}
	} else {
		tasks.value = "no such user";
	}
}

onMounted(getTasks);
</script>

<template>
	<section>
		<h2>Задачи</h2>
		<div class="task-view">
			<div class="filters">
				<h3>Фильтры</h3>

				<label for="category">Категория:</label>
				<select @change="" v-model="byCategory" name="sbc" id="category">
					<option value="work">Работа</option>
					<option value="study">Учеба</option>
					<option value="routine">Дела по дому</option>
					<option value="else">Другое</option>
					<option value="">Все</option>
				</select>

				<label for="novelty">Создание:</label>
				<select @change="" v-model="byNovelty" id="novelty">
					<option value="-1">Сначала новые</option>
					<option value="1">Сначала старые</option>
				</select>

				<label for="state">Состояние:</label>
				<select @change="" v-model="ifCompleted" id="state">
					<option value="true">Выполнено</option>
					<option value="false">Не выполнено</option>
					<option value="">Все</option>
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
				/>
				<h3 v-else>Пока что здесь пусто...</h3>
			</div>
		</div>
		<form @submit="createTask">
			<h3>Добавить задачу</h3>

			<label for="title">Задача:</label>
			<input v-model="title" type="text" id="title" />

			<label for="description">Описание:</label>
			<textarea v-model="description" id="description"></textarea>

			<label for="category">Тип:</label>
			<select @change="" v-model="category" id="category">
				<option value="study">Учеба</option>
				<option value="work">Работа</option>
				<option value="routine">Дела по дому</option>
				<option value="else">Другое</option>
			</select>

			<button type="submit">Добавить</button>

			<span :class="[error != '' ? '--active' : '']">{{ error }}</span>
		</form>
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

	width: 30%;
	height: auto;
	border: 3px dashed var(--violet);
	border-radius: 20px;
	padding: 20px;
}

.filters label {
	color: var(--violet);
	transition: 0.1s all;
	margin-bottom: 5px;
}

.filters select {
	width: 100%;
	height: auto;

	text-align: center;
	color: var(--violet);
	padding: 5px;
	background-color: var(--light);
	border: 2px solid var(--violet);
	border-radius: 5px;

	transition: 0.2s all;
}

.filters select:focus {
	outline: none;
	border-color: var(--lime);
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

form {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 15px;
	border: 3px dashed var(--lime);
	border-radius: 10px;
}

form h3 {
	color: var(--violet);
	margin-bottom: 15px;
}

form span {
	margin-top: 15px;
	color: lightcoral;
	opacity: 0;
	transition: opacity 0.2s;
}

span.--active {
	opacity: 1;
}

form label {
	color: var(--violet);
	margin-bottom: 5px;
}

form input {
	width: 500px;
	height: auto;
	padding: 5px 10px;
	text-align: center;
	color: var(--violet);
	border: 2px solid var(--violet);
	border-radius: 5px;
	margin-bottom: 10px;

	transition: all 0.2s;
}

form textarea {
	max-width: 500px;
	min-width: 500px;
	max-height: 200px;
	min-height: 100px;
	padding: 5px;
	color: var(--violet);
	border: 2px solid;
	border-radius: 5px;
	margin-bottom: 10px;
	transition: all 0.2s;
}

form select {
	width: 500px;
	height: auto;
	text-align: center;
	padding: 5px 10px;
	color: var(--violet);
	border: 2px solid var(--violet);
	border-radius: 5px;
	margin-bottom: 10px;
	transition: all 0.2s;
}

form button {
	font-size: 18px;
	display: inline-block;
	width: 350px;
	padding: 5px 10px;
	border: none;
	border-radius: 5px;
	text-align: center;
	background-color: var(--violet);
	color: var(--light);
	margin-top: 25px;
	transition: all 0.2s;
}

form input:focus,
form textarea:focus,
form select:focus {
	outline: none;
	border-color: var(--lime);
	color: var(--lime);
}

form button:hover {
	cursor: pointer;
	background-color: var(--lime);
	color: var(--light);
}

form button:active {
	opacity: 0.8;
	transform: translateY(1px);
}

form button:focus-visible {
	outline: 2px dashed var(--lime);
	outline-offset: 3px;
}
</style>
