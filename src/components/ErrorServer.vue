<template>
	<div class="w-10/12 error-page-content">
		<div class="w-full grid grid-rows-1 grid-cols-3 absolute top-0">
			<div class="w-full bg-primaryBlue h-2"></div>
			<div class="w-full bg-primaryGreen h-2"></div>
			<div class="w-full bg-primaryYellow h-2"></div>
		</div>
		<div class="flex flex-col items-center text-center">
			<img src="../assets/errorServer.png" alt="error" class="w-24" />
			<h1 class="text-xl font-bold">Terjadi kesalahan pada server</h1>
			<div class="my-2">
				<p class="text-sm">
					Mohon maaf atas ketidak nyamanannya, Sepertinya Server Kami sedang
					mengalami masalah. Silahkan coba beberapa saat lagi.
				</p>
			</div>
		</div>
		<div class="flex gap-4 mb-3">
			<button
				class="btn h-12 pb-4 btn-send"
				@click="$emit('send')"
				:disabled="loading"
			>
				<div
					v-if="loading == true"
					style="border-top-color: transparent"
					class="loading-animate"
				></div>
				<span v-if="loading == false">Coba lagi</span>
			</button>
			<button class="btn btn-prev" @click="$emit('closed')">Kembali</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ["loading"],
};
</script>

<style></style>
