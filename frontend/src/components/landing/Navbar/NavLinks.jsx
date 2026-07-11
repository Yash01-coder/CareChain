import { navigation } from "../../../constants/navigation";

export default function NavLinks() {
  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigation.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-blue-600"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}