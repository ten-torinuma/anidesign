// タイポグラフィトークン

export const typographyTokens = {
  font: {
    family: {
      sans: { $value: "'Inter', system-ui, sans-serif",              $type: "string" as const },
      mono: { $value: "'JetBrains Mono', ui-monospace, monospace",   $type: "string" as const },
    },
    size: {
      xs:   { $value: "11px", $type: "dimension" as const },
      sm:   { $value: "13px", $type: "dimension" as const },
      base: { $value: "15px", $type: "dimension" as const },
      lg:   { $value: "17px", $type: "dimension" as const },
      xl:   { $value: "20px", $type: "dimension" as const },
      "2xl": { $value: "24px", $type: "dimension" as const },
      "3xl": { $value: "30px", $type: "dimension" as const },
      "4xl": { $value: "36px", $type: "dimension" as const },
    },
    weight: {
      regular:  { $value: "400", $type: "string" as const },
      medium:   { $value: "500", $type: "string" as const },
      semibold: { $value: "600", $type: "string" as const },
      bold:     { $value: "700", $type: "string" as const },
    },
    lineHeight: {
      tight:   { $value: "1.3",  $type: "string" as const },
      normal:  { $value: "1.6",  $type: "string" as const },
      relaxed: { $value: "1.75", $type: "string" as const },
    },
  },
};

export default typographyTokens;
