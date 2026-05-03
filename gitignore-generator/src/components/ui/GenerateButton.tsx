type GenerateButtonProps = {
  isGenerating: boolean;
  plusIcon: string;
  onClick: () => void;
};

export function GenerateButton({
  isGenerating,
  plusIcon,
  onClick,
}: GenerateButtonProps) {
  return (
    <button
      type="button"
      className="generate-btn"
      onClick={onClick}
      disabled={isGenerating}
    >
      <img src={plusIcon} alt="" aria-hidden="true" />
      {isGenerating ? "Generating..." : "Generate"}
    </button>
  );
}
