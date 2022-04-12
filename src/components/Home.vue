<template>
	<div class="max-w-xl m-auto bg-bgGray relative">
		<div v-if="errorPage == true" class="error-page">
			<component
				:is="errorType"
				:loading="loading"
				@closed="close"
				@send="nextStep"
			></component>
		</div>
		<div v-if="errorPage == false" class="w-full px-5 pt-5 pb-2">
			<stepperBar :page="currentStep"></stepperBar>
		</div>
		<div class="p-3 relative">
			<Form
				@submit="nextStep"
				:validation-schema="currentSchema"
				v-slot="{ handleSubmit }"
			>
				<!-- step ke-1 -->
				<template v-if="currentStep === 0">
					<div class="flex flex-col gap-4">
						<div>
							<label for="name" class="label-style">Nama</label>
							<Field
								type="text"
								class="input-style"
								placeholder="Nama lengkap"
								autocomplete="off"
								name="nama"
								id="nama"
								v-model="formValues.nama"
							/>
							<ErrorMessage name="nama" class="text-error" />
						</div>
						<div>
							<div class="relative">
								<label for="nik" class="label-style">NIK</label>
								<Field
									class="input-style"
									name="nik"
									id="nik"
									placeholder="16 Digit NIK"
									autocomplete="off"
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
							<ErrorMessage name="nik" class="text-error" />
						</div>
						<div>
							<div class="relative">
								<label for="nik" class="label-style">No Kartu Keluarga</label>
								<Field
									class="input-style"
									name="nkk"
									id="nkk"
									placeholder="16 Digit No Kartu Keluarga"
									autocomplete="off"
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
							<ErrorMessage name="nkk" class="text-error" />
						</div>
						<div>
							<label for="umur" class="label-style">Umur</label>
							<Field
								type="number"
								class="input-style"
								name="umur"
								id="umur"
								placeholder="Umur minimal 25 tahun"
								autocomplete="off"
								v-model="formValues.umur"
							/>
							<ErrorMessage name="umur" class="text-error" />
						</div>
						<div>
							<p class="label-style">Jenis Kelamin</p>
							<div
								class="grid grid-rows-1 grid-cols-2 border bg-white border-gray-400 mt-1 divide-x divide-gray-400 rounded-lg"
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
							<ErrorMessage name="jk" class="text-error" />
						</div>
						<div>
							<div class="relative">
								<label for="alamat" class="label-style">Alamat</label>
								<Field
									type="text"
									class="input-style relative"
									name="alamat"
									maxlength="255"
									id="alamat"
									placeholder="Alamat sesuai KTP"
									autocomplete="off"
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
							<ErrorMessage name="alamat" class="text-error" />
						</div>
						<div class="grid grid-rows-1 grid-cols-2 mt-4 rounded-md">
							<div>
								<div class="flex items-center pr-2">
									<label for="rt" class="pr-2 label-style">RT </label>
									<Field
										type="number"
										class="input-style"
										autocomplete="off"
										name="rt"
										id="rt"
										v-model="formValues.rt"
									/>
								</div>
								<ErrorMessage name="rt" class="text-error" />
							</div>
							<div>
								<div class="flex items-center pr-2">
									<label for="rw" class="pr-2 label-style">RW </label>
									<Field
										type="number"
										class="input-style"
										autocomplete="off"
										name="rw"
										id="rw"
										v-model="formValues.rw"
									/>
								</div>
								<ErrorMessage name="rw" class="text-error" />
							</div>
						</div>
					</div>
				</template>
				<!-- step ke-2 -->
				<template v-if="currentStep === 1">
					<div class="grid gap-2 my-3">
						<p class="label-style">Foto KTP</p>
						<div class="flex">
							<div class="btn-upload mb-2">
								<label
									for="fotoktp"
									class="bg-primaryGreen text-white cursor-pointer ml-1"
									>Tambah File
								</label>
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
						<div
							class="w-full p-2 border bg-white border-gray-400 relative rounded-lg"
						>
							<span
								class="text-sm font-normal text-gray-900 absolute -top-6 right-1"
								>Ukuran Foto Maks 2 MB</span
							>
							<span class="text-sm">
								{{
									fileKtp.length > 0 ? fileKtp : "Tidak ada file yang dipilih"
								}}</span
							>
						</div>
						<ErrorMessage name="fotoktp" class="text-error" />
					</div>

					<div class="grid gap-2 mt-8">
						<p class="label-style">Foto Kartu Keluarga</p>
						<div class="flex">
							<div class="mb-2 btn-upload">
								<label
									for="fotokk"
									class="bg-primaryGreen text-white cursor-pointer ml-1"
									>Tambah File
								</label>
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
							class="w-full p-2 border bg-white border-gray-400 relative rounded-lg"
						>
							<div class="text-gray-400 absolute -top-6 right-1">
								<span class="text-sm font-normal text-gray-900"
									>Ukuran Foto Maks 2 MB</span
								>
							</div>
							<span class="text-sm">
								{{ fileKk.length > 0 ? fileKk : "Tidak ada file yang dipilih" }}
							</span>
						</div>
						<ErrorMessage name="fotokk" class="text-error" />
					</div>
				</template>
				<!-- step ke-3 -->
				<template v-if="currentStep === 2">
					<div class="mb-6">
						<label for="psebelum" class="label-style"
							>Penghasilan sebelum pandemi</label
						>
						<Field
							type="number"
							class="input-style mt-1"
							name="pSebelum"
							id="psebelum"
							placeholder="Contoh : 2000000"
							autocomplete="off"
							v-model="formValues.pSebelum"
						/>
						<ErrorMessage name="pSebelum" class="text-error" />
					</div>
					<div>
						<label for="psesudah" class="label-style"
							>Penghasilan sesudah pandemi</label
						>
						<Field
							type="number"
							class="input-style mt-1"
							name="pSesudah"
							id="psesudah"
							placeholder="Contoh : 2000000"
							autocomplete="off"
							v-model="formValues.pSesudah"
						/>
						<ErrorMessage name="pSesudah" class="text-error" />
					</div>
					<!-- alasan -->
					<div class="grid gap-2 mt-4">
						<p class="label-style">Alasan membutuhkan bantuan</p>
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
									autocomplete="off"
									:disabled="inputAlasan"
									v-model="formValues.alasanlainnya"
									class="input-style w-full ml-2"
								/>
							</label>
						</div>
						<ErrorMessage name="alasan" class="text-error" />
						<ErrorMessage name="alasanlainnya" class="text-error" />
						<div class="relative cursor-pointer">
							<Field
								name="terms"
								type="checkbox"
								id="terms"
								class="text-primaryGreen mr-2 cursor-pointer absolute peer top-7 left-3"
								value="true"
								v-model="formValues.terms"
							/>
							<div class="terms-box">
								<label
									for="terms"
									class="cursor-pointer label-style ml-7 text-[.92rem]"
								>
									Saya menyatakan bahwa data yang diisikan adalah benar dan siap
									mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam
									data tersebut</label
								>
							</div>
							<ErrorMessage name="terms" class="text-error" />
						</div>
					</div>
				</template>
				<!-- success page -->
				<template v-if="currentStep === 3">
					<SuccessMsg @home="home" />
				</template>
				<!-- button sebelumnya -->
				<button
					class="btn btn-prev mr-4"
					v-if="currentStep !== 0 && currentStep < 3 && errorPage == false"
					type="button"
					@click="prevStep"
				>
					Sebelumnya
				</button>
				<!-- button selanjutnya -->
				<button
					class="btn btn-next"
					v-if="currentStep !== 2 && currentStep < 3 && errorPage == false"
					type="submit"
				>
					Selanjutnya
				</button>
				<!-- button kirim -->
				<button
					v-if="currentStep === 2 && errorPage == false"
					class="btn btn-send absolute h-12 pb-4"
					type="submit"
					:disabled="loading"
				>
					<div
						v-if="loading == true"
						style="border-top-color: transparent"
						class="loading-animate"
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
import { ref, reactive, computed } from "vue";
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
					.test("nkk", "No Kartu Keluarga harus 16 digit", () => {
						if (formValues.nkk != undefined) {
							return formValues.nkk.length == 16;
						}
					})
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
				errorPage.value = false;
				currentStep.value++;
				loading.value = false;
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
			reset();
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
