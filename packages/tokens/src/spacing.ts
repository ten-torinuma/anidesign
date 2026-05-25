// スペーシングトークン — 4px グリッドスケール

export const spacingTokens = {
  spacing: {
    "0":  { $value: "0px",    $type: "dimension" as const },
    "1":  { $value: "4px",    $type: "dimension" as const },
    "2":  { $value: "8px",    $type: "dimension" as const },
    "3":  { $value: "12px",   $type: "dimension" as const },
    "4":  { $value: "16px",   $type: "dimension" as const },
    "5":  { $value: "20px",   $type: "dimension" as const },
    "6":  { $value: "24px",   $type: "dimension" as const },
    "8":  { $value: "32px",   $type: "dimension" as const },
    "10": { $value: "40px",   $type: "dimension" as const },
    "12": { $value: "48px",   $type: "dimension" as const },
    "16": { $value: "64px",   $type: "dimension" as const },
    "20": { $value: "80px",   $type: "dimension" as const },
    "24": { $value: "96px",   $type: "dimension" as const },
    "32": { $value: "128px",  $type: "dimension" as const },
  },
};

export default spacingTokens;
