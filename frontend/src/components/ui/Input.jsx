import clsx from "clsx";

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className,
  ...props
}) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div
        className={clsx(
          "flex items-center rounded-2xl border border-slate-300 bg-white px-4 py-3 transition-all duration-300",
          "focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100",
          error && "border-red-500 focus-within:ring-red-100"
        )}
      >
        {leftIcon && (
          <span className="mr-3 text-slate-400">{leftIcon}</span>
        )}

        <input
          className={clsx(
            "w-full bg-transparent outline-none placeholder:text-slate-400",
            className
          )}
          {...props}
        />

        {rightIcon && (
          <span className="ml-3 text-slate-400">{rightIcon}</span>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}