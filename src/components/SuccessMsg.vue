<template>
	<div class="p-6">
		<div
			class="w-full border shadow-md shadow-slate-400 relative border-primaryGreen bg-white flex flex-col items-center justify-center mt-6 gap-5 p-6 overflow-hidden rounded-lg"
		>
			<div class="w-full grid grid-rows-1 grid-cols-3 absolute top-0">
				<div class="w-full bg-primaryBlue h-2"></div>
				<div class="w-full bg-primaryGreen h-2"></div>
				<div class="w-full bg-primaryYellow h-2"></div>
			</div>
			<img src="../assets/success.png" alt="success" class="w-24" />
			<h1 class="text-xl text-gray-800">Berhasil dikirim</h1>
			<button class="btn-send mb-3" @click="$emit('home')">Selesai</button>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
