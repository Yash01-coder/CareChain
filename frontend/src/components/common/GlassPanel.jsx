import clsx from "clsx";

const blurLevels = {
  sm: "backdrop-blur-md",
  md: "backdrop-blur-xl",
  lg: "backdrop-blur-2xl",
};

export default function GlassPanel({
  children,
  className,
  blur = "md",
  hover = false,
  bordered = true,
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl bg-white/60 shadow-xl transition-all duration-300",
        blurLevels[blur],

        bordered &&
          "border border-white/30",

        hover &&
          "hover:-translate-y-1 hover:shadow-2xl",

        className
      )}
    >
      {children}
    </div>
  );
}