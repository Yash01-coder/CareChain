export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#f8fafc,#eef6ff,#f8fafc)]" />

      <div className="absolute left-0 top-32 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />

      <div className="absolute right-0 top-44 h-80 w-80 rounded-full bg-teal-200/50 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] bg-[size:28px_28px]" />
    </div>
  );
}