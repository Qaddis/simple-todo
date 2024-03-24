<script setup>
const props = defineProps({
	title: String,
	description: String,
	category: String,
	isCompleted: Boolean,
});
</script>

<template>
	<div class="task-card" :class="props.category">
		<div :class="{ border: props.description != '' }">
			<span :class="{ completed: props.isCompleted }" class="title">
				{{ props.title }}
			</span>
			<span class="category">{{ props.category }}</span>
		</div>
		<p v-if="props.description != ''" :class="{ completed: props.isCompleted }">
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
}

.title {
	font-size: 23px;
	font-weight: 600;
	color: var(--light);
}

.task-card .border {
	border-bottom: 2px dashed #8360c3;
	padding-bottom: 10px;
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

.completed {
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
