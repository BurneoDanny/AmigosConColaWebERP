<script setup lang="ts">
defineProps(["name"]);
</script>

<template>
  <div class="grid grid-cols-3 items-center">
    <label
      :for="name"
      class="block text-sm font-bold text-gray-900 dark:text-white"
      >{{ name }}</label
    >
    <input
      :id="name"
      class="block w-full text-base font-medium bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary p-1 text-end col-span-2"
      autocomplete="off"
      v-bind="$attrs"
    />
  </div>
</template>
