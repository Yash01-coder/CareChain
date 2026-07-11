import GlassPanel from "../../common/GlassPanel";

export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <GlassPanel className="h-full p-6" hover>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-bold text-slate-950">
        {feature.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {feature.description}
      </p>
    </GlassPanel>
  );
}