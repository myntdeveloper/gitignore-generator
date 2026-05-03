import Editor from "@monaco-editor/react";
import type { LanguagePreset } from "../types/preset";

type GitignoreEditorProps = {
  selectedPresets: LanguagePreset[];
  generatedCode: string;
  lineCount: number;
  byteCount: number;
  copyLabel: string;
  copyIcon: string;
  onCopy: () => void;
};

export function GitignoreEditor({
  selectedPresets,
  generatedCode,
  lineCount,
  byteCount,
  copyLabel,
  copyIcon,
  onCopy,
}: GitignoreEditorProps) {
  if (!generatedCode) {
    return null;
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <div className="editor-tabs">
          {selectedPresets.map((preset) => (
            <span
              key={preset.id}
              className="editor-tab"
              style={{ color: preset.color, borderColor: preset.color }}
            >
              {preset.label}
            </span>
          ))}
        </div>
        <button type="button" className="copy-btn" onClick={onCopy}>
          <img src={copyIcon} alt="" aria-hidden="true" />
          {copyLabel}
        </button>
      </div>

      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="gitignore"
          value={generatedCode}
          theme="vs-light"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "off",
            fontSize: 13,
            lineNumbersMinChars: 2,
            automaticLayout: true,
          }}
        />
      </div>

      <div className="editor-footer">
        <span>{lineCount} lines</span>
        <span>{byteCount} bytes</span>
      </div>
    </div>
  );
}
