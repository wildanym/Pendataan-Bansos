<template>
	<nav
		class="h-14 w-full bg-white shadow-md shadow-gray-400 flex items-center justify-center px-4 font-bold relative font-roboto z-20"
	>
		<div class="flex w-full max-w-xl justify-between">
			<div class="flex items-center">
				<img src="./assets/logo.png" alt="logo jds" class="w-20" />
			</div>
			<div class="text-right text-sm">
				<h1 class="text-xl font-bold text-lowEmphasis">Pendataan Bansos</h1>
				<h2 class="font-medium text-lowEmphasis">Komplek Panghegar</h2>
			</div>
		</div>
	</nav>
	<main class="h-screen font-roboto bg-bgGray">
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
