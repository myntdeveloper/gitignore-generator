import type { LanguagePreset } from "../types/preset";

type SelectedPresetTagsProps = {
  selectedPresets: LanguagePreset[];
  onRemove: (presetId: string) => void;
};

export function SelectedPresetTags({
  selectedPresets,
  onRemove,
}: SelectedPresetTagsProps) {
  if (selectedPresets.length === 0) {
    return null;
  }

  return (
    <div className="selected-tags">
      {selectedPresets.map((preset) => (
        <button
          key={preset.id}
          type="button"
          className="tag"
          onClick={() => onRemove(preset.id)}
          aria-label={`Remove ${preset.label}`}
          style={{ borderColor: preset.color, color: preset.color }}
        >
          {preset.label}
          <svg
            className="tag-mark"
            width="21"
            height="24"
            viewBox="0 0 21 24"
            aria-hidden="true"
          >
            <path
              d="M15.75 6L5.25 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.25 6L15.75 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
