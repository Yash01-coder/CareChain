function LoadingState({ message = "Loading..." }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-10 text-center text-slate-300 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-300/20 border-t-cyan-300" />
      <p className="font-bold">{message}</p>
    </div>
  );
}

export default LoadingState;