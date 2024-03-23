// Импорт "express" и создание сервера
const express = require("express");
const app = express();
const port = 3002;

// Добавление возможности POST-запросов
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Импорт и настройка CORS
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" }));

// Импорт "mongoose" и подключение к БД
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/simple-todo");

// Создание схемы
const userSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	email: {
		required: true,
		unique: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
	tasks: [
		{
			title: String,
			description: String,
			type: String,
			isCompleted: Boolean,
		},
	],
});

// Соединение схемы с коллекцией
const User = mongoose.model("user", userSchema);

// Запуск сервера
app.listen(port, () => {
	console.log(`Сервер запущен по адресу: http://localhost:${port}`);
});

// Роуты
app.get("/tasks/get", async (req, res) => {});

app.get("/tasks/complete", async (req, res) => {});

app.get("/tasks/create", async (req, res) => {});

app.get("/tasks/remove", async (req, res) => {});

app.post("/user/log-in", async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });

	if (user) {
		if (user.password === password) {
			res.send(user._id);
		} else {
			res.send("incorrect password");
		}
	} else {
		res.send("not registered");
	}
});

app.post("/user/sign-up", async (req, res) => {
	const { name, email, password } = req.body;

	let user = await User.findOne({ email: email });

	if (user) {
		res.send("already registered");
	} else {
		const newUser = new User({
			name: name,
			email: email,
			password: password,
			tasks: [],
		});

		try {
			await newUser.save();
			res.send(newUser._id);
		} catch {
			res.send("error");
		}
	}
});

app.get("/user/check", async (req, res) => {
	let id = req.query.id;

	let user = await User.findById(id);

	if (user) {
		res.send(true);
	} else {
		res.send(false);
	}
});