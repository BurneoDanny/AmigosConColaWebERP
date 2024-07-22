<script lang="ts" setup>
import { Animal } from "@stores/animalStore.ts";
import { ref, watch, computed } from "vue";
import { Form } from "vee-validate";
import { Field, useField } from "vee-validate";
import * as yup from "yup";

const { pet } = defineProps<{
    pet: Animal | null;
}>();

const perroIsSelect = ref<boolean>(false);
const gatoIsSelect = ref<boolean>(false);
const machoIsSelect = ref<boolean>(false);
const hembraIsSelect = ref<boolean>(false);

const animalRegistrationSchemas = [
  yup.object().shape({
    nombre: yup
      .string()
      .min(3, "Debe tener al menos 3 caracteres")
      .max(10, "Debe tener máximo 10 caracteres")
      .required("El nombre es obligatorio"),
    especie: yup.string().required("La especie es obligatoria"),
    fecha: yup
      .date()
      .max(new Date(), "La fecha no puede ser mayor a la actual")
      .optional()
      .nullable()
      .transform((curr, orig) => (orig === "" ? null : curr)),
    edad: yup
      .number()
      .required("La edad es obligatoria")
      .positive("La edad debe ser un número positivo")
      .integer("La edad debe ser un número entero")
      .truncate(),
    tipo_edad: yup.string().required("Obligatorio"),
    genero: yup.string().required("El género es obligatorio"),
    ubicacion: yup.string().required("La ubicación es obligatoria"),
    codigo: yup.string(),
    peso: yup
      .number()
      .required("El peso es obligatorio")
      .positive("El peso debe un número ser positivo")
      .truncate(),
    historia: yup.string(),
  }),
  yup.object().shape({
    imagen: yup.object().json().shape({
      imageName: yup.string(),
      imageUrl: yup.string(),
    }),
  }),
];

const step = ref(0);

const currentSchema = computed(() => {
  return animalRegistrationSchemas[step.value];
});

const nextStep = async (values: any) => {
 
};

// Initialize values based on pet prop
watch(() => pet, (newPet) => {
    if (newPet) {
        gatoIsSelect.value = newPet.especie === "Gato";
        perroIsSelect.value = newPet.especie === "Perro";
        machoIsSelect.value = newPet.genero === "Macho";
        hembraIsSelect.value = newPet.genero === "Hembra";
    } else {
        gatoIsSelect.value = false;
        perroIsSelect.value = false;
        machoIsSelect.value = false;
        hembraIsSelect.value = false;
    }
}, { immediate: true });

const handlePerroClick = () => {
    perroIsSelect.value = true;
    gatoIsSelect.value = false;

};

const handleGatoClick = () => {
    perroIsSelect.value = false;
    gatoIsSelect.value = true;

};

const handleMachoClick = () => {
    machoIsSelect.value = true;
    hembraIsSelect.value = false;

};

const handleHembraClick = () => {
    machoIsSelect.value = false;
    hembraIsSelect.value = true;

};

</script>

