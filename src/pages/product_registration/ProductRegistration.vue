<script lang="ts" setup>
import { computed, ref } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { Field } from "vee-validate";
import FormSelect from "@/components/FormSelect.vue";

const router = useRouter();

const animalRegistrationSchemas = [
    yup.object().shape({
        nombre: yup.string().min(3, "Debe tener al menos 3 caracteres").max(10, "Debe tener máximo 10 caracteres").required("Por favor, ingrese un nombre."),
        ingrediente: yup.string().required("Por favor, ingrese un ingrediente."),
        laboratorio: yup.string().required("Por favor, ingrese el nombre de un laboratorio"),
        formato: yup.string().required("Por favor, ingrese un formato."),
        volumen: yup.number().required("Por favor, ingrese el volumen.").positive("El volumen debe ser un número positivo").integer("El volumen debe ser número entero"),
        caja: yup.number().required("Por favor, ingrese la cantidad de cajas.").positive("La cantidad de cajas debe ser un número positivo").integer("La cantidad de cajas debe ser número entero"),
        cantidad: yup.number().required("Por favor, ingrese la cantidad.").positive("La cantidad debe ser un número positivo").integer("La cantidad debe ser número entero"),
        fecha_vencimiento: yup.date().optional().nullable().transform((curr, orig) => (orig === "" ? null : curr)),
        fecha_registro: yup.date().optional().nullable().transform((curr, orig) => (orig === "" ? null : curr)),
        origen: yup.string().required("Obligatorio"),
        vadm: yup.string().required("Obligatorio"),
        estado: yup.string().required("Obligatorio"),
        clasificacion: yup.string().required("Obligatorio"),
        codigo: yup.string(),
    }),
    yup.object().shape({
        imagen: yup.object().shape({
            imageName: yup.string(),
            imageUrl: yup.string(),
        }),
    }),
];

const step = ref(0);
const currentSchema = computed(() => animalRegistrationSchemas[step.value]);

