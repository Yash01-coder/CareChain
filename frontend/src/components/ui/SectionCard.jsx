function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-cyan-950/20 backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

export default SectionCard;