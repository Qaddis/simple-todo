<script setup>
import { ref } from "vue";
import Cookies from "js-cookie";
import axios from "axios";

const props = defineProps({
	name: String,
	email: String,
	password: String,
});

const newName = ref(props.name);
const newEmail = ref(props.email);
const newPassword = ref(props.password);
</script>

<template>
	<div class="container">
		<h2>Изменить данные</h2>
		<div>
			<label for="name">Изменить имя: </label>
			<input type="text" id="name" v-model="newName" />
			<button>Изменить имя</button>
		</div>
		<div>
			<label for="email">Изменить email: </label>
			<input type="text" id="email" v-model="newEmail" />
			<button>Изменить email</button>
		</div>
		<div>
			<label for="password">Изменить пароль: </label>
			<input type="password" id="password" v-model="newPassword" />
			<button>Изменить пароль</button>
		</div>
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
</style>
