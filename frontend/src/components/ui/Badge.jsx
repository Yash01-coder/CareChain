import clsx from "clsx";

const variants = {
  primary:
    "bg-blue-100 text-blue-700 border border-blue-200",

  secondary:
    "bg-teal-100 text-teal-700 border border-teal-200",

  success:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",

  warning:
    "bg-amber-100 text-amber-700 border border-amber-200",

  danger:
    "bg-red-100 text-red-700 border border-red-200",

  neutral:
    "bg-slate-100 text-slate-700 border border-slate-200",
};

export default function Badge({
  children,
  variant = "primary",
  rounded = true,
  className,
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center px-3 py-1 text-xs font-semibold transition-all duration-300",
        rounded ? "rounded-full" : "rounded-xl",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}