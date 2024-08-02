import { Meta, StoryObj } from "@storybook/vue3";
import ProductRegistration from "@/pages/product_registration/ProductRegistration.vue";

const meta: Meta<typeof ProductRegistration> = {
  component: ProductRegistration,
};
export default meta;
type Story = StoryObj<typeof ProductRegistration>;

export const Primary: Story = {
  render: () => ({
    components: { ProductRegistration },
    template: "<ProductRegistration />",
  }),

  name: "Creacion de Producto de Inventario",
};
