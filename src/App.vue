<script setup>
import { RouterView } from "vue-router";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
	<AppHeader />

	<main>
		<div class="wrapper">
			<RouterView />
		</div>
	</main>

	<AppFooter />
</template>

<style scoped>
main {
	width: 100%;
	height: auto;
	padding: 50px 20px;
}

.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
