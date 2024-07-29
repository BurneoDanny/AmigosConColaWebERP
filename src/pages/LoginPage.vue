<script setup lang="ts">
import logo from "@/assets/images/amigos-con-cola-logo.png";
import { toTypedSchema } from "@vee-validate/yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { InferType } from "yup";
import { useAuth } from "@stores/authStore.ts";
import { useRouter } from "vue-router";

const schema = yup.object({
  username: yup.string().required("El nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

const typedSchema = toTypedSchema(schema);
const auth = useAuth();
const router = useRouter();

const onSubmit = async (values: InferType<typeof schema>) => {
  try {
    await auth.login({
      username: values.username,
      password: values.password,
    });
    await router.push("/home");
  } catch {
    // TODO: Show error in toast.
  }
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img class="w-10 h-10 mr-2" :src="logo" alt="logo" />
        Amigos con Cola
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Entra con tu cuenta
          </h1>
          <Form
            class="space-y-4 md:space-y-6"
            @submit="onSubmit"
            :validation-schema="typedSchema"
          >
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre de usuario
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <ErrorMessage name="username" class="text-red-600" />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contraseña
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <ErrorMessage name="password" class="text-red-600" />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary"
            >
              Ingresa
            </button>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>
