import { createRouter, createWebHistory } from "vue-router";

import MainPage from "./views/MainPage.vue";
import ProfilePage from "./views/ProfilePage.vue";
import LoginPage from "./views/LoginPage.vue";
import SignupPage from "./views/SignupPage.vue";

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
		{
			path: "/log-in",
			name: "log-in",
			component: LoginPage,
		},
		{
			path: "/sign-up",
			name: "sign-up",
			component: SignupPage,
		},
	],
});
