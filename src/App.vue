<script lang="ts" setup>
import SideBar from "@/components/SideBar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isLandingPage = computed(() => route.path === "/");
const routerViewClasses = computed(() => ({
  "sm:ml-72": !isLandingPage.value,
}));
</script>

<template>
  <div>
    <SideBar v-if="!isLandingPage" />
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
