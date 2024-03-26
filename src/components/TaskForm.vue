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

form label {
	color: var(--dark);
	margin-bottom: 5px;
}

form input {
	width: 500px;
	height: auto;
	padding: 5px 10px;
	text-align: center;
	color: var(--dark);
	border: 2px solid var(--additional);
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
	color: var(--dark);
	border: 2px solid var(--additional);
	border-radius: 5px;
	margin-bottom: 10px;
	transition: all 0.2s;
}

form select {
	width: 500px;
	height: auto;
	text-align: center;
	padding: 5px 10px;
	color: var(--dark);
	border: 2px solid var(--additional);
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
	border-color: var(--violet);
}

select option {
	color: var(--dark);
	border: 1px solid var(--additional);
	outline: none;
}

select:focus option {
	border-color: var(--violet);
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
