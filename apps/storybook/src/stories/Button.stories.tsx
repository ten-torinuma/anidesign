import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@eni/ui/components";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "ボタン", variant: "default" },
};

export const Secondary: Story = {
  args: { children: "セカンダリ", variant: "secondary" },
};

export const Outline: Story = {
  args: { children: "アウトライン", variant: "outline" },
};

export const Ghost: Story = {
  args: { children: "ゴースト", variant: "ghost" },
};

export const Destructive: Story = {
  args: { children: "削除", variant: "destructive" },
};

export const Link: Story = {
  args: { children: "リンク", variant: "link" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { children: "無効", disabled: true },
};
