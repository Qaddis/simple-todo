<script setup>
import { ref } from "vue";
import Cookies from "js-cookie";
import axios from "axios";

const error = ref("");
const title = ref("");
const description = ref("");
const category = ref("else");

const props = defineProps({
	tasksHandler: Function,
});

const showError = (msg) => {
	error.value = msg;
	setTimeout(() => {
		error.value = "";
	}, 3000);
};

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
				props.tasksHandler();

				title.value = "";
				description.value = "";
			}
		} else {
			showError("Не все поля заполнены корректно!");
		}
	} else {
		props.tasksHandler("no such user");
		Cookies.remove("user");
	}
}
</script>

<template>
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
</template>

<style scoped>
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

form input {
	width: 500px;
	margin-bottom: 10px;
}

form textarea {
	max-width: 500px;
	min-width: 500px;
	max-height: 200px;
	min-height: 100px;
	margin-bottom: 10px;
}

form select {
	width: 500px;
	margin-bottom: 10px;
}

form button {
	width: 350px;
	margin-top: 25px;
}
</style>
