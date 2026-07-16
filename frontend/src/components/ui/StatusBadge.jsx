const styles = {
  success: "bg-emerald-400/10 text-emerald-200 border-emerald-300/20",
  warning: "bg-amber-400/10 text-amber-100 border-amber-300/20",
  danger: "bg-red-400/10 text-red-200 border-red-300/20",
  info: "bg-cyan-300/10 text-cyan-100 border-cyan-300/20",
  neutral: "bg-white/[0.06] text-slate-300 border-white/10",
};

function StatusBadge({ children, tone = "info" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-black ${
        styles[tone] || styles.info
      }`}
    >
      {children}
    </span>
  );
}

export default StatusBadge;