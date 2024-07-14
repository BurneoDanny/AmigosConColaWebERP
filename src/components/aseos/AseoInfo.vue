<script setup lang="ts">
defineProps<{
  tipo: string;
  fecha: string;
}>();
</script>

<template>
  <div
    class="bg-primary/20 py-2 px-6 w-[30rem] h-[6rem] rounded-xl flex flex-col justify-center"
  >
    <h1 class="font-bold text-gray-700">{{ tipo }}</h1>
    <h3 class="text-gray-600">{{ fecha }}</h3>
  </div>
</template>
