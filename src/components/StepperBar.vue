<template>
	<div
		class="flex justify-between items-center text-gray-600 bg-white border border-white border-t-gray-100 shadow-md p-2 rounded-3xl"
	>
		<div class="flex justify-between items-center w-full px-2 py-1">
			<div v-if="page === 0" class="border-4 border-primaryYellow stepper">
				<span>1</span>
			</div>
			<div v-if="page > 0" class="border-4 border-primaryGreen h-8 w-8 stepper">
				<img src="../assets/ok.png" alt="ok" class="h-5 w-5" />
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
				<img src="../assets/ok.png" alt="ok" class="h-5 w-5" />
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
				<img src="../assets/ok.png" alt="ok" class="h-5 w-5" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["page"],
};
</script>
