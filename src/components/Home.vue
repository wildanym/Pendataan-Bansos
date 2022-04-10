<template>
	<div class="max-w-xl m-auto bg-white relative">
		<div v-if="errorPage == true" class="error-page">
			<component
				:is="errorType"
				@closed="close"
				@send="nextStep"
				:loading="loading"
			></component>
		</div>
		<div v-if="errorPage == false" class="w-full p-5">
			<stepperBar :page="currentStep"></stepperBar>
		</div>
		<div class="p-3 relative">
			<Form
				@submit="nextStep"
				:validation-schema="currentSchema"
				v-slot="{ handleSubmit }"
			>
				<template v-if="currentStep === 0">
					<div class="flex flex-col gap-4">
						<div>
							<label for="name" class="font-bold text-lowEmphasis">Nama</label>
							<Field
								type="text"
								class="input-style"
								placeholder="Nama lengkap"
								name="nama"
								id="nama"
								v-model="formValues.nama"
							/>
							<ErrorMessage name="nama" class="text-red-500 text-sm" />
						</div>
						<div>
							<div class="relative">
								<label for="nik" class="font-bold text-lowEmphasis">NIK</label>
								<Field
									class="input-style"
									name="nik"
									id="nik"
									placeholder="16 Digit NIK"
									oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
									maxlength="16"
									type="number"
									v-model="formValues.nik"
								/>
								<span class="text-xs text-gray-400 absolute -bottom-5 right-1"
									>{{
										formValues.nik == undefined ? 0 : formValues.nik.length
									}}/16</span
								>
							</div>
							<ErrorMessage name="nik" class="text-red-500 text-sm" />
						</div>
						<div>
							<div class="relative">
								<label for="nik" class="font-bold text-lowEmphasis"
									>No Kartu Keluarga</label
								>
								<Field
									class="input-style"
									name="nkk"
									id="nkk"
									placeholder="16 Digit No Kartu Keluarga"
									oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
									maxlength="16"
									type="number"
									v-model="formValues.nkk"
								/>
								<span class="text-xs text-gray-400 absolute -bottom-5 right-1"
									>{{
										formValues.nkk == undefined ? 0 : formValues.nkk.length
									}}/16</span
								>
							</div>
							<ErrorMessage name="nkk" class="text-red-500 text-sm" />
						</div>
						<div>
							<label for="umur" class="font-bold text-lowEmphasis">Umur</label>
							<Field
								type="number"
								class="input-style"
								name="umur"
								id="umur"
								placeholder="Umur minimal 25 tahun"
								v-model="formValues.umur"
							/>
							<ErrorMessage name="umur" class="text-red-500 text-sm" />
						</div>
						<div>
							<p class="font-bold text-lowEmphasis">Jenis Kelamin</p>
							<div
								class="grid grid-rows-1 grid-cols-2 border border-gray-400 mt-1 divide-x-2 rounded-md"
							>
								<div class="flex items-center p-2">
									<Field
										type="radio"
										name="jk"
										id="lakilaki"
										value="Laki-laki"
										v-model="formValues.jk"
										class="text-primaryGreen"
									/>
									<label class="ml-3 w-full" for="lakilaki">Laki-laki</label>
								</div>
								<div class="flex items-center p-2">
									<Field
										type="radio"
										name="jk"
										id="perempuan"
										value="wanita"
										v-model="formValues.jk"
										class="text-primaryGreen"
									/>
									<label class="ml-3 w-full" for="perempuan">Perempuan</label>
								</div>
							</div>
							<ErrorMessage name="jk" class="text-red-500 text-sm" />
						</div>
						<div>
							<div class="relative">
								<label for="alamat" class="font-bold text-lowEmphasis"
									>Alamat</label
								>
								<Field
									type="text"
									class="input-style relative"
									name="alamat"
									maxlength="255"
									id="alamat"
									placeholder="Alamat sesuai KTP"
									v-model="formValues.alamat"
								/>
								<span class="text-xs text-gray-400 absolute -bottom-5 right-1"
									>{{
										formValues.alamat == undefined
											? 0
											: formValues.alamat.length
									}}/255</span
								>
							</div>
							<ErrorMessage name="alamat" class="text-red-500 text-sm" />
						</div>
						<div class="grid grid-rows-1 grid-cols-2 mt-4 rounded-md">
							<div>
								<div class="flex items-center pr-2">
									<label for="rt" class="pr-2 font-bold text-lowEmphasis"
										>RT
									</label>
									<Field
										type="number"
										class="input-style"
										name="rt"
										id="rt"
										v-model="formValues.rt"
									/>
								</div>
								<ErrorMessage name="rt" class="text-red-500 text-sm" />
							</div>
							<div>
								<div class="flex items-center pr-2">
									<label for="rw" class="pr-2 font-bold text-lowEmphasis"
										>RW
									</label>
									<Field
										type="number"
										class="input-style"
										name="rw"
										id="rw"
										v-model="formValues.rw"
									/>
								</div>
								<ErrorMessage name="rw" class="text-red-500 text-sm" />
							</div>
						</div>
					</div>
				</template>

				<template v-if="currentStep === 1">
					<div class="grid gap-2 mb-4">
						<p class="font-bold text-lowEmphasis">Foto KTP</p>
						<div class="flex">
							<div
								class="w-32 h-10 flex items-center justify-around bg-primaryGreen rounded-md overflow-hidden"
							>
								<label
									for="fotoktp"
									class="bg-primaryGreen text-white cursor-pointer ml-1"
									>Tambah File
								</label>
								<span class="text-white text-2xl items-center pb-1">+</span>
							</div>
							<Field
								type="file"
								name="fotoktp"
								id="fotoktp"
								accept=".jpg,.jpeg,.png,.bmp"
								class="input-file rounded-r-md hidden"
								@change="getFileKtp"
								v-model="formValues.fotoktp"
							/>
						</div>
						<div class="w-full p-2 border border-gray-400 relative rounded-md">
							<span class="text-xs text-gray-400 absolute -top-6 right-1"
								>Ukuran Foto Maks 2 MB</span
							>
							<span class="text-sm">
								{{
									fileKtp.length > 0 ? fileKtp : "Tidak ada file yang dipilih"
								}}</span
							>
						</div>
						<ErrorMessage name="fotoktp" class="text-red-500 text-sm" />
					</div>

					<div class="grid gap-2">
						<p class="font-bold text-lowEmphasis">Foto Kartu Keluarga</p>
						<div class="flex">
							<div
								class="w-32 h-10 flex items-center justify-around bg-primaryGreen rounded-md overflow-hidden"
							>
								<label
									for="fotokk"
									class="bg-primaryGreen text-white cursor-pointer ml-1"
									>Tambah File
								</label>
								<span class="text-white text-2xl items-center pb-1">+</span>
							</div>
							<Field
								type="file"
								name="fotokk"
								id="fotokk"
								accept=".jpg,.jpeg,.png,.bmp"
								class="input-file rounded-r-md hidden"
								@change="getFileKk"
								v-model="formValues.fotokk"
							/>
						</div>
						<div
							class="w-full flex items-center p-2 border border-gray-400 relative rounded-md"
						>
							<div class="text-gray-400 absolute -top-6 right-1">
								<span class="text-xs">Ukuran Foto Maks 2 MB</span>
							</div>
							<span class="text-sm">
								{{ fileKk.length > 0 ? fileKk : "Tidak ada file yang dipilih" }}
							</span>
						</div>
						<ErrorMessage name="fotokk" class="text-red-500 text-sm" />
					</div>
				</template>

				<template v-if="currentStep === 2">
					<div class="mb-6">
						<label for="psebelum" class="font-bold text-lowEmphasis"
							>Penghasilan sebelum pandemi</label
						>
						<Field
							type="number"
							class="input-style mt-1"
							name="pSebelum"
							id="psebelum"
							placeholder="Contoh : 2000000"
							v-model="formValues.pSebelum"
						/>
						<ErrorMessage name="pSebelum" class="text-red-500 text-sm" />
					</div>
					<div>
						<label for="psebelum" class="font-bold text-lowEmphasis"
							>Penghasilan sesudah pandemi</label
						>
						<Field
							type="number"
							class="input-style mt-1"
							name="pSesudah"
							id="psesudah"
							placeholder="Contoh : 2000000"
							v-model="formValues.pSesudah"
						/>
						<ErrorMessage name="pSesudah" class="text-red-500 text-sm" />
					</div>
					<!-- alasan -->
					<div class="grid gap-2 mt-4">
						<p class="font-bold text-lowEmphasis">Alasan membutuhkan bantuan</p>
						<div class="flex items-start gap-2">
							<div>
								<Field
									type="radio"
									name="alasan"
									id="alasansatu"
									value="Kehilangan pekerjaan"
									@change="hideLainnya"
									v-model="formValues.alasan"
									class="text-primaryGreen"
								/>
							</div>
							<div>
								<label for="alasansatu">Kehilangan pekerjaan</label>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<div>
								<Field
									type="radio"
									name="alasan"
									id="alasandua"
									value="Kepala keluarga terdampak atau korban Covid"
									@change="hideLainnya"
									v-model="formValues.alasan"
									class="text-primaryGreen"
								/>
							</div>
							<div>
								<label class="w-full" for="alasandua"
									>Kepala keluarga terdampak atau korban Covid</label
								>
							</div>
						</div>
						<div class="flex items-start gap-2">
							<div>
								<Field
									type="radio"
									name="alasan"
									id="alasantiga"
									value="Tergolong fakir/miskin semenjak sebelum Covid"
									@change="hideLainnya"
									v-model="formValues.alasan"
									class="text-primaryGreen"
								/>
							</div>
							<div>
								<label class="w-full" for="alasantiga"
									>Tergolong fakir/miskin semenjak sebelum Covid</label
								>
							</div>
						</div>
						<div class="gap-2">
							<label class="mr-1 flex items-center" for="btnlainnya">
								<Field
									type="radio"
									name="alasan"
									id="btnlainnya"
									value="lainnya"
									ref="btnlainnya"
									v-model="formValues.alasan"
									@change="lainnya"
									class="text-primaryGreen mr-2"
								/>
								Lainnya
								<Field
									type="text"
									name="alasanlainnya"
									id="inputlainnya"
									placeholder="Tuliskan alasan ..."
									:disabled="inputAlasan"
									v-model="formValues.alasanlainnya"
									class="input-style w-full ml-2"
								/>
							</label>
						</div>
						<ErrorMessage name="alasan" class="text-red-500 text-sm" />
						<ErrorMessage name="alasanlainnya" class="text-red-500 text-sm" />
						<div class="relative">
							<Field
								name="terms"
								type="checkbox"
								id="terms"
								class="text-primaryGreen mr-2 absolute peer top-7 left-3"
								value="true"
								v-model="formValues.terms"
							/>
							<div
								class="border-2 border-red-500 bg-red-100 mt-4 p-2 rounded-md peer-checked:border-primaryGreen peer-checked:bg-green-100"
							>
								<label
									for="terms"
									class="text-sm font-bold text-lowEmphasis ml-7"
								>
									Saya menyatakan bahwa data yang diisikan adalah benar dan siap
									mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam
									data tersebut</label
								>
							</div>
							<ErrorMessage name="terms" class="text-red-500 text-sm" />
						</div>
					</div>
				</template>

				<template v-if="currentStep === 3">
					<SuccessMsg @home="home" />
				</template>

				<button
					class="btn-prev"
					v-if="currentStep !== 0 && currentStep < 3 && errorPage == false"
					type="button"
					@click="prevStep"
				>
					Sebelumnya
				</button>

				<button
					class="btn-next"
					v-if="currentStep !== 2 && currentStep < 3 && errorPage == false"
					type="submit"
				>
					Selanjutnya
				</button>

				<button
					v-if="currentStep === 2 && errorPage == false"
					class="btn-send absolute"
					type="submit"
					:disabled="loading"
				>
					<div
						v-if="loading == true"
						style="border-top-color: transparent"
						class="w-6 h-6 mx-auto border-4 border-white border-solid rounded-full animate-spin"
					></div>
					<span v-if="loading == false">Kirim</span>
				</button>
			</Form>
		</div>
	</div>
