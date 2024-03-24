import { createApp } from "vue";
import "./css/style.css";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3002";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
