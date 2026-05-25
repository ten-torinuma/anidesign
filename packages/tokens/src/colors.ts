// カラートークン — OKLCH ベース 12段階スケール
// ブランドカラー: 縁（えにし）紫 hue 305
// ニュートラル: 紫みがかったグレー hue 270

type ColorToken = { $value: string; $type: "color" };
type ColorScale = Record<string, ColorToken>;

function scale(hue: number, lightValues: [number, number][], darkValues: [number, number][]): {
  light: ColorScale;
  dark: ColorScale;
} {
  const toToken = ([l, c]: [number, number]): ColorToken => ({
    $value: `oklch(${l}% ${c} ${hue})`,
    $type: "color",
  });
  const steps = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] as const;
  return {
    light: Object.fromEntries(steps.map((s, i) => [s, toToken(lightValues[i]!)])),
    dark: Object.fromEntries(steps.map((s, i) => [s, toToken(darkValues[i]!)])),
  };
}

const primary = scale(
  305,
  // light: [L%, C]
  [
    [98.5, 0.005], [96.0, 0.012], [93.0, 0.028], [88.5, 0.048], [82.5, 0.078], [74.0, 0.112],
    [64.5, 0.148], [54.5, 0.172], [45.5, 0.158], [38.0, 0.134], [29.0, 0.102], [17.0, 0.065],
  ],
  // dark: [L%, C]
  [
    [14.0, 0.020], [19.0, 0.028], [25.0, 0.040], [30.0, 0.052], [36.0, 0.065], [43.0, 0.080],
    [52.0, 0.100], [62.0, 0.130], [65.0, 0.155], [70.0, 0.145], [80.0, 0.110], [94.0, 0.045],
  ],
);

const neutral = scale(
  270,
  [
    [99.0, 0.002], [97.5, 0.004], [94.5, 0.008], [91.0, 0.012], [86.5, 0.016], [80.0, 0.020],
    [71.5, 0.024], [60.0, 0.028], [49.0, 0.024], [40.0, 0.020], [30.0, 0.016], [13.5, 0.010],
  ],
  [
    [13.0, 0.008], [17.0, 0.010], [22.0, 0.014], [27.0, 0.016], [32.0, 0.018], [39.0, 0.020],
    [48.0, 0.022], [59.0, 0.024], [67.0, 0.020], [72.0, 0.018], [82.0, 0.014], [96.0, 0.004],
  ],
);

// セマンティックカラー（3: bg / 9: solid / 11: text の3ステップのみ）
const semantic = {
  success: {
    light: {
      "3":  { $value: "oklch(93.5% 0.040 145)", $type: "color" as const },
      "9":  { $value: "oklch(55.0% 0.165 145)", $type: "color" as const },
      "11": { $value: "oklch(38.0% 0.130 145)", $type: "color" as const },
    },
    dark: {
      "3":  { $value: "oklch(22.0% 0.055 145)", $type: "color" as const },
      "9":  { $value: "oklch(62.0% 0.165 145)", $type: "color" as const },
      "11": { $value: "oklch(78.0% 0.130 145)", $type: "color" as const },
    },
  },
  warning: {
    light: {
      "3":  { $value: "oklch(95.0% 0.045 65)", $type: "color" as const },
      "9":  { $value: "oklch(72.0% 0.165 65)", $type: "color" as const },
      "11": { $value: "oklch(45.0% 0.130 65)", $type: "color" as const },
    },
    dark: {
      "3":  { $value: "oklch(22.0% 0.055 65)", $type: "color" as const },
      "9":  { $value: "oklch(78.0% 0.165 65)", $type: "color" as const },
      "11": { $value: "oklch(88.0% 0.130 65)", $type: "color" as const },
    },
  },
  error: {
    light: {
      "3":  { $value: "oklch(94.0% 0.045 25)", $type: "color" as const },
      "9":  { $value: "oklch(55.0% 0.210 25)", $type: "color" as const },
      "11": { $value: "oklch(40.0% 0.175 25)", $type: "color" as const },
    },
    dark: {
      "3":  { $value: "oklch(21.0% 0.060 25)", $type: "color" as const },
      "9":  { $value: "oklch(65.0% 0.210 25)", $type: "color" as const },
      "11": { $value: "oklch(80.0% 0.175 25)", $type: "color" as const },
    },
  },
  info: {
    light: {
      "3":  { $value: "oklch(93.5% 0.040 240)", $type: "color" as const },
      "9":  { $value: "oklch(55.0% 0.175 240)", $type: "color" as const },
      "11": { $value: "oklch(38.0% 0.140 240)", $type: "color" as const },
    },
    dark: {
      "3":  { $value: "oklch(20.0% 0.055 240)", $type: "color" as const },
      "9":  { $value: "oklch(65.0% 0.175 240)", $type: "color" as const },
      "11": { $value: "oklch(80.0% 0.140 240)", $type: "color" as const },
    },
  },
};

export const colorTokens = {
  light: {
    color: {
      primary:  primary.light,
      neutral:  neutral.light,
      success:  semantic.success.light,
      warning:  semantic.warning.light,
      error:    semantic.error.light,
      info:     semantic.info.light,
    },
  },
  dark: {
    color: {
      primary:  primary.dark,
      neutral:  neutral.dark,
      success:  semantic.success.dark,
      warning:  semantic.warning.dark,
      error:    semantic.error.dark,
      info:     semantic.info.dark,
    },
  },
};

export default colorTokens;
