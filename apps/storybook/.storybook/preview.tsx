import type { Decorator, Preview } from "@storybook/react";
import React from "react";
import "@eni/ui/globals.css";

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals["theme"] ?? "light";
  return (
    <div data-theme={theme} className="bg-background text-foreground p-8">
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "カラーテーマ",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    backgrounds: { disable: true },
    layout: "padded",
    docs: {
      canvas: { style: { background: "oklch(99.5% 0.001 280)" } },
    },
  },
};

export default preview;
