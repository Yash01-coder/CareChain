function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="rounded-2xl border border-red-300/20 bg-red-400/10 px-5 py-4 font-bold text-red-200">
      {message}
    </div>
  );
}

export default ErrorState;