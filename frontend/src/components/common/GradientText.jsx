import clsx from "clsx";

const variants = {
  blue: "from-blue-600 via-cyan-500 to-teal-500",
  green: "from-emerald-500 via-teal-500 to-cyan-500",
  purple: "from-violet-600 via-indigo-500 to-blue-500",
};

export default function GradientText({
  children,
  variant = "blue",
  className,
}) {
  return (
    <span
      className={clsx(
        "bg-gradient-to-r bg-clip-text text-transparent font-bold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}