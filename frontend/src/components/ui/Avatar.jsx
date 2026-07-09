import clsx from "clsx";

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

export default function Avatar({
  src,
  alt = "User",
  name = "",
  size = "md",
  online = false,
  verified = false,
  className,
}) {
  const initials = name
    ? name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="relative inline-flex">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={clsx(
            "rounded-full object-cover border-2 border-white shadow-md",
            sizes[size],
            className
          )}
        />
      ) : (
        <div
          className={clsx(
            "flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-teal-500 font-semibold text-white shadow-md",
            sizes[size],
            className
          )}
        >
          {initials}
        </div>
      )}

      {online && (
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
      )}

      {verified && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow">
          ✓
        </span>
      )}
    </div>
  );
}