const selectOptionsForOrigen = [
    { value: "Argentina", label: "Argentina" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Francia", label: "Francia" },
    { value: "Alemania", label: "Alemania" },
    { value: "EAU", label: "EAU" },
    { value: "Colombia", label: "Colombia" },
    { value: "Italia", label: "Italia" },
    { value: "España", label: "España" },
    { value: "USA", label: "USA" },
    { value: "India", label: "India" },
    { value: "Chile", label: "Chile" },
    { value: "Belgica", label: "Belgica" },
    { value: "Suiza", label: "Suiza" },
    { value: "Peru", label: "Peru" },
    { value: "Mexico", label: "Mexico" },
    { value: "Dinamarca", label: "Dinamarca" }
];

const selectOptionsForEstado = [
    { value: "Nuevo", label: "Nuevo" },
    { value: "Usado", label: "Usado" },
    { value: "Usado/mitad", label: "Usado/mitad" },
    { value: "Usado c/lleno", label: "Usado c/lleno" },
    { value: "Usado c/vacio", label: "Usado c/vacio" }
];

const selectOptionsForVdam = [
    { value: "Topica", label: "Tópica" },
    { value: "Oral", label: "Oral" },
    { value: "Inyect", label: "Inyect" },
    { value: "Emul", label: "Emul" }
];

const selectOptionsForClasificacion = [
    { value: "Anabolicos", label: "Anabólicos" },
    { value: "Analgesicos", label: "Analgésicos" },
    { value: "AntiacidosAntiflautulentos", label: "Antiácidos antiflautulentos" },
    { value: "Antibioticos", label: "Antibióticos" },
    { value: "Antidiarreicos", label: "Antidiarreicos" },
    { value: "Antiemeticos", label: "Antieméticos (náuseas, vómito)" },
    { value: "Antihemorragicos", label: "Antihemorrágicos" },
    { value: "Antiinflamatorios", label: "Antiinflamatorios" },
    { value: "Antiintoxicantes", label: "Antiintoxicantes" },
    { value: "AntiparasitariosExternosInsecticidas", label: "Antiparasitarios externos, insecticidas" },
    { value: "AntiparasitariosInternos", label: "Antiparasitarios internos" },
    { value: "AntisepticosBactericidas", label: "Antisépticos, bactericidas" },
    { value: "Antiulcerosos", label: "Antiulcerosos" },
    { value: "Glucocorticoides", label: "Glucocorticoides" },
    { value: "Diureticos", label: "Diuréticos" },
    { value: "Hematinicos", label: "Hematínicos" },
    { value: "Hemostaticos", label: "Hemostáticos" },
    { value: "Hepatoprotectores", label: "Hepatoprotectores" },
    { value: "Inmunoestimulantes", label: "Inmunoestimulantes" },
    { value: "InsecticidasParaFumigar", label: "Insecticidas para fumigar" },
    { value: "Mucoliticos", label: "Mucolíticos" },
    { value: "ProblemasCardiacos", label: "Problemas cardíacos" },
    { value: "ProblemasOftalmicos", label: "Problemas oftálmicos" },
    { value: "ProblemasOticosYDermicos", label: "Problemas óticos y dérmicos" },
    { value: "Quimioterapicos", label: "Quimioterápicos" },
    { value: "Vitaminas", label: "Vitaminas" },
    { value: "Varios", label: "Varios" }
];

function returnToInventory() {
    router.push({
        name: "crear-producto",
    });
}

function saveNewProduct() {
    router.push({
        name: "crear-producto",
    });
}

function changeFechaVencimiento() {
    // Lógica para manejar el cambio de fecha de vencimiento
}

function changeFechaRegistro() {
    // Lógica para manejar el cambio de fecha de registro
}

</script>

<template>
    <div class="h-screen text-center">
        <Form :validation-schema="currentSchema" as="div">
            <h2 class="text-2xl md:text-4xl font-bold text-left m-0">
                Crear Producto de Inventario
            </h2>
            <div class="flex flex-wrap w-screen px-8 lg:px-16 mt-6 mb-6">

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" name="nombre">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="nombre">Nombre
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="nombre" autocomplete="off"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
                                placeholder="Nombre del producto" type="text" v-bind="field" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" keep-value name="fecha_vencimiento">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="fecha_vencimiento">Fecha de Vencimiento
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="fecha_vencimiento"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="date" v-bind="field"/>
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" name="laboratorio">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="laboratorio">Laboratorio
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="laboratorio" autocomplete="off"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
                                placeholder="Laboratorio" type="text" v-bind="field" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" name="ingrediente">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="ingrediente">Ingrediente principal
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="ingrediente" autocomplete="off"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
                                placeholder="Ingrediente Principal" type="text" v-bind="field" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ value, field, errorMessage }" :validate-on-input="true" name="origen">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="origen">Origen
                        </label>
                        <div class="flex flex-col w-full">
                            <FormSelect :disabled="false" v-bind="field" :options="selectOptionsForOrigen" :tipo-edad="value"
                                placeholder="Pais" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ value, field, errorMessage }" :validate-on-input="true" name="estado">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="estado">Estado
                        </label>
                        <div class="flex flex-col w-full">
                            <FormSelect :disabled="false" v-bind="field" :options="selectOptionsForEstado" :tipo-edad="value"
                                placeholder="Estado" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" name="formato">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="formato">Formato
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="formato" autocomplete="off"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
                                placeholder="Formato" type="text" v-bind="field" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" keep-value name="fecha_registro">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="fecha_registro">Fecha de Registro
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="fecha_registro"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="date" v-bind="field" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" name="volumen">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="volumen">Volumen
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="volumen" autocomplete="off"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
                                placeholder="30g" type="text" v-bind="field" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" name="caja">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="caja">Caja
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="caja" autocomplete="off"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
                                placeholder="0" type="text" v-bind="field" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ value, field, errorMessage }" :validate-on-input="true" name="vadm">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="vadm">V/Adm
                        </label>
                        <div class="flex flex-col w-full">
                            <FormSelect :disabled="false" v-bind="field" :options="selectOptionsForVdam" :tipo-edad="value"
                                placeholder="V/Adm" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ field, errorMessage }" :validate-on-input="true" name="cantidad">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="cantidad">Cantidad
                        </label>
                        <div class="flex flex-col w-full">
                            <input id="cantidad" autocomplete="off"
                                class="block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5"
                                placeholder="0" type="text" v-bind="field" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col lg:px-24 mb-3">
                    <Field v-slot="{ value, field, errorMessage }" :validate-on-input="true" name="clasificacion">
                        <label
                            class="mr-[0.19rem] w-[10rem] md:mr-[1.3rem] sm:mr-[0.6rem] lg:mr-[0.05rem] flex sm:w-[6.5rem] lg:w-52 md:w-52 font-medium text-gray-900 text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] lg:text-[1.2rem]"
                            for="clasificacion">Clasificación
                        </label>
                        <div class="flex flex-col w-full">
                            <FormSelect :disabled="false" v-bind="field" :options="selectOptionsForClasificacion" :tipo-edad="value"
                                placeholder="Clasificación" />
                            <span class="mt-2 text-sm text-red-600 dark:text-red-500 text-left">
                                {{ errorMessage }}
                            </span>
                        </div>
                    </Field>
                </div>
            </div>
            <button @click="returnToInventory"
                class="bg-surface drop-shadow font-normal border border-gray-200 hover:bg-gray-100 hover:text-primary hover:font-bold px-5 shadow-3xl rounded-full text-xs sm:py-2.5 md:text-[0.9rem] sm:text-[0.79rem] sm:px-5 lg:text-md py-3 md:px-6 md:py-2.5 lg:px-8 lg:py-4 mr-4 sm:mr-10 md:mr-10 lg:mr-10"
                type="button">
                Atras
            </button>
            <button @click="saveNewProduct"
                class="bg-primary drop-shadow text-white hover:bg-primary/75 hover:font-bold font-medium shadow-3xl rounded-full text-xs md:text-[0.9rem] sm:text-[0.79rem] sm:py-2 sm:text-base sm:px-6 lg:text-md py-3 px-5 md:px-6 md:py-2.5 lg:px-8 lg:py-3"
                type="submit">
                Guardar
            </button>
        </Form>
    </div>
</template>
