import type { LanguagePreset } from "../types/preset";

type PresetGridProps = {
  presets: LanguagePreset[];
};

export function PresetGrid({ presets }: PresetGridProps) {
  return (
    <div className="preset-list">
      {presets.map((preset) => (
        <div key={preset.id} className="preset-item">
          <span style={{ color: preset.color }}>{preset.label}</span>
          <small>{preset.description}</small>
        </div>
      ))}
    </div>
  );
}
