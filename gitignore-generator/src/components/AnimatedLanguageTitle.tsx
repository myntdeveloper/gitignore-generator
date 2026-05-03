type AnimatedLanguageTitleProps = {
  languageName: string;
  languageColor: string;
};

export function AnimatedLanguageTitle({
  languageName,
  languageColor,
}: AnimatedLanguageTitleProps) {
  return (
    <h1 className="title">
      Generate <span>.gitignore</span> for{" "}
      <span style={{ color: languageColor }}>{languageName || "\u00A0"}</span>
    </h1>
  );
}
