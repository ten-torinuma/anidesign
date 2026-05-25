import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins ??= [];
    config.plugins.push(tailwindcss());
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../../../packages/ui/src"),
    };
    return config;
  },
};

export default config;
