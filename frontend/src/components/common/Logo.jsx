import { HeartPulse } from "lucide-react";
import clsx from "clsx";

const sizes = {
  sm: {
    icon: 18,
    text: "text-lg",
  },
  md: {
    icon: 24,
    text: "text-2xl",
  },
  lg: {
    icon: 32,
    text: "text-3xl",
  },
};

export default function Logo({
  size = "md",
  showText = true,
  className,
}) {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 select-none",
        className
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 shadow-lg">
        <HeartPulse
          size={sizes[size].icon}
          className="text-white"
        />
      </div>

      {showText && (
        <div>
          <h1
            className={clsx(
              "font-bold tracking-tight",
              sizes[size].text
            )}
          >
            <span className="text-slate-900">Care</span>
            <span className="text-blue-600">Chain</span>
          </h1>

          <p className="text-xs text-slate-500">
            Secure Healthcare Platform
          </p>
        </div>
      )}
    </div>
  );
}