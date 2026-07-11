export default function StepCard({ step, index }) {
  const Icon = step.icon;

  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
          <Icon size={24} />
        </div>

        <span className="text-sm font-extrabold text-slate-300">
          0{index + 1}
        </span>
      </div>

      <h3 className="text-lg font-bold text-slate-950">
        {step.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {step.description}
      </p>
    </div>
  );
}