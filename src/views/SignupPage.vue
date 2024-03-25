<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

const router = useRouter();

const email = ref("");
const name = ref("");
const password = ref("");
const error = ref("");

const showError = (msg) => {
	error.value = msg;
	setTimeout(() => {
		error.value = "";
	}, 3000);
};

const newUser = async (evt) => {
	evt.preventDefault();

	if (
		email.value.trim() != "" &&
		name.value.trim() != "" &&
		password.value.trim() != ""
	) {
		let response = await axios.post("/user/sign-up", {
			email: email.value.trim(),
			name: name.value.trim(),
			password: password.value.trim(),
		});

		if (response.data === "already registered") {
			showError("Данный e-mail уже зарегестрирован!");
		} else if (response.data === "error") {
			showError("Ошибка! Попробуйте ещё раз!");
		} else {
			Cookies.set("user", response.data, { expires: 30, path: "" });
			router.push("/profile");
		}
	} else {
		showError("Не все поля заполнены корректно!");
	}
};

onMounted(async () => {
	let user = Cookies.get("user");

	if (user) {
		let response = await axios.get("/user/check", { params: { id: user } });

		if (response.data) {
			router.push("/profile");
		} else {
			Cookies.remove("user");
		}
	}
});
</script>

<template>
	<section>
		<h2>Зарегестрироваться</h2>
		<form class="login-form">
			<label for="nameInput">Имя:</label>
			<input type="text" placeholder="Иван" id="nameInput" v-model="name" />

			<label for="emailInput">E-mail:</label>
			<input
				type="text"
				placeholder="ivanov2007@gmail.com"
				id="emailInput"
				v-model="email"
			/>

			<label for="passwordInput">Пароль:</label>
			<input type="password" id="passwordInput" v-model="password" />

			<button @click="newUser" type="submit">Зарегестрироваться</button>

			<span class="errors" :class="[error != '' ? '--active' : '']">
				{{ error }}
			</span>

			<span class="link" @click="router.push('/log-in')">
				Уже есть аккаунт? Войти
			</span>
		</form>
	</section>
</template>

<style scoped>
section {
	width: auto;
	padding: 20px;
	border: 3px solid var(--violet);
	border-image: linear-gradient(
		135deg,
		var(--violet) 10%,
		transparent 30%,
		transparent 70%,
		var(--violet) 90%
	);
	border-image-slice: 1;
	color: var(--dark);
}

h2 {
	text-align: center;
	margin-bottom: 25px;
}
</style>
