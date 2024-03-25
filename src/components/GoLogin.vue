<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
	<div>
		<h2>
			<span @click="router.push('/log-in')">Войдите</span>, чтобы продолжить
		</h2>
	</div>
</template>

<style scoped>
div {
	width: 100%;
	min-height: calc(100vh - 500px);
	display: flex;
	align-items: center;
	justify-content: center;
}

h2 {
	color: var(--dark);
}

span {
	display: inline-block;
	cursor: pointer;
	color: var(--violet);
	text-decoration: underline;
	transition: all 0.2s;
}

span:hover {
	color: var(--lime);
}

span:active {
	opacity: 0.8;
	transform: translateY(1px);
}
</style>
