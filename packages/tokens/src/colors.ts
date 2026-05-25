// カラートークン — OKLCH ベース 12段階スケール
//
// --eni-hue を上書きするだけでブランドカラーが全体に反映される。
// デフォルト hue 280 = #625ed6 (blue-purple / indigo)
//
// 消費アプリ側での上書き例:
//   :root { --eni-hue: 318; }  /* 紫草パープルに変更 */
//   :root { --eni-hue: 145; }  /* グリーンに変更 */

type ColorToken = { $value: string; $type: "color" };
type ColorScale = Record<string, ColorToken>;

function scale(hue: string | number, lightValues: [number, number][], darkValues: [number, number][]): {
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

// step 9 light = oklch(55.1% 0.179 280) ≈ #625ed6
// hue は var(--eni-hue) で動的に切り替え可能
const primary = scale(
  "var(--eni-hue)",
  // light: [L%, C]  — step 9 が #625ed6 相当 (hue 280 時)
  [
    [98.5, 0.006], [96.0, 0.015], [93.0, 0.030], [88.5, 0.058], [82.5, 0.095], [74.5, 0.135],
    [67.0, 0.162], [61.0, 0.175], [55.1, 0.179], [46.0, 0.165], [35.0, 0.135], [22.0, 0.090],
  ],
  // dark: [L%, C]
  [
    [14.0, 0.030], [19.0, 0.048], [25.0, 0.070], [31.5, 0.096], [38.5, 0.124], [46.5, 0.152],
    [53.5, 0.172], [59.5, 0.178], [67.0, 0.168], [75.5, 0.142], [84.0, 0.105], [94.0, 0.048],
  ],
);

// ニュートラルも hue に追従（極低彩度）— ブランドカラーに自然に馴染む
const neutral = scale(
  "var(--eni-hue)",
  // light: [L%, C]  — C を極小にして "ほんのり色味のあるグレー" に
  [
    [100.0, 0.000], [96.5, 0.004], [92.5, 0.007], [88.0, 0.010], [83.0, 0.012], [76.0, 0.013],
    [66.5, 0.014], [56.0, 0.014], [45.5, 0.013], [35.0, 0.011], [24.0, 0.009], [13.5, 0.006],
  ],
  // dark: [L%, C]
  [
    [13.5, 0.006], [18.0, 0.007], [23.5, 0.009], [29.5, 0.011], [37.0, 0.012], [47.0, 0.013],
    [58.0, 0.014], [69.0, 0.013], [79.5, 0.011], [86.5, 0.009], [91.5, 0.005], [97.5, 0.003],
  ],
);

// セマンティックカラー（固定色 — hue に依存しない）
const semantic = {
  success: {
    light: {
      "3":  { $value: "oklch(93.0% 0.055 145)", $type: "color" as const },
      "9":  { $value: "oklch(55.0% 0.165 145)", $type: "color" as const },
      "11": { $value: "oklch(38.0% 0.130 145)", $type: "color" as const },
    },
    dark: {
      "3":  { $value: "oklch(22.0% 0.060 145)", $type: "color" as const },
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
