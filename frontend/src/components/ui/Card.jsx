import clsx from "clsx";

const shadowVariants = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-xl",
};

const paddingVariants = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  shadow = "md",
  padding = "md",
  glass = false,
  hover = false,
  bordered = true,
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl transition-all duration-300",
        paddingVariants[padding],
        shadowVariants[shadow],

        glass
          ? "bg-white/60 backdrop-blur-xl border border-white/20"
          : "bg-white",

        bordered && "border border-slate-200",

        hover &&
          "hover:-translate-y-1 hover:shadow-2xl hover:border-blue-200",

        className
      )}
    >
      {children}
    </div>
  );
}