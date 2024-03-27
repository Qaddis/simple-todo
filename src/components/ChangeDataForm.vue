<script setup>
import { ref } from "vue";
import Cookies from "js-cookie";
import axios from "axios";

const props = defineProps({
	name: String,
	email: String,
	password: String,
	changeState: Function,
});

const error = ref("");
const isError = ref(false);
const newName = ref(props.name);
const newEmail = ref(props.email);
const newPassword = ref(props.password);

const showError = (msg) => {
	error.value = msg;
	setTimeout(() => {
		error.value = "";
	}, 3000);
};

async function changeName() {
	const user = Cookies.get("user");

	if (user) {
		if (newName.value.trim() != "") {
			const response = await axios.post("/user/change/name", {
				id: user,
				newName: newName.value.trim(),
			});

			if (response.data === "no such user") {
				Cookies.remove("user");
				props.changeState(false);
			} else if (response.data === "error") {
				isError.value = true;
				showError("Поле заполнено некорректно!");
			} else {
				isError.value = false;
				showError("Имя пользователя успешно изменено!");
			}
		} else {
			isError.value = true;
			showError("Поле заполнено некорректно!");
		}
	} else {
		props.changeState(false);
	}
}

async function changeEmail() {
	const user = Cookies.get("user");

	if (user) {
		if (newEmail.value.trim() != "") {
			const response = await axios.post("/user/change/email", {
				id: user,
				newEmail: newEmail.value.trim(),
			});

			if (response.data === "no such user") {
				Cookies.remove("user");
				props.changeState(false);
			} else if (response.data === "error") {
				isError.value = true;
				showError("Ошибка! Попробуйте ещё раз!");
			} else if (response.data === "email registered") {
				isError.value = true;
				showError("Данный e-mail уже зарегестрирован!");
			} else {
				props.changeState(response.data);
				isError.value = false;
				showError("E-mail успешно изменён!");
			}
		} else {
			isError.value = true;
			showError("Поле заполнено некорректно!");
		}
	} else {
		props.changeState(false);
	}
}

async function changePassword() {
	const user = Cookies.get("user");

	if (user) {
		if (newPassword.value.trim() != "") {
			const response = await axios.post("/user/change/password", {
				id: user,
				newPassword: newPassword.value.trim(),
			});

			if (response.data === "no such user") {
				Cookies.remove("user");
				props.changeState(false);
			} else if (response.data === "error") {
				isError.value = true;
				showError("Поле заполнено некорректно!");
			} else {
				props.changeState(response.data);
				isError.value = false;
				showError("Пароль успешно изменён!");
			}
		} else {
			isError.value = true;
			showError("Поле заполнено некорректно!");
		}
	} else {
		props.changeState(false);
	}
}
</script>

<template>
	<div class="container">
		<h2>Изменить данные</h2>
		<div>
			<label for="name">Изменить имя: </label>
			<input type="text" id="name" v-model="newName" />
			<button @click="changeName">Изменить имя</button>
		</div>
		<div>
			<label for="email">Изменить email: </label>
			<input type="text" id="email" v-model="newEmail" />
			<button @click="changeEmail">Изменить email</button>
		</div>
		<div>
			<label for="password">Изменить пароль: </label>
			<input type="password" id="password" v-model="newPassword" />
			<button @click="changePassword">Изменить пароль</button>
		</div>
		<span :class="[isError ? 'error' : 'success']" v-if="error != ''">
			{{ error }}
		</span>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	row-gap: 25px;
}

.container div {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

input {
	width: 350px;
}

span.error {
	color: lightcoral;
	margin-top: 10px;
	text-align: center;
}

span.success {
	color: lawngreen;
	margin-top: 10px;
	text-align: center;
}
</style>
