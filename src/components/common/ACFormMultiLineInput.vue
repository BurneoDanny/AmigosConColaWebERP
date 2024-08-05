<script setup lang="ts">
import { Field } from "vee-validate";

defineProps<{
  name: string;
}>();
</script>

<template>
  <div>
    <label
      :for="name"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      <slot />
    </label>
    <Field
      as="textarea"
      :style="{ resize: 'none' }"
      :id="name"
      :name="name"
      rows="4"
      class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-primary focus:ring-primary/25 focus:border-primary-dark"
    ></Field>
  </div>
</template>
