<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
const isDropdownOpen = ref(false);
const dropDownState = ref("Interno");

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (state: string) => {
  isDropdownOpen.value = false;
  dropDownState.value = state;
};
</script>
<template>
  <div
    id="default-modal"
    tabindex="-1"
    :aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-lg max-h-full">
      <div class="relative bg-white rounded-lg shadow-gray-800 shadow-md">
        <div class="flex flex-col justify-center items-center font-medium">
          <div class="w-full flex flex-col gap-3 px-12">
            <h1 class="text-gray-500 font-base text-sm mt-8">
              Desparasitación
            </h1>
            <div class="flex items-center px-2 relative">
              <label class="w-1/2">Tipo:</label>
              <div class="flex flex-col w-1/2">
                <button
                  @click="toggleDropdown"
                  class="flex items-center justify-between border border-gray-500 p-1"
                >
                  {{ dropDownState }}
                  <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  v-if="isDropdownOpen"
                  class="absolute top-[35px] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <p
                        @click="closeDropdown('Interno')"
                        class="block px-4 py-2 cursor-pointer"
                        :class="{
                          'bg-gray-600 text-white ':
                            dropDownState === 'Interno',
                          'bg-white hover:bg-gray-100':
                            dropDownState !== 'Interno',
                        }"
                      >
                        Interno
                      </p>
                    </li>
                    <li>
                      <p
                        @click="closeDropdown('Externo')"
                        class="block px-4 py-2 cursor-pointer"
                        :class="{
                          'bg-gray-600 text-white ':
                            dropDownState === 'Externo',
                          'bg-white hover:bg-gray-100':
                            dropDownState !== 'Externo',
                        }"
                      >
                        Externo
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="flex items-center px-2">
              <label class="w-1/2">Fecha:</label>
              <div class="relative max-w-sm w-1/2">
                <div
                  class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                    />
                  </svg>
                </div>
                <input
                  datepicker
                  datepicker-format="mm/dd/yyyy"
                  type="text"
                  class="bg-gray-50 border border-gray-500 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />
              </div>
            </div>
            <div class="flex items-center px-2">
              <label class="w-1/2">Producto:</label>
              <input
                type="text"
                v-model="inputValue"
                placeholder="1 kg"
                class="w-1/2"
              />
            </div>
            <div class="flex items-center px-2">
              <label class="w-1/2">Peso del animal:</label>
              <input
                type="text"
                v-model="inputValue"
                placeholder="1 kg"
                class="w-1/2"
              />
            </div>
            <div class="flex items-center px-2">
              <label class="w-1/2">Formato:</label>
              <input
                type="text"
                v-model="inputValue"
                placeholder="1 kg"
                class="w-1/2"
              />
            </div>
          </div>
          <div
            class="flex w-full justify-end items-center font-medium py-4 gap-2 px-4 mt-4"
          >
            <button
              class="w-32 p-2 rounded-full shadow-gray-500 shadow-md"
              data-modal-hide="default-modal"
            >
              Cancelar
            </button>
            <button
              class="w-32 p-2 rounded-full shadow-gray-500 shadow-md bg-primary"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
