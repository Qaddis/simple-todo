<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const showError = (msg) => {
	error.value = msg;
	setTimeout(() => {
		error.value = "";
	}, 3000);
};

const logIn = async (evt) => {
	evt.preventDefault();

	if (email.value.trim() != "" && password.value.trim() != "") {
		let response = await axios.post("/user/log-in", {
			email: email.value.trim(),
			password: password.value.trim(),
		});

		if (response.data === "not registered") {
			showError("Данный e-mail не зарегестрирован!");
		} else if (response.data === "incorrect password") {
			showError("Неправильный пароль!");
		} else {
			Cookies.set("user", response.data, { expires: 30, path: "" });
			router.push("/");
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
		<h2>Войти</h2>
		<form class="login-form">
			<label for="emailInput">E-mail:</label>
			<input
				type="text"
				placeholder="ivanov2007@gmail.com"
				id="emailInput"
				v-model="email"
			/>

			<label for="passwordInput">Пароль:</label>
			<input type="password" id="passwordInput" v-model="password" />

			<button @click="logIn" type="submit">Войти</button>

			<span class="errors" :class="[error != '' ? '--active' : '']">
				{{ error }}
			</span>

			<span class="link" @click="router.push('/sign-up')">
				Нет аккаунта? Зарегестрироваться
			</span>
		</form>
	</section>
</template>

<style scoped>
section {
	width: auto;
	padding: 20px;
	border: 3px solid var(--lime);
	border-image: linear-gradient(
		45deg,
		var(--lime) 10%,
		transparent 30%,
		transparent 70%,
		var(--lime) 90%
	);
	border-image-slice: 1;
	color: var(--dark);
}

h2 {
	text-align: center;
	margin-bottom: 25px;
}

button {
	width: 250px;
}

input {
	width: 300px;
	margin-bottom: 20px;
}
</style>
