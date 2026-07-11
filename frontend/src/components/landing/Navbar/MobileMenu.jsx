import { Menu } from "lucide-react";

export default function MobileMenu({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
      aria-label="Open navigation menu"
    >
      <Menu size={24} />
    </button>
  );
}