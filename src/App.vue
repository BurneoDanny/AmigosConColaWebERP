<script lang="ts" setup>
import SideBar from "@/components/SideBar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const shouldShowSidebar = computed(
  () => route.path !== "/" && route.path !== "/login",
);
const routerViewClasses = computed(() => ({
  "sm:ml-72": shouldShowSidebar.value,
}));
</script>

<template>
  <div>
    <SideBar v-if="shouldShowSidebar" />
    <div :class="routerViewClasses">
      <RouterView class="pl-5 pt-5" />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  color-scheme: light;
}
</style>
