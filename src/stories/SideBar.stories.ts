import { Meta, StoryObj } from "@storybook/vue3";

import SideBar from "@/components/SideBar.vue";

const meta: Meta<typeof SideBar> = { component: SideBar };

export default meta;

type Story = StoryObj<typeof SideBar>;

export const Primary: Story = {
  render: () => ({
    components: { SideBar },
    template: "<SideBar />",
  }),
};
