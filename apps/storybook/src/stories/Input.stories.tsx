import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@eni/ui/components";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "テキストを入力...", type: "text" },
};

export const Email: Story = {
  args: { placeholder: "email@example.com", type: "email" },
};

export const Password: Story = {
  args: { placeholder: "パスワード", type: "password" },
};

export const Disabled: Story = {
  args: { placeholder: "無効", disabled: true },
};
