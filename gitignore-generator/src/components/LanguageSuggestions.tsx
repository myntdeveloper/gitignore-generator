import type { LanguagePreset } from "../types/preset";

type LanguageSuggestionsProps = {
  suggestions: LanguagePreset[];
  onSelect: (presetId: string) => void;
};

export function LanguageSuggestions({
  suggestions,
  onSelect,
}: LanguageSuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul className="suggestions">
      {suggestions.map((preset) => (
        <li key={preset.id}>
          <button type="button" onClick={() => onSelect(preset.id)}>
            <strong style={{ color: preset.color }}>{preset.label}</strong>
            <span>{preset.description}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
