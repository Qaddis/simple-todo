<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
</script>

<template>
	<header>
		<div class="wrapper">
			<h1 @click="router.push('/')">Simple ToDo</h1>

			<nav>
				<ul>
					<li
						@click="router.push('/')"
						class="nav-li"
						:class="[route.name == 'main' ? 'nav-li--active' : '']"
					>
						Главная
					</li>
					<li
						@click="router.push('/profile')"
						class="nav-li"
						:class="[route.name == 'profile' ? 'nav-li--active' : '']"
					>
						Профиль
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<style scoped>
header {
	padding: 10px 20px;
	background: linear-gradient(90deg, var(--lime), var(--violet));
}

.wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

h1 {
	color: var(--dark);
}

li {
	color: var(--dark);
}

.nav-li:hover {
	color: var(--additional);
}

.nav-li:active {
	transform: translateY(1px);
}

.nav-li--active:hover {
	color: var(--dark);
}

.nav-li--active:active {
	transform: none;
}
</style>
