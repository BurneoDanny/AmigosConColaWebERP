import { Meta, StoryObj } from "@storybook/vue3";
import DesparasitacionModal from "@/components/DesparasitacionModal.vue";

const meta: Meta<typeof DesparasitacionModal> = { component: DesparasitacionModal };

export default meta;

type Story = StoryObj<typeof DesparasitacionModal>;

export const Primary: Story = () => ({
    components: { DesparasitacionModal },
    template: `
    <div>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button>
      <DesparasitacionModal />
    </div>
  `,
});