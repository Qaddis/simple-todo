<script setup>
const props = defineProps({
	id: String,
	title: String,
	description: String,
	category: String,
	isCompleted: Boolean,
	clickHandler: Function,
});
</script>

<template>
	<div
		class="task-card"
		:class="[props.category, { completed: props.isCompleted }]"
	>
		<div>
			<div>
				<span class="title">
					{{ props.title }}
				</span>
				<span class="category">{{ props.category }}</span>
			</div>
			<button @click.stop="props.clickHandler(props.id)">X</button>
		</div>
		<p v-if="props.description != ''" class="border">
			{{ props.description }}
		</p>
	</div>
</template>

<style scoped>
.task-card {
	border: 3px solid #8360c3;
	padding: 15px;
	border-radius: 10px;
	background-color: #7273b9;

	width: 650px;
	height: auto;
	cursor: pointer;
}

.task-card div {
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 10px;
}

.title {
	font-size: 23px;
	font-weight: 600;
	color: var(--light);
}

.task-card .border {
	border-top: 2px dashed var(--light);
	padding-top: 5px;
}

.category {
	text-transform: uppercase;
	background-color: var(--light);
	color: #8360c3;
	font-weight: 700;
	height: 32px;
	padding: 5px;
	border-radius: 5px;
}

p {
	margin-top: 5px;
	font-size: 18px;
	color: var(--light);
}

button {
	font-family: var(--header-font);
	color: var(--light);
	padding: 5px 10px;
	background-color: rgba(0, 0, 0, 0.2);
	border-radius: 5px;
	transition: 0.14s all;
}

button:hover,
button:focus-visible {
	background-color: rgba(0, 0, 0, 0.4);
	outline: none;
}

button:active {
	transform: translateY(1px);
	opacity: 0.8;
}

.completed {
	filter: grayscale(50%);
}

.completed .title,
.completed p {
	text-decoration: line-through;
	text-decoration-color: var(--light);
}

.routine {
	border-color: #155799;
	background-color: #2980d6;
}

.routine .category {
	color: #155799;
}

.else {
	border-color: #2ebf91;
	background-color: #2fe9ae;
}

.else .category {
	color: #2ebf91;
}

.study {
	border-color: #d76b26;
	background-color: #f88b47;
}

.study .category {
	color: #d76b26;
}
</style>
