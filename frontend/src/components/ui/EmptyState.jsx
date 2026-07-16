function EmptyState({ icon, title, message }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-12 text-center shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
      {icon && <div className="mx-auto mb-4 text-6xl text-cyan-300">{icon}</div>}
      <p className="text-2xl font-black text-white">{title}</p>
      {message && <p className="mt-2 text-sm text-slate-400">{message}</p>}
    </div>
  );
}

export default EmptyState;