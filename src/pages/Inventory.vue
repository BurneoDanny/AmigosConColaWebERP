<script lang="ts" setup>
import AddButton from "@/components/home_page/AddButton.vue";
import SearchInput from "@/components/home_page/SearchInput.vue";
import FilterButton from "@/components/home_page/FilterButton.vue";
import AnimalCard from "@/components/home_page/AnimalCard.vue";
import filterIcon from "@/assets/home_page/filter.svg";
import dogIcon from "@/assets/home_page/dog.svg";
import { ref, watch, computed, ComputedRef } from "vue";
import { Animal, useAnimals } from "@stores/animalStore.ts";
import { AnimalSpecies } from "@/enums/animal_species.ts";
import { useRouter } from "vue-router";
</script>

<template>
  <div class="flex flex-col justify-center">
    <div
      class="flex justify-start lg:justify-end items-center gap-3 lg:mx-4 mt-5"
    >
      <SearchInput v-model="search" />
      <AddButton @click="onRegisterAnimalClicked">
        <span class="hidden md:flex">Agregar al inventario</span>
      </AddButton>
    </div>
    <div class="mt-5 mb-5 flex items-center gap-3">
      <h2 class="text-2xl md:text-4xl font-bold m-0">Inventario</h2>
      <img
        :src="bellIcon"
        alt="notification bell"
        class="mt-1 md:mt-2 size-4 md:size-6"
      />
    </div>
    <div class="flex items-center flex-wrap gap-3 mt-4 mb-7">
      <FilterButton
        :icon="filterIcon"
        :isSelect="isDogSelect"
        text="Filtrar"
        @click="selectDogs"
      />
      <FilterButton
        :icon="filterIcon"
        :isSelect="isCatSelect"
        text="Medicinas"
        @click="selectCats"
      />
    </div>

    <section class="gap-x-5 flex md:gap-x-5 lg:gap-x-11 gap-y-9 flex-wrap mt-2">
      <RouterLink
        v-for="animal in animalesFiltered"
        :key="animal.id"
        :to="`/pet-info/${animal.id}`"
        class="gap-x-5 flex md:gap-x-5 lg:gap-x-11 gap-y-9 flex-wrap mt-2"
      >
        <AnimalCard :animal="animal" />
      </RouterLink>
    </section>
  </div>
</template>

<style scoped></style>
