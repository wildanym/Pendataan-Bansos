<template>
	<div class="flex justify-between items-center text-gray-600">
		<div class="flex justify-between items-center w-full">
			<div v-if="page === 0" class="border-4 border-primaryYellow stepper">
				<span>1</span>
			</div>
			<div v-if="page > 0" class="border-4 border-primaryGreen h-8 w-8 stepper">
				<span>✔</span>
			</div>

			<div class="w-24 h-[.12rem] bg-primaryBlue"></div>
			<!-- step 2 -->
			<div v-if="page < 1" class="border-4 border-gray-400 h-8 w-8 stepper">
				<span>2</span>
			</div>
			<div
				v-if="page === 1"
				class="border-4 border-primaryYellow h-8 w-8 stepper"
			>
				<span>2</span>
			</div>
			<div v-if="page > 1" class="border-4 border-primaryGreen h-8 w-8 stepper">
				<span>✔</span>
			</div>

			<div class="w-24 h-[.12rem] bg-primaryBlue"></div>
			<!-- step 3 -->
			<div v-if="page < 2" class="border-4 border-gray-400 h-8 w-8 stepper">
				<span>3</span>
			</div>
			<div
				v-if="page === 2"
				class="border-4 border-primaryYellow h-8 w-8 stepper"
			>
				<span>3</span>
			</div>
			<div v-if="page > 2" class="border-4 border-primaryGreen h-8 w-8 stepper">
				<span>✔</span>
			</div>

			<!-- <div class="w-16 h-[.12rem] bg-primaryBlue"></div> -->
			<!-- step 4 -->
			<!-- <div v-if="page < 3" class="border-4 border-gray-400 h-8 w-8 stepper">
				<span>4</span>
			</div>
			<div
				v-if="page === 3"
				class="border-4 border-primaryYellow h-8 w-8 stepper"
			>
				<span>4</span>
			</div>
			<div v-if="page > 3" class="border-4 border-primaryGreen h-8 w-8 stepper">
				<span>4</span>
			</div> -->
		</div>
	</div>
</template>

<script>
export default {
	props: ["page"],
};
</script>

<style></style>
