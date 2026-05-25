import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  appBg: "oklch(99.5% 0.001 280)",
  appContentBg: "oklch(99.5% 0.001 280)",
  appPreviewBg: "oklch(99.5% 0.001 280)",
  appBorderRadius: 8,
});

addons.setConfig({ theme });
