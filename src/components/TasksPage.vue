<script>
import axios from "axios";

export default {
	data() {
		return {
			tasks: [],

			error: "",
			isError: false,

			title: "",
			description: "",
			category: "else",

			byCategory: "",
			novelty: "-1",
			isCompleted: "",
		};
	},
	methods: {
		async getTasks() {
			let response = await axios.get("/tasks/get", {
				params: {
					id: this.$cookies.get("id"),
					category: this.byCategory,
					novelty: this.novelty,
					isCompleted: this.isCompleted,
				},
			});

			this.tasks = response.data;
		},
		async newTask(evt) {
			evt.preventDefault();

			let response = await axios.post("/tasks/create", {
				id: this.$cookies.get("id"),
				index: this.$cookies.get("index"),
				title: this.title.trim(),
				description: this.description.trim(),
				category: this.category,
			});

			if (response.data == "success") {
				this.getTasks();

				this.error = "";
				this.title = "";
				this.description = "";
				this.category = "else";
			} else if (response.data == "exit") {
				this.exit();
			} else {
				this.error = "Ошибка! Поля заполнены некорректно!";
				this.letError();
			}
		},
		async removeTask(task) {
			let response = await axios.post("/tasks/remove", {
				id: this.$cookies.get("id"),
				index: this.$cookies.get("index"),
				task: task,
			});

			if (response.data == "success") {
				this.getTasks();
			} else if (response.data == "exit") {
				this.exit();
			}
		},
		async completeTask(task) {
			let response = await axios.post("/tasks/complete", {
				id: this.$cookies.get("id"),
				index: this.$cookies.get("index"),
				task: task,
			});

			if (response.data == "success") {
				this.getTasks();
			} else if (response.data == "exit") {
				this.exit();
			}
		},
		goLogin(type) {
			this.$router.push({
				name: "login",
				params: {
					type: type,
				},
			});
		},
		exit() {
			this.$cookies.remove("id");
			this.$cookies.remove("index");

			this.$router.push({
				name: "login",
				params: {
					type: "sign-in",
				},
			});
		},
		letError() {
			this.isError = true;
			setTimeout(() => {
				this.isError = false;
			}, 10000);
		},
	},
	mounted() {
		setTimeout(() => {
			if (this.$store.state.isAuthorization) {
				this.getTasks();
			}
		}, 500);
	},
};
</script>

<template>
	<div v-if="$store.state.isAuthorization" class="wrapper">
		<h2 class="topic">Задачи</h2>
		<div class="task-view">
			<div class="filters">
				<h3>Фильтры</h3>

				<label for="sbc">Категория:</label>
				<select @change="getTasks" v-model="byCategory" name="sbc" id="sbc">
					<option value="work">Работа</option>
					<option value="study">Учеба</option>
					<option value="routine">Дела по дому</option>
					<option value="else">Другое</option>
					<option value="">Все</option>
				</select>

				<label for="sn">Создание:</label>
				<select @change="getTasks" v-model="novelty" name="sn" id="sn">
					<option value="-1">Сначала новые</option>
					<option value="1">Сначала старые</option>
				</select>

				<label for="sbs">Состояние:</label>
				<select @change="getTasks" v-model="isCompleted" name="sbs" id="sbs">
					<option value="true">Выполнено</option>
					<option value="false">Не выполнено</option>
					<option value="">Все</option>
				</select>
			</div>
			<div class="tasks">
				<div
					v-if="tasks != ''"
					v-for="(item, index) in tasks"
					@click="completeTask(item._id)"
					@dblclick="removeTask(item._id)"
					:class="{
						routine: item.category == 'routine',
						else: item.category == 'else',
						study: item.category == 'study',
					}"
					class="task"
				>
					<div :class="{ border: item.description != '' }">
						<span :class="{ completed: item.isCompleted }" class="title">{{
							item.title
						}}</span>
						<span class="category">{{ item.category }}</span>
					</div>
					<p :class="{ completed: item.isCompleted }">{{ item.description }}</p>
				</div>
				<h3 v-else>Пока что здесь пусто...</h3>
			</div>
		</div>
		<form @submit="newTask">
			<h2>Добавить задачу</h2>

			<label for="title">Задача:</label>
			<input v-model="title" type="text" name="title" id="title" />

			<label for="description">Описание:</label>
			<textarea
				v-model="description"
				name="description"
				id="description"
			></textarea>

			<label for="category">Тип:</label>
			<select v-model="category" name="category" id="category">
				<option value="study">Учеба</option>
				<option value="work">Работа</option>
				<option value="routine">Дела по дому</option>
				<option value="else">Другое</option>
			</select>

			<button type="submit">Добавить</button>

			<Transition name="jump">
				<span v-show="isError">{{ error }}</span>
			</Transition>
		</form>
	</div>
	<div v-else class="spare">
		<h2 @click="goLogin('sign-in')">Войдите</h2>
		<p>
			Или <span @click="goLogin('sign-up')">зарегестрируйтесь</span> для начала
			работы
		</p>
	</div>
