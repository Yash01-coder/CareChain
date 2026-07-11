const stats = [
  {
    value: 100,
    suffix: "%",
    label: "Patient Control",
  },
  {
    value: 256,
    label: "AES Encryption",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Audit Visibility",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-xl"
        >
          <div className="text-2xl font-extrabold text-slate-950 md:text-3xl">
            {stat.value}
            {stat.suffix || ""}
          </div>

          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}