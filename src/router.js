import { createRouter, createWebHistory } from "vue-router";

import MainPage from "./views/MainPage.vue";
import ProfilePage from "./views/PorfilePage.vue";

export default createRouter({
	history: createWebHistory(),

	routes: [
		{
			path: "/",
			name: "main",
			component: MainPage,
		},
		{
			path: "/profile",
			name: "profile",
			component: ProfilePage,
		},
	],
});
