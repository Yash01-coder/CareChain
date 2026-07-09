import clsx from "clsx";

const sizes = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
};

export default function Loader({
  size = "md",
  className,
  fullScreen = false,
  text,
}) {
  const spinner = (
    <div
      className={clsx(
        "animate-spin rounded-full border-blue-600 border-t-transparent",
        sizes[size],
        className
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
        {text && (
          <p className="mt-4 text-sm font-medium text-slate-600">
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {spinner}
      {text && (
        <p className="mt-3 text-sm text-slate-500">
          {text}
        </p>
      )}
    </div>
  );
}