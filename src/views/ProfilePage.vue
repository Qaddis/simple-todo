<script setup>
import { ref, onMounted } from "vue";
import Cookies from "js-cookie";
import axios from "axios";

import GoLogin from "../components/GoLogin.vue";

const userData = ref("loading");
const mailType = ref("password");
const mailTypeSymbol = ref("?");

const changeMailType = () => {
	mailType.value = mailType.value === "password" ? "text" : "password";
	mailTypeSymbol.value = mailTypeSymbol.value === "?" ? "!" : "?";
};

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
	<section v-else>
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
			<input type="password" />
			<button>Продолжить</button>
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
	padding: 5px 10px;
	border: 3px solid var(--additional);
	border-radius: 5px;
	color: var(--dark);
	text-align: center;
	transition: border 0.2s;
}

.to-change input:focus {
	border-color: var(--violet);
}

.to-change button {
	padding: 10px 20px;
	background-color: var(--violet);
	color: var(--light);
	border-radius: 10px;
	transition: all 0.2s;
}

.to-change button:hover {
	background-color: var(--lime);
}

.to-change button:active {
	opacity: 0.8;
	transform: translateY(1px);
}
</style>
