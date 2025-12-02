interface ToolbarButtonProps {
  label: string;
  icon: string;
  onClick: () => void;
}

export function ToolbarButton({ label, icon, onClick }: ToolbarButtonProps) {
  return (
    <button
      className="toolbar__button"
      onClick={onClick}
      aria-label={`Add ${label}`}
    >
      <span className="toolbar__button-icon">{icon}</span>
      <span className="toolbar__button-text">{label}</span>
    </button>
  );
}
