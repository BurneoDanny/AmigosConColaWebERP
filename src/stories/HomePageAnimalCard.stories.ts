import { Meta, StoryObj } from "@storybook/vue3";

import AnimalCard from "@/components/home_page/AnimalCard.vue";
import { Animal } from "@pages/Home.vue";

const meta: Meta<typeof AnimalCard> = {
  component: AnimalCard,
};

export default meta;

type Story = StoryObj<typeof AnimalCard>;

export const Primary: Story = {
  render: (args: { animal: Animal }) => ({
    components: { AnimalCard },
    template: '<AnimalCard v-bind="args" />',
    setup() {
      return { args };
    },
  }),
  args: {
    animal: {
      id: 1,
      nombre: "Alias Fito",
      edad: 2,
      genero: "Masculino",
      imagen:
        "https://media.istockphoto.com/id/1482199015/es/foto/feliz-cachorro-gal%C3%A9s-corgi-14-semanas-de-edad-perro-gui%C3%B1ando-un-ojo-jadeando-y-sentado-aislado.webp?s=1024x1024&w=is&k=20&c=rsFg2u7HyCI8EnXJ7MjW94mu2fyulJx-LV5UVvzzowk=",
      // Que es el estado?
      estado: true,
      // Renombremos esto a especie
      tipo: "Perro",
    },
  },
};
