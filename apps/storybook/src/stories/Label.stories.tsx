import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@eni/ui/components";
import { Label } from "@eni/ui/components";

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "メールアドレス" },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">メールアドレス</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};
