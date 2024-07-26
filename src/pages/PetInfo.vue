<script lang="ts" setup>
import Tab from "@/components/Tab.vue";
import BasePetInfo from "@/components/pet_info/BasePetInfo.vue";
import { useRoute } from "vue-router";
import { useAnimal } from "@stores/animalStore.ts";

const route = useRoute();

const animal = useAnimal(parseInt(route.params.id as string));
</script>

<template>
  <div
    class="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row items-center sm:mt-[3rem]"
  >
    <BasePetInfo :pet="animal.data" class="mr-5 mb-5 xl:mb-0 lg:mb-8 xl:mr-8" />
    <Tab
      :pet="animal.data"
      class="mr-[0.75rem] mb-10 sm:mr-10 sm:h-[37.8rem] xl:m-0 lg:mb-8"
    />
  </div>
</template>
