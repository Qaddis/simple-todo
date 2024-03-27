<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import axios from "axios";

import GoLogin from "../components/GoLogin.vue";
import ChangeDataForm from "../components/ChangeDataForm.vue";

const userData = ref("loading");
const changeData = ref(false);
const mailType = ref("password");
const mailTypeSymbol = ref("?");
const password = ref("");
const error = ref("");

const changeMailType = () => {
	mailType.value = mailType.value === "password" ? "text" : "password";
	mailTypeSymbol.value = mailTypeSymbol.value === "?" ? "!" : "?";
};

const showError = (msg) => {
	error.value = msg;
	setTimeout(() => {
		error.value = "";
	}, 3000);
};

const changeUserData = (value) => {
	userData.value = value;
};

async function toChangeData() {
	const user = Cookies.get("user");

	if (user) {
		if (password.value.trim() != "") {
			const response = await axios.post("/user/to-change-data", {
				id: user,
				password: password.value,
			});

			if (response.data) {
				changeData.value = true;
			} else if (response.data === "no such user") {
				Cookies.remove("user");
				userData.value = false;
			} else {
				showError("Ошибка! Неправильный пароль!");
				password.value = "";
			}
		} else {
			showError("Ошибка! Поле заполнено некорректно!");
		}
	} else {
		userData.value = false;
	}
}

async function checkAuth() {
	const user = Cookies.get("user");

	if (user) {
		const response = await axios.post("/user/get", { id: user });

		userData.value = response.data;

		if (!response.data) {
			Cookies.remove("user");
		}
	} else {
		userData.value = false;
	}
}

onMounted(checkAuth);
</script>

<template>
	<section v-if="userData === 'loading'">
		<h2>Загрузка...</h2>
	</section>
	<section v-else-if="!userData">
		<GoLogin />
	</section>
	<section v-else-if="changeData && userData">
		<ChangeDataForm
			:name="userData.name"
			:email="userData.email"
			:password="userData.password"
			:changeState="changeUserData"
		/>
	</section>
	<section v-else-if="!changeData && userData">
		<h2>Профиль</h2>
		<div class="inf">
			<h3>{{ userData.name }}</h3>
			<div>
				<input disabled :type="mailType" :value="userData.email" />
				<button class="mailType" @click="changeMailType">
					{{ mailTypeSymbol }}
				</button>
			</div>
		</div>
		<div class="to-change">
			<h3>Введите <span>пароль</span>, чтобы изменить данные</h3>
			<input type="password" v-model="password" />
			<button @click="toChangeData">Продолжить</button>

			<span class="error" v-if="error != ''">{{ error }}</span>
		</div>
	</section>
</template>

<style scoped>
.inf,
.to-change {
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 10px;
}

.inf h3 {
	color: var(--additional);
}

.inf input:disabled {
	width: 300px;
	color: var(--dark);
	border: 3px solid var(--additional);
	border-right: none;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	text-align: center;
	padding: 5px 5px;
}

.mailType {
	width: 30px;
	padding: 5px;
	border: 3px solid var(--additional);
	border-left: none;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	background-color: var(--violet);
	color: var(--light);
}

.to-change {
	margin-top: 50px;
	border: 3px dashed var(--additional);
	border-radius: 10px;
	padding: 25px;
}

.to-change h3 {
	margin-bottom: 5px;
	color: var(--dark);
}

.to-change span {
	color: var(--violet);
}

.to-change input {
	width: 300px;
}

.error {
	margin-top: 15px;
	color: lightcoral !important;
	transition: opacity 0.2s;
}
</style>
