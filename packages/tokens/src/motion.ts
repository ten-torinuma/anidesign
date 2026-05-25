// モーショントークン — アニメーション持続時間とイージング

export const motionTokens = {
  motion: {
    duration: {
      fast:   { $value: "100ms", $type: "string" as const },
      normal: { $value: "200ms", $type: "string" as const },
      slow:   { $value: "350ms", $type: "string" as const },
    },
    easing: {
      "ease-in":     { $value: "cubic-bezier(0.4, 0, 1, 1)",        $type: "string" as const },
      "ease-out":    { $value: "cubic-bezier(0, 0, 0.2, 1)",        $type: "string" as const },
      "ease-in-out": { $value: "cubic-bezier(0.4, 0, 0.2, 1)",      $type: "string" as const },
      spring:        { $value: "cubic-bezier(0.34, 1.56, 0.64, 1)", $type: "string" as const },
    },
  },
};

export default motionTokens;
