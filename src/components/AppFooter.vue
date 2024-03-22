<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const goProfile = () => {
	router.push("/profile");
};

const goMain = () => {
	router.push("/");
};
</script>

<template>
	<footer>
		<div class="wrapper">
			<ul class="socials">
				<a href="https://github.com/Qaddis" target="_blank">
					<svg style="width: 68.5px; height: 68.5px; margin: 0 !important">
						<use xlink:href="#github-svg" />
					</svg>
				</a>
				<a href="https://vk.com/qaddis" target="_blank">
					<svg>
						<use xlink:href="#telegram-svg" />
					</svg>
				</a>
				<a href="https://t.me/qaddis" target="_blank">
					<svg>
						<use xlink:href="#vk-svg" />
					</svg>
				</a>
			</ul>
			<p class="copyright">© 2024 Святослав "Qaddis" Барсуков</p>
			<nav>
				<ul>
					<li
						@click="goMain"
						class="nav-li"
						:class="[route.name == 'main' ? 'nav-li--active' : '']"
					>
						Главная
					</li>
					<li
						@click="goProfile"
						class="nav-li"
						:class="[route.name == 'profile' ? 'nav-li--active' : '']"
					>
						Профиль
					</li>
				</ul>
			</nav>
		</div>
	</footer>
</template>

<style scoped>
footer {
	padding: 50px 20px 20px;
	border-top: 3px solid var(--additional);
	background-color: var(--dark);
	color: var(--light);
	font-size: 18px;
}

.wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 20px;
}

.nav-li:hover {
	color: var(--lime);
}

.nav-li:active {
	transform: translateY(1px);
	opacity: 0.8;
}

.nav-li--active:active {
	opacity: 1;
	transform: none;
}

.nav-li--active:hover {
	color: var(--light);
}

.socials {
	display: flex;
	align-items: center;
	column-gap: 20px;
}

svg {
	width: 60px;
	height: 60px;
	fill: var(--light);
	margin: 0 4px;
	transition: all 0.2s;
}

a:hover svg {
	fill: var(--lime);
}

a:active svg {
	opacity: 0.8;
	transform: translateY(1px);
}
</style>
