<script lang="ts" setup>
import { Form } from "vee-validate";
import { schema as animalSchema } from "@/schemas/animalSchema";
import ACFormInput from "@/components/common/ACFormInput.vue";
import ACFormRadio from "@/components/common/ACFormRadio.vue";
import ACFormFileInput from "@/components/common/ACFormFileInput.vue";
import ACButtonPrimary from "@/components/common/buttons/ACButtonPrimary.vue";
import { ref } from "vue";
import ACFormMultiLineInput from "@/components/common/ACFormMultiLineInput.vue";
import { useAnimals } from "@stores/animalStore.ts";
import { useRouter } from "vue-router";
import { useToast } from "@stores/toastStore.ts";

const animals = useAnimals();
const router = useRouter();
const { toast } = useToast();

const imageFileInput = ref<typeof ACFormFileInput | null>(null);
const previewImageUrl = ref<string | null>(null);
const previewImageName = ref<string | null>(null);

const onImageFileChanged = (file: File | null) => {
  previewImageUrl.value = file === null ? null : URL.createObjectURL(file);
  previewImageName.value = file?.name ?? null;
};

const onSubmit = async (values) => {
  // TODO: show loading spinner
  // TODO: put types in separate director`
  try {
    await animals.create(values);
    await router.push({ name: "home" });
    toast({
      message: "Animal registrado con éxito",
    });
  } catch (e) {
    console.error(e);
    toast({
      message: "Hubo un error al registrar el animal",
      severity: "error",
    });
  }
};
</script>

<template>
  <h1 class="text-2xl font-bold px-8 mt-4 mb-4">Crea un nuevo animal</h1>
  <Form
    class="px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-4"
    :validation-schema="animalSchema"
    @submit="onSubmit"
  >
    <ACFormInput name="nombre">Nombre</ACFormInput>
    <ACFormInput name="edad">Edad</ACFormInput>
    <ACFormInput name="ubicacion">Ubicación</ACFormInput>
    <ACFormInput name="codigo" :required="false">Código</ACFormInput>
    <ACFormInput name="peso">Peso</ACFormInput>
    <span></span>
    <ACFormRadio name="genero" :items="['Femenino', 'Masculino']">
      Género
    </ACFormRadio>
    <ACFormRadio name="especie" :items="['Gato', 'Perro']">
      Especie
    </ACFormRadio>
    <ACFormFileInput
      ref="imageFileInput"
      class="col-span-2"
      name="imagen"
      action="para subir una imagen"
      :allowed-types="['image/png', 'image/jpg', 'image/jpeg']"
      @change="onImageFileChanged"
    />
    <div
      class="flex items-center justify-between col-span-2 w-full"
      v-if="previewImageUrl && previewImageName"
    >
      <div class="flex gap-2 items-center">
        <img
          :src="previewImageUrl"
          alt="preview"
          width="40px"
          class="rounded-full aspect-square cover"
        />
        <span class="text-sm">{{ previewImageName }}</span>
      </div>
      <div class="flex items-center">
        <span
          class="icon-[gridicons--cross-circle] text-xl text-red-600 cursor-pointer"
          @click="imageFileInput?.reset()"
        ></span>
      </div>
    </div>
    <ACFormMultiLineInput class="col-span-2" name="historia" :required="false">
      Historia
    </ACFormMultiLineInput>
    <ACButtonPrimary
      class="flex items-center gap-1 col-start-2 w-fit justify-self-end mt-4"
      type="submit"
    >
      <span class="icon-[carbon--save] text-xl"></span>
      Guardar
    </ACButtonPrimary>
  </Form>
</template>
