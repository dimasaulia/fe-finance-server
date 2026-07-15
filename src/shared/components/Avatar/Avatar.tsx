type AvatarProps = {
  initials: string;
  size?: number;
  rounded?: "full" | "squircle";
  onClick?: () => void;
  ariaLabel?: string;
};

export function Avatar({
  initials,
  size = 44,
  rounded = "squircle",
  onClick,
  ariaLabel,
}: AvatarProps) {
  const className = `flex flex-none items-center justify-center bg-gradient-to-br from-brand-500 to-brand-600 font-heading font-bold text-white ${
    rounded === "full" ? "rounded-full" : "rounded-2xl"
  }`;
  const style = {
    width: size,
    height: size,
    fontSize: size * 0.36,
  };

  if (onClick) {
    return (
      <button
        aria-label={ariaLabel ?? initials}
        className={`${className} cursor-pointer border-none p-0 transition-transform active:scale-90`}
        onClick={onClick}
        style={style}
        type="button"
      >
        {initials}
      </button>
    );
  }

  return (
    <div className={className} style={style}>
      {initials}
    </div>
  );
}
