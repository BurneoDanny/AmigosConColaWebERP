<script setup lang="ts">
import VacunaModal from "@/components/animal_details/VacunaModal.vue";
import AddButton from "@/components/AddButton.vue";
import VacunaPhoto from "@/components/vacunas/VacunaPhoto.vue";
import VacunaInfo from "@/components/vacunas/VacunaInfo.vue";
import { useVacunas } from "@stores/vacunaStore.ts";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";

const props = defineProps(["idAnimal"]);
const vacunas = useVacunas(props.idAnimal);

onMounted(() => initFlowbite());
</script>

<template>
  <AddButton
    class="mb-4"
    data-modal-target="vacuna-modal"
    data-modal-toggle="vacuna-modal"
  />
  <VacunaModal :on-submit="vacunas.create" />

  <div class="max-h-96 overflow-y-auto">
    <div v-for="vaccine in vacunas.items" class="flex mb-4">
      <VacunaPhoto class="mr-3" />
      <VacunaInfo
        :examenPrevio="vaccine?.examenPrevio"
        :fecha="vaccine.date"
        :nombre="vaccine.name"
      />
    </div>
  </div>
</template>
