type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animationDelay?: string;
};

export function GlassCard({
  children,
  className = "",
  onClick,
  animationDelay,
}: GlassCardProps) {
  const shared = `rounded-[22px] border border-border-glass bg-surface-glass shadow-[0_10px_26px_-14px_rgba(6,78,59,0.2)] backdrop-blur-md ${className}`;
  const style = {
    animation: "fade-up 0.6s ease both",
    animationDelay,
  };

  if (onClick) {
    return (
      <button
        className={`${shared} cursor-pointer text-left transition-transform active:scale-[0.975]`}
        onClick={onClick}
        style={style}
        type="button"
      >
        {children}
      </button>
    );
  }

  return (
    <div className={shared} style={style}>
      {children}
    </div>
  );
}
