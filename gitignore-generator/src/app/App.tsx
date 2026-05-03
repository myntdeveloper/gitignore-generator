import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import gitIcon from "../assets/git.svg";
import gopherAsset from "../assets/gopher.svg";
import rustAsset from "../assets/rust.svg";
import plusIcon from "../assets/plus.svg";
import copyIcon from "../assets/copy.svg";
import { AnimatedLanguageTitle } from "../components/AnimatedLanguageTitle";
import { GitignoreEditor } from "../components/GitignoreEditor";
import { LanguageSuggestions } from "../components/LanguageSuggestions";
import { PresetGrid } from "../components/PresetGrid";
import { SelectedPresetTags } from "../components/SelectedPresetTags";
import { GenerateButton } from "../components/ui/GenerateButton";
import { LanguageInput } from "../components/ui/LanguageInput";
import { languagePresets } from "../data/gitignores/presets";
import type { LanguagePreset } from "../types/preset";
import { buildGitignore } from "../utils/gitignore";
import { normalizeKey } from "../utils/normalize";
import { pickRandomItems } from "../utils/random";

const GITHUB_URL = "https://github.com/myntdeveloper/gitignore-generator";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedPresets, setSelectedPresets] = useState<LanguagePreset[]>([]);
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [animatedText, setAnimatedText] = useState("Golang");
  const [animatedIndex, setAnimatedIndex] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [randomPresetList] = useState(() => {
    return pickRandomItems(languagePresets, 6);
  });

  useEffect(() => {
    const currentWord = languagePresets[animatedIndex].label;
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (animatedText.length < currentWord.length) {
            setAnimatedText(currentWord.slice(0, animatedText.length + 1));
          } else {
            setIsDeleting(true);
          }
          return;
        }
        if (animatedText.length > 0) {
          setAnimatedText(currentWord.slice(0, animatedText.length - 1));
          return;
        }
        setIsDeleting(false);
        setAnimatedIndex((prev) => (prev + 1) % languagePresets.length);
      },
      isDeleting ? 70 : 120,
    );
    return () => clearTimeout(timeout);
  }, [animatedIndex, animatedText, isDeleting]);

  const animatedPreset = useMemo(() => {
    return languagePresets[animatedIndex];
  }, [animatedIndex]);

  const suggestions = useMemo(() => {
    const query = normalizeKey(inputValue);
    if (!query) {
      return [];
    }
    const selected = new Set(selectedPresets.map((preset) => preset.id));
    return languagePresets
      .filter((preset) => !selected.has(preset.id))
      .filter((preset) => normalizeKey(preset.label).includes(query))
      .slice(0, 7);
  }, [inputValue, selectedPresets]);

  const lineCount = useMemo(() => {
    if (!generatedCode) {
      return 0;
    }
    return generatedCode.split("\n").length;
  }, [generatedCode]);

  const byteCount = useMemo(() => {
    if (!generatedCode) {
      return 0;
    }
    return new TextEncoder().encode(generatedCode).length;
  }, [generatedCode]);

  function addPreset(rawValue: string) {
    const preset = rawValue.trim();
    if (!preset) {
      return;
    }
    const matched = languagePresets.find(
      (item) =>
        item.id === normalizeKey(preset) ||
        normalizeKey(item.label) === normalizeKey(preset),
    );
    if (!matched) {
      setInputValue("");
      return;
    }
    const alreadySelected = selectedPresets.some((item) => item.id === matched.id);
    if (!alreadySelected) {
      setSelectedPresets((prev) => [...prev, matched]);
    }
    setInputValue("");
  }

  function removePreset(presetId: string) {
    setSelectedPresets((prev) => prev.filter((item) => item.id !== presetId));
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (suggestions.length > 0) {
        addPreset(suggestions[0].id);
      } else {
        addPreset(inputValue);
      }
    }
  }

  async function generateGitignore() {
    if (selectedPresets.length === 0) {
      setGenerateError("Add at least one language.");
      return;
    }
    setIsGenerating(true);
    setGenerateError("");
    try {
      setGeneratedCode(buildGitignore(selectedPresets));
    } catch {
      setGenerateError("Could not generate .gitignore. Try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function copyCode() {
    if (!generatedCode) {
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopyLabel("Copied");
      setTimeout(() => setCopyLabel("Copy"), 1500);
    } catch {
      setCopyLabel("Failed");
      setTimeout(() => setCopyLabel("Copy"), 1500);
    }
  }

  return (
    <div className="page">
      <a
        className="github-link"
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Open project GitHub page"
      >
        <img src={gitIcon} alt="GitHub" />
      </a>

      <div className="top-section">
        <AnimatedLanguageTitle
          languageName={animatedText}
          languageColor={animatedPreset.color}
        />

        <div className="input-row">
          <LanguageInput
            value={inputValue}
            onKeyDown={onInputKeyDown}
            onChange={setInputValue}
          />
          <GenerateButton
            isGenerating={isGenerating}
            plusIcon={plusIcon}
            onClick={() => void generateGitignore()}
          />
        </div>

        <LanguageSuggestions suggestions={suggestions} onSelect={addPreset} />
        <SelectedPresetTags selectedPresets={selectedPresets} onRemove={removePreset} />
        {!generatedCode && <PresetGrid presets={randomPresetList} />}

        {generateError && <p className="status error">{generateError}</p>}
      </div>

      <img src={rustAsset} className="corner-art rust" alt="" aria-hidden="true" />
      <img src={gopherAsset} className="corner-art gopher" alt="" aria-hidden="true" />

      <GitignoreEditor
        selectedPresets={selectedPresets}
        generatedCode={generatedCode}
        lineCount={lineCount}
        byteCount={byteCount}
        copyLabel={copyLabel}
        copyIcon={copyIcon}
        onCopy={() => void copyCode()}
      />
    </div>
  );
}