</template>

<script>
import StepperBar from "./StepperBar.vue";
import SuccessMsg from "./SuccessMsg.vue";
import ErrorServer from "./ErrorServer.vue";
import ErrorClient from "./ErrorClient.vue";
import { Form, Field, ErrorMessage, resetForm } from "vee-validate";
import * as yup from "yup";
import { ref, reactive, computed, getCurrentInstance, onMounted } from "vue";
import { number } from "yup/lib/locale";

export default {
	components: {
		StepperBar,
		Form,
		Field,
		ErrorMessage,
		SuccessMsg,
		ErrorServer,
		ErrorClient,
	},
	data() {
		return {
			inputAlasan: true,
		};
	},
	setup: () => {
		const fileKtp = ref("");
		const fileKk = ref("");
		const loading = ref(false);
		const errorPage = ref(false);
		const errorType = ref("");
		const currentStep = ref(0);
		const formValues = reactive({});
		const SUPPORTED_FORMATS = [
			"image/jpg",
			"image/jpeg",
			"image/png",
			"image/bmp",
		];
		const schemas = [
			yup.object({
				nama: yup.string().required("Harap isi data ini"),
				nik: yup
					.number()
					.test("nik", "NIK harus 16 digit", () => {
						if (formValues.nik != undefined) {
							return formValues.nik.length == 16;
						}
					})
					.transform((value) => (isNaN(value) ? undefined : value))
					.required("Harap isi data ini"),
				nkk: yup
					.number()
					.transform((value) => (isNaN(value) ? undefined : value))
					.required("Harap isi data ini"),
				umur: yup
					.number()
					.test("umur", "Umur minimal 25 tahun", (value) => {
						return value && value >= 25;
					})
					.transform((value) => (isNaN(value) ? undefined : value))
					.required("Harap isi data ini"),
				jk: yup.string().required("Pilih salah satu"),
				alamat: yup.string().required("Harap isi data ini"),
				rt: yup
					.number()
					.test("rt", "No RT tidak terdaftar", (value) => {
						return value && value <= 13;
					})
					.transform((value) => (isNaN(value) ? undefined : value))
					.required("Harap isi data ini"),
				rw: yup
					.number()
					.test("rw", "No RW tidak terdaftar", (value) => {
						return value && value <= 9;
					})
					.transform((value) => (isNaN(value) ? undefined : value))
					.required("Harap isi data ini"),
			}),
			yup.object({
				fotoktp: yup
					.mixed()
					.test(
						"fileType",
						"Pilih file JPG, PNG, JPEG atau BMP",
						function (value) {
							if (value) {
								return SUPPORTED_FORMATS.includes(value[0].type);
							}
						}
					)
					.test("fileSize", "Ukuran foto terlalu besar, maks 2 MB", (value) => {
						if (value) {
							return value && value[0].size < 2000000;
						}
					})
					.required("Foto belum di pilih"),
				fotokk: yup
					.mixed()
					.test(
						"fileType",
						"Pilih file JPG, PNG, JPEG atau BMP",
						function (value) {
							if (value) {
								return SUPPORTED_FORMATS.includes(value[0].type);
							}
						}
					)
					.test("fileSize", "Ukuran foto terlalu besar, maks 2 MB", (value) => {
						if (value) {
							return value && value[0].size < 2000000;
						}
					})
					.required("Foto belum di pilih"),
			}),
			yup.object({
				pSebelum: yup
					.number()
					.transform((value) => (isNaN(value) ? undefined : value))
					.required("Harap isi data ini"),
				pSesudah: yup
					.number()
					.transform((value) => (isNaN(value) ? undefined : value))
					.required("Harap isi data ini"),
				alasan: yup.string().required("Harap pilih salah satu"),
				alasanlainnya: yup.string().when("alasan", {
					is: "lainnya",
					then: yup.string().required("Harap isi alasan"),
				}),
				terms: yup
					.bool()
					.required("Harap centang pernyataan diatas")
					.equals([true]),
			}),
		];

		const currentSchema = computed(() => {
			return schemas[currentStep.value];
		});

		function nextStep(values) {
			if (currentStep.value === 2) {
				loading.value = true;
				setTimeout(tampil, 1500);
			} else {
				currentStep.value++;
			}
		}

		function prevStep() {
			if (currentStep.value <= 0) {
				return;
			}

			currentStep.value--;
		}

		function tampil() {
			let status = Math.floor(Math.random() * 3 + 1);
			if (status === 1) {
				if (formValues.alasan == "lainnya") {
					formValues.alasan = formValues.alasanlainnya;
				}
				const data = Object.entries(formValues);
				const newData = data.filter(function ([key, value]) {
					return key !== "alasanlainnya";
				});
				const formData = Object.fromEntries(newData);
				console.log("Data: ", JSON.stringify(formData, null, 2));

				reset();
			} else if (status == 2) {
				loading.value = false;
				errorPage.value = true;
				errorType.value = "ErrorServer";
			} else {
				loading.value = false;
				errorPage.value = true;
				errorType.value = "ErrorClient";
			}
		}

		function reset() {
			errorPage.value = false;
			currentStep.value++;
			loading.value = false;
			formValues.nama = undefined;
			formValues.nik = undefined;
			formValues.nkk = undefined;
			formValues.umur = undefined;
			formValues.jk = undefined;
			formValues.alamat = undefined;
			formValues.rt = undefined;
			formValues.rw = undefined;
			formValues.fotoktp = undefined;
			formValues.fotokk = undefined;
			formValues.pSebelum = undefined;
			formValues.pSesudah = undefined;
			formValues.alasan = undefined;
			formValues.alasanlainnya = undefined;
			formValues.terms = false;
			fileKtp.value = "";
			fileKk.value = "";
		}

		function home() {
			currentStep.value = 0;
		}

		function close() {
			errorPage.value = false;
		}

		function getFileKtp(event) {
			let input = event.srcElement;
			let fileName = input.files[0].name;
			if (fileName.length > 22) {
				return (fileKtp.value =
					fileName.substr(0, 20) + "..." + fileName.substr(-11));
			}
			fileKtp.value = fileName;
		}

		function getFileKk(event) {
			let input = event.srcElement;
			let fileName = input.files[0].name;
			if (fileName.length > 22) {
				return (fileKk.value =
					fileName.substr(0, 20) + "..." + fileName.substr(-11));
			}
			fileKk.value = fileName;
		}

		return {
			getFileKtp,
			getFileKk,
			fileKtp,
			fileKk,
			home,
			close,
			errorPage,
			errorType,
			loading,
			currentStep,
			currentSchema,
			prevStep,
			formValues,
			nextStep,
		};
	},
	methods: {
		lainnya(event) {
			let input = document.getElementById("inputlainnya");
			this.inputAlasan = false;
		},
		hideLainnya() {
			this.inputAlasan = true;
			this.formValues.alasanlainnya = "";
		},
	},
};
</script>
