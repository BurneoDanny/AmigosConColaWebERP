<script setup lang="ts">
import { useDesparasitaciones } from "@stores/desparasitacionStore.ts";
import AddButton from "@/components/AddButton.vue";
import DesparasitacionModal from "@/components/animal_details/DesparasitacionModal.vue";
import DesparasitacionesPhoto from "@/components/desparasitaciones/DesparasitacionesPhoto.vue";
import DesparasitacionesInfo from "@/components/desparasitaciones/DesparasitacionesInfo.vue";

const props = defineProps(["idAnimal"]);
const desparasitaciones = useDesparasitaciones(props.idAnimal);
</script>

<template>
  <div>
    <AddButton
      class="mb-4"
      data-modal-target="desparasitacion-modal"
      data-modal-toggle="desparasitacion-modal"
    />
    <DesparasitacionModal :on-submit="desparasitaciones.create" />
    <div class="flex max-h-96 overflow-y-auto">
      <div class="w-1/2 pr-2">
        <h2 class="font-bold text-center mb-4">Interno</h2>
        <div class="bg-white rounded-lg p-4 border border-gray-300">
          <div v-for="deworming in desparasitaciones.items" class="flex mb-4">
            <template v-if="deworming.tipo === 'interno'">
              <DesparasitacionesPhoto class="mr-3" />
              <DesparasitacionesInfo
                :tipo="deworming.tipo"
                :fecha="deworming.fecha"
                :producto="deworming.producto"
                :peso="deworming.peso"
                :formato="deworming.formato"
              />
            </template>
          </div>
        </div>
      </div>
      <div class="w-1/2 pl-2">
        <h2 class="font-bold text-center mb-4">Externo</h2>
        <div class="bg-white rounded-lg p-4 border border-gray-300">
          <div v-for="deworming in desparasitaciones.items" class="flex mb-4">
            <template v-if="deworming.tipo === 'externo'">
              <DesparasitacionesPhoto class="mr-3" />
              <DesparasitacionesInfo
                :fecha="deworming.fecha"
                :formato="deworming.formato"
                :peso="deworming.peso"
                :producto="deworming.producto"
                :tipo="deworming.tipo"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
