import clsx from "clsx";
import GradientText from "./GradientText";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}) {
  return (
    <div
      className={clsx(
        "mb-14",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600">
          {eyebrow}
        </span>
      )}

      <h2 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
        {title}{" "}
        {highlight && (
          <GradientText>
            {highlight}
          </GradientText>
        )}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}