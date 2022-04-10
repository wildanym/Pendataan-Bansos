<template>
	<nav
		class="h-14 w-full bg-lowEmphasis shadow-md shadow-gray-500 flex items-center px-4 font-bold text-white relative font-roboto z-20"
	>
		<h1 class="text-xl">Pendataan Bansos</h1>
	</nav>
	<main class="h-screen font-roboto">
		<div class="mx-auto max-w-xl">
			<Home />
		</div>
	</main>
</template>

<script>
import Home from "./components/Home.vue";
export default {
	name: "App",
	components: { Home },
};
</script>

<style src="./assets/main.css"></style>
