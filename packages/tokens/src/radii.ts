// 角丸トークン

export const radiiTokens = {
  radius: {
    none: { $value: "0px",    $type: "dimension" as const },
    sm:   { $value: "4px",    $type: "dimension" as const },
    md:   { $value: "6px",    $type: "dimension" as const },
    lg:   { $value: "8px",    $type: "dimension" as const },
    xl:   { $value: "12px",   $type: "dimension" as const },
    "2xl": { $value: "16px",  $type: "dimension" as const },
    full: { $value: "9999px", $type: "dimension" as const },
  },
};

export default radiiTokens;
