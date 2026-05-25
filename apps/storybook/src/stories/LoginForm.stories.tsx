import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "@eni/ui/patterns";

const meta = {
  title: "Patterns/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const GoogleOnly: Story = {
  args: {
    serviceName: "AniService",
    onGoogleSignIn: async () => { await delay(1500); },
  },
};

export const EmailOnly: Story = {
  args: {
    serviceName: "AniService",
    onEmailSignIn: async () => { await delay(1500); },
  },
};

export const Both: Story = {
  args: {
    serviceName: "AniService",
    onGoogleSignIn: async () => { await delay(1500); },
    onEmailSignIn: async () => { await delay(1500); },
  },
};

export const WithError: Story = {
  args: {
    serviceName: "AniService",
    onGoogleSignIn: async () => { await delay(500); },
    onEmailSignIn: async () => { await delay(500); },
    error: "メールアドレスまたはパスワードが正しくありません",
  },
};

export const Loading: Story = {
  args: {
    serviceName: "AniService",
    onGoogleSignIn: async () => { await delay(1500); },
    onEmailSignIn: async () => { await delay(1500); },
    isLoading: true,
  },
};
