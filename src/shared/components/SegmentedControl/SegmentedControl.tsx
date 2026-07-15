type SegmentedControlOption<Value extends string> = {
  value: Value;
  label: string;
  icon?: React.ReactNode;
};

type SegmentedControlProps<Value extends string> = {
  options: SegmentedControlOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  className?: string;
  /** Use the mono/numeric font for compact all-caps labels like theme/language pills. */
  numeric?: boolean;
};

export function SegmentedControl<Value extends string>({
  options,
  value,
  onChange,
  className = "",
  numeric = false,
}: SegmentedControlProps<Value>) {
  return (
    <div
      className={`flex gap-1 rounded-full bg-border-subtle p-1 ${className}`}
    >
      {options.map((option) => {
        const active = option.value === value;

        return (
          <button
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3.5 py-2 text-[11.5px] font-bold tracking-wide transition-all active:scale-95 ${
              numeric ? "font-numeric" : "font-heading"
            } ${
              active
                ? "bg-brand-500 text-white shadow-[0_6px_16px_-8px_rgba(6,78,59,0.4)]"
                : "text-text-secondary"
            }`}
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
