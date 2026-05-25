// tweaks-app.jsx — Tweaks panel for the EniTrance architecture site.
// Tweakable: accent hue, logo variant, role color emphasis, annotation visibility,
// grid overlay (wireframe mode), density.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#5b5bd6",
  "logo": "door",
  "roleColors": true,
  "annotations": true,
  "grid": false,
  "density": "regular"
}/*EDITMODE-END*/;

// Accent palette options. The displayed hex is the rough OKLCH center;
// we look up the canonical hue value to drive the ramp on the page.
const ACCENT_HEX_TO_HUE = {
  "#5b5bd6": 280, // iris
  "#3e63dd": 260, // indigo
  "#00a2c7": 210, // cyan
  "#00a572": 165, // mint
  "#b59a00":  60, // amber
  "#c6304d":  15, // crimson
};
const ACCENT_OPTIONS = Object.keys(ACCENT_HEX_TO_HUE);

function applyAccent(hex) {
  const c = ACCENT_HEX_TO_HUE[String(hex).toLowerCase()] ?? 280;
  const root = document.documentElement;
  // Maintain the iris ramp shape, vary hue only.
  root.style.setProperty("--accent-1",  `oklch(0.985 0.010 ${c})`);
  root.style.setProperty("--accent-3",  `oklch(0.955 0.030 ${c})`);
  root.style.setProperty("--accent-6",  `oklch(0.85  0.080 ${c})`);
  root.style.setProperty("--accent-9",  `oklch(0.55  0.180 ${c})`);
  root.style.setProperty("--accent-10", `oklch(0.50  0.180 ${c})`);
  root.style.setProperty("--accent-11", `oklch(0.46  0.170 ${c})`);
  // role-staff borrows from accent for visual unity
  root.style.setProperty("--role-staff-bg", `oklch(0.955 0.030 ${c})`);
  root.style.setProperty("--role-staff-fg", `oklch(0.46  0.170 ${c})`);
}

function applyBodyAttr(key, value) {
  document.body.setAttribute(key, value);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks as side effects whenever they change
  React.useEffect(() => { applyAccent(t.accent); }, [t.accent]);
  React.useEffect(() => { applyBodyAttr("data-logo", t.logo); }, [t.logo]);
  React.useEffect(() => {
    applyBodyAttr("data-show-role-color", t.roleColors ? "on" : "off");
  }, [t.roleColors]);
  React.useEffect(() => {
    applyBodyAttr("data-annotations", t.annotations ? "on" : "off");
  }, [t.annotations]);
  React.useEffect(() => {
    applyBodyAttr("data-grid", t.grid ? "on" : "off");
  }, [t.grid]);
  React.useEffect(() => {
    applyBodyAttr("data-density", t.density);
  }, [t.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand" />
      <TweakSelect
        label="ロゴ"
        value={t.logo}
        options={[
          { value: "door",     label: "Door (扉アイコン+wordmark)" },
          { value: "brackets", label: "Brackets ([EniTrance])" },
          { value: "dots",     label: "Dots (●●●)" },
        ]}
        onChange={(v) => setTweak("logo", v)}
      />
      <TweakColor
        label="Accent"
        value={t.accent}
        options={ACCENT_OPTIONS}
        onChange={(v) => setTweak("accent", v)}
      />

      <TweakSection label="Diagram" />
      <TweakToggle
        label="ロール別の色付け"
        value={t.roleColors}
        onChange={(v) => setTweak("roleColors", v)}
      />
      <TweakToggle
        label="技術注釈ラベル"
        value={t.annotations}
        onChange={(v) => setTweak("annotations", v)}
      />
      <TweakToggle
        label="ワイヤーフレーム グリッド"
        value={t.grid}
        onChange={(v) => setTweak("grid", v)}
      />

      <TweakSection label="Layout" />
      <TweakRadio
        label="密度"
        value={t.density}
        options={["compact", "regular"]}
        onChange={(v) => setTweak("density", v)}
      />
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById("tweaks-root"));
root.render(<App />);
