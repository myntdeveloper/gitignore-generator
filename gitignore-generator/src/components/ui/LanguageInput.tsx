import type { KeyboardEvent } from "react";

type LanguageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export function LanguageInput({ value, onChange, onKeyDown }: LanguageInputProps) {
  return (
    <input
      type="text"
      className="preset-input"
      placeholder="Type language or OS from list"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
