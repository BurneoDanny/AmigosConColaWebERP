<script setup lang="ts">
import AddButton from "@/components/AddButton.vue";
import AseoModal from "@/components/animal_details/AseoModal.vue";
import AseoInfo from "@/components/aseos/AseoInfo.vue";
import { useAseos } from "@stores/aseoStore.ts";

const props = defineProps(["idAnimal"]);
const aseos = useAseos(parseInt(props.idAnimal));
</script>

<template>
  <AddButton
    class="mb-4"
    data-modal-target="aseo-modal"
    data-modal-toggle="aseo-modal"
  />
  <AseoModal :on-submit="aseos.create" />

  <div v-for="aseo in aseos.items" class="flex mb-4">
    <AseoInfo :fecha="aseo.fecha" :tipo="aseo.tipo" />
  </div>
</template>
