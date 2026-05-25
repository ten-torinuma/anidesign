import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@eni/ui/components";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "subtle", "secondary", "destructive", "success"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Badge", variant: "default" },
};

export const Outline: Story = {
  args: { children: "EniTrance", variant: "outline" },
};

export const Subtle: Story = {
  args: { children: "Identity Platform", variant: "subtle" },
};

export const ServiceTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline"><code className="mr-1">EniTrance</code>Identity Platform</Badge>
      <Badge variant="outline"><code className="mr-1">EniDB</code>GraphQL Data Platform</Badge>
      <Badge variant="outline">FastAPI · Next.js · Ariadne</Badge>
      <Badge variant="outline">GCP Cloud Run / Firestore / BigQuery / Spanner</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
    </div>
  ),
};