<template>
       <Form
      :validation-schema="currentSchema"
      as="div"
      @submit="nextStep"
    >
    <div id="peso-modal"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        tabindex="-1">
        <div class="relative w-[22rem] sm:w-[23rem] md:w-[27rem] lg:w-[30rem]">
            <div class="relative bg-white rounded-lg shadow p-5">
                <div class="p-5 text-center">
                    <h3
                        class="flex mb-5 text-gray-500 text-[0.9rem] sm:text-[1rem] md:text-[1rem] lg:text-[1.5rem] font-extrabold">
                        Cambiar Datos
                    </h3>

                    <div class="flex items-center mb-5">
                        <Field v-slot="{ field, errorMessage }" :validateOnInput="true" keep-value name="codigo">
                            <label
                                class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.35rem]"
                                for="codigo">Codigo:
                            </label>
                            <div class="flex flex-col">
                            <input id="codigo"
                                class="border-primary text-gray-900 focus:border-primary-600 w-[10.7rem] lg:w-[12rem] sm:w-[10.7rem] md:w-[14rem] text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                                type="text" v-bind="field" :placeholder="pet?.codigo" />

                            <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ errorMessage }}
                            </span>
                            </div>
                        </Field>
                    </div>

                    <div class="flex items-center mb-5">
                        <Field v-slot="{ field, errorMessage }" :validateOnInput="true" keep-value name="nombre">
                            <label
                                class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.35rem]"
                                for="nombre">Nombre:
                            </label>
                            <div class="flex flex-col">
                            <input id="nombre"
                                class="border-primary text-gray-900 focus:border-primary-600 w-[10.7rem] lg:w-[12rem] sm:w-[10.7rem] md:w-[14rem] text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                                type="text" v-bind="field" :placeholder="pet?.nombre" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ errorMessage }}
                            </span>
                            </div>
                        </Field>
                    </div>

                    <div class="flex items-center mb-5">
                        <Field v-slot="{ field, errorMessage }" :validateOnInput="true" keep-value name="edad">
                            <label
                                class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.35rem]"
                                for="edad">Edad(años):
                            </label>
                            <div class="flex flex-col">
                            <input id="edad"
                                class="border-primary text-gray-900 focus:border-primary-600 w-[10.7rem] lg:w-[12rem] sm:w-[10.7rem] md:w-[14rem] text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                                type="number" step="1" v-bind="field" :placeholder="pet?.edad?.toString() || 'Edad'"/>
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ errorMessage }}
                            </span>
                            </div>
                        </Field>
                    </div>

                    <div class="flex items-center mb-5">
                        <Field v-slot="{ errorMessage }" :validateOnInput="true" keep-value name="especie">
                            <label
                                class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.35rem]"
                                for="especie">Especie:
                            </label>
                            <div class="flex flex-col">
                            <div id="especie"
                                class="text-sm font-semibold flex justify-around gap-2 items-center w-[10.7rem] lg:w-[12rem] sm:w-[10.7rem] md:w-[14rem] border border-primary h-10">
                                <input :class="{
                                    'bg-primary w-full h-2/3 ml-3':
                                        perroIsSelect,
                                    'hover:bg-sky-300 w-full h-2/3 ml-3': !perroIsSelect,
                                }" type="button" value="Perro" @click="handlePerroClick" />
                                <input :class="{
                                    'bg-primary w-full h-2/3 mr-3':
                                        gatoIsSelect,
                                    'hover:bg-sky-300 w-full h-2/3 mr-3': !gatoIsSelect,
                                }" type="button" value="Gato" @click="handleGatoClick" />
                            </div>
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ errorMessage }}
                            </span>
                            </div>
                        </Field>
                    </div>

                    <div class="flex items-center mb-5">
                        <Field v-slot="{ errorMessage }" :validateOnInput="true" keep-value name="genero">
                            <label
                                class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.35rem]"
                                for="genero">Género:
                            </label>

                            <div class="flex flex-col">

                            <div id="genero"
                                class="text-sm font-semibold flex justify-around gap-2 items-center w-[10.7rem] lg:w-[12rem] sm:w-[10.7rem] md:w-[14rem] border border-primary h-10">
                                <input :class="{
                                    'bg-primary w-full h-2/3 ml-3':
                                        machoIsSelect,
                                    'hover:bg-sky-300 w-full h-2/3 ml-3': !machoIsSelect,
                                }" type="button" value="Macho" @click="handleMachoClick" />
                                <input :class="{
                                    'bg-primary w-full h-2/3 mr-3':
                                        hembraIsSelect,
                                    'hover:bg-sky-300 w-full h-2/3 mr-3': !hembraIsSelect,
                                }" type="button" value="Hembra" @click="handleHembraClick" />
                            </div>
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ errorMessage }}
                            </span>
                            </div>
                        </Field>
                    </div>

                    <div class="flex items-center mb-5">
                        <Field v-slot="{ field, errorMessage }" :validateOnInput="true" keep-value name="ubicacion">
                            <label
                                class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.35rem]"
                                for="ubicacion">Ubicación:
                            </label>
                            <div class="flex flex-col">
                            <input id="ubicacion"
                                class="border-primary text-gray-900 focus:border-primary-600 w-[10.7rem] lg:w-[12rem] sm:w-[10.7rem] md:w-[14rem] text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                                v-bind="field" :placeholder="pet?.ubicacion" type="text" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ errorMessage }}
                            </span>
                            </div>
                        </Field>
                    </div>

                    <div class="flex items-center mb-5">
                        <Field v-slot="{ field, errorMessage }" :validateOnInput="true" keep-value name="peso">
                            <label
                                class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.35rem]"
                                for="peso">Peso(lbs):
                            </label>

                            <div class="flex flex-col">
                            <input id="peso"
                                class="border-primary text-gray-900 focus:border-primary-600 w-[10.7rem] lg:w-[12rem] sm:w-[10.7rem] md:w-[14rem] text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                                v-bind="field" :placeholder="pet?.peso?.toString() || 'Peso'" type="number" step="1" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500">
                                {{ errorMessage }}
                            </span>
                                                            
                        </div>
                        </Field>
                    </div>

                    <div class="flex items-center mb-7">
                            <label
                                class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.35rem]"
                                for="estado">Estado:
                            </label>

                            <input id="estado"
                                class="border-primary text-gray-900 focus:border-primary-600 w-[10.7rem] lg:w-[12rem] sm:w-[10.7rem] md:w-[14rem] text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                                name="pet?.estado" :placeholder="pet?.adoptado ? 'Adoptado' : 'No adoptado'" type="text" />
                    </div>

                    <button
                        class="bg-surface drop-shadow font-normal border border-gray-200 hover:bg-gray-100 hover:text-primary hover:font-bold px-5 shadow-3xl rounded-full text-xs sm:py-2.5 md:text-[0.9rem] sm:text-[0.79rem] sm:px-5 lg:text-md py-3 md:px-6 md:py-2.5 lg:px-8 lg:py-4 mr-4 sm:mr-10 md:mr-10 lg:mr-10"
                        data-modal-hide="desparasitacion-modal" type="button">
                        Cancelar
                    </button>
                    <button
                        class="bg-primary drop-shadow text-white hover:bg-primary/75 hover:font-bold font-medium shadow-3xl rounded-full text-xs md:text-[0.9rem] sm:text-[0.79rem] sm:py-2 sm:text-base sm:px-6 lg:text-md py-3 px-5 md:px-6 md:py-2.5 lg:px-8 lg:py-3"
                        data-modal-hide="desparasitacion-modal" type="submit">
                        Guardar cambios
                    </button>
                </div>
            </div>
        </div>
    </div>
</Form>
</template>

<style scoped>
.b-row {
    margin-bottom: 0.5rem;
}
</style>
