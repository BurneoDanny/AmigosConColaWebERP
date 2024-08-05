<script lang="ts" setup>
import SideBar from "@/components/common/SideBar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import NavBar from "@/components/common/NavBar.vue";
import SearchInput from "@/components/common/GlobalSearch.vue";
import Toast from "@/components/toast/Toast.vue";
import LoadingSpinnerModal from "@/components/common/LoadingSpinnerModal.vue";

const route = useRoute();

const routerViewClasses = computed(() => ({
  "sm:ml-[5rem]": shouldShowSideBar.value,
}));

const shouldShowSideBar = computed(() => !["/", "/login"].includes(route.path));
const shouldShowNavbar = computed(() => !["/", "/login"].includes(route.path));
const isHomePage = computed(() => route.path === "/home");
</script>

<template>
  <div>
    <Toast />
    <LoadingSpinnerModal />
    <SideBar v-if="shouldShowSideBar" />
    <div :class="routerViewClasses">
      <NavBar v-if="shouldShowNavbar">
        <SearchInput v-if="isHomePage" />
      </NavBar>
      <RouterView />
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
