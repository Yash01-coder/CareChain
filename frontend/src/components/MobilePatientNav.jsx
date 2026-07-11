import { NavLink } from "react-router-dom";
import {
  Activity,
  FileText,
  Home,
  LockKeyhole,
  UploadCloud,
} from "lucide-react";

const links = [
  {
    to: "/patient",
    label: "Home",
    icon: Home,
  },
  {
    to: "/upload",
    label: "Upload",
    icon: UploadCloud,
  },
  {
    to: "/my-records",
    label: "Records",
    icon: FileText,
  },
  {
    to: "/grant-access",
    label: "Access",
    icon: LockKeyhole,
  },
  {
    to: "/audit-trail",
    label: "Audit",
    icon: Activity,
  },
];

export default function MobilePatientNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/95 px-2 py-2 text-white backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold transition",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-white/10 hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={19} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}