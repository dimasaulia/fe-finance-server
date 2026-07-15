type IconProps = {
  size?: number;
  className?: string;
};

export function CloseIcon({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, className = "" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 15, className = "" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 17, className = "" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlusIcon({ size = 22, className = "" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