</template>

<style scoped>
.wrapper {
	padding: 30px;
	border: 3px solid #8360c3;
	border-radius: 20px;

	display: flex;
	flex-direction: column;
	gap: 30px;
}

h2 {
	font-size: 25px;
	color: #8360c3;
	font-weight: 700;
	margin-bottom: 25px;

	text-shadow: 0 0 10px #8360c3;
}

.topic {
	margin: 0;
	text-align: center;
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
	height: 335px;
	border: 3px dashed #8360c3;
	border-radius: 20px;
	padding: 20px;
}

.filters label {
	font-size: 18px;
	font-weight: 600;
	color: #8360c3;
	transition: 0.1s all;
	margin-bottom: 5px;
}

.filters select {
	width: 100%;
	height: auto;

	font-size: 18px;
	text-align: center;
	color: #8360c3;
	padding: 5px;
	background-color: #fafafa;
	border: 2px solid #8360c3;
	border-radius: 5px;

	transition: 0.2s all;
}

.filters select:focus {
	border-color: #2fe9ae;
}

.filters h3 {
	font-size: 23px;
	color: #8360c3;
	text-shadow: 0 0 10px #8360c3;
}

.filters h3,
#sn,
#sbc {
	margin-bottom: 20px;
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

.tasks::-webkit-scrollbar {
	width: 12px;
}

.tasks::-webkit-scrollbar-track {
	background-color: #f5f5f5;
	border-radius: 10px;
}

.tasks::-webkit-scrollbar-thumb {
	background-color: rgb(152, 154, 238);
	border-radius: 10px;
}

.tasks h3 {
	color: rgb(152, 154, 238);
	height: 100%;
	display: flex;
	align-items: center;
}

.task {
	border: 3px solid #8360c3;
	padding: 15px;
	border-radius: 10px;
	background-color: #7273b9;

	width: 650px;
	height: auto;
	cursor: pointer;
}

.task .title {
	font-size: 23px;
	font-weight: 600;
	color: #fafafa;
}

.task div {
	display: flex;
	justify-content: space-between;
}

.task .border {
	border-bottom: 3px dashed #fafafa;
	padding-bottom: 10px;
}

.task .category {
	text-transform: uppercase;
	background-color: #fafafa;
	color: #8360c3;
	font-weight: 700;
	height: 32px;
	padding: 5px;
	border-radius: 5px;
}

.task p {
	margin-top: 5px;
	font-size: 18px;
	color: #fafafa;
}

.completed {
	text-decoration: line-through;
	text-decoration-color: #fafafa;
}

.routine {
	border-color: #155799;
	background-color: #2980d6;
}

.routine .category {
	color: #155799;
}

.else {
	border-color: #2ebf91;
	background-color: #2fe9ae;
}

.else .category {
	color: #2ebf91;
}

.study {
	border-color: #d76b26;
	background-color: #f88b47;
}

.study .category {
	color: #d76b26;
}

#title,
#description {
	margin-bottom: 15px;
}

.spare {
	width: 1140px;
	padding: 100px;
	border: 3px solid #8360c3;
	border-radius: 20px;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.spare h2 {
	margin-bottom: 5px;
	text-decoration: underline;
	transition: 0.2s all;
	text-shadow: none;
	font-size: 30px;
}

.spare p {
	font-size: 18px;
	color: #8360c3;
}

.spare h2:hover,
.spare span:hover {
	color: #2ebf91;
	cursor: pointer;
}

.spare span {
	text-decoration: underline;
	font-weight: 600;
	transition: 0.2s all;
}

@media (max-width: 768px) {
	.spare p {
		text-align: center;
	}
}

@media (max-width: 375px) {
	.spare {
		padding: 50px;
	}

	.spare h2 {
		font-size: 25px;
	}
}
</style>
