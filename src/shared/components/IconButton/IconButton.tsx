type IconButtonProps = {
  children: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  size?: number;
  variant?: "glass" | "solid" | "ghost";
  className?: string;
};

const variants = {
  glass:
    "border border-border-glass bg-surface-glass backdrop-blur-md text-text-primary",
  solid: "border border-border-subtle bg-surface text-text-primary",
  ghost: "bg-transparent text-text-primary",
};

export function IconButton({
  children,
  ariaLabel,
  onClick,
  size = 42,
  variant = "solid",
  className = "",
}: IconButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={`flex flex-none cursor-pointer items-center justify-center rounded-full transition-transform active:scale-90 ${variants[variant]} ${className}`}
      onClick={onClick}
      style={{ width: size, height: size }}
      type="button"
    >
      {children}
    </button>
  );
}
