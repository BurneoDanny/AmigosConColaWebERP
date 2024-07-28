<script setup lang="ts">
import FormInput from "@/components/FormInput.vue";
import { Animal } from "@stores/animalStore.ts";
import { computed, ref } from "vue";

const props = defineProps<{
  animal: Animal;
  editing: boolean;
}>();

const inputClasses = computed(() =>
  props.editing ? "p-2.5" : "bg-white border-none p-2.5",
);

const nombre = ref(props.animal.nombre);
const codigo = ref(props.animal.codigo);
const edad = ref(props.animal.edad);
const especie = ref(props.animal.especie);
const genero = ref(props.animal.genero);
const ubicacion = ref(props.animal.ubicacion);
const peso = ref(props.animal.peso);
const adoptado = computed(() =>
  props.animal?.adoptado ? "Adoptado" : "No Adoptado",
);
</script>

<template>
  <div>
    <form>
      <div class="grid grid-cols-2">
        <div class="px-4">
          <FormInput
            name="Código"
            :class="inputClasses"
            :value="codigo"
            v-model="codigo"
            :disabled="!editing"
          />
          <FormInput
            name="Edad"
            :class="inputClasses"
            :value="edad"
            v-model="edad"
            :disabled="!editing"
          />
          <FormInput
            name="Género"
            :class="inputClasses"
            :value="genero"
            v-model="genero"
            :disabled="!editing"
          />
          <FormInput
            name="Adoptado"
            :class="inputClasses"
            :value="adoptado"
            v-model="adoptado"
            :disabled="!editing"
          />
        </div>
        <div class="px-4">
          <FormInput
            name="Nombre"
            :class="inputClasses"
            :value="nombre"
            v-model="nombre"
            :disabled="!editing"
          />
          <FormInput
            name="Especie"
            :class="inputClasses"
            :value="especie"
            v-model="especie"
            :disabled="!editing"
          />
          <FormInput
            name="Ubicación"
            :class="inputClasses"
            :value="ubicacion"
            v-model="ubicacion"
            :disabled="!editing"
          />
          <FormInput
            name="Peso"
            :class="inputClasses"
            :value="peso"
            v-model="peso"
            :disabled="!editing"
          />
        </div>
      </div>
      <div>
        <textarea
          :class="editing ? 'w-full rounded-sm' : 'w-full border-none'"
          :disabled="!editing"
        >
          {{ animal.historia || "" }}
        </textarea>
      </div>
    </form>
  </div>
</template>
