import { NavLink } from "react-router-dom";

// ==========================
// SIDEBAR
// Updated for Phase 24/28 — Audit Trail link added
// ==========================
function Sidebar() {

  const links = [
    { to: "/patient",      label: "🏠 Home" },
    { to: "/upload",       label: "⬆️ Upload Record" },
    { to: "/my-records",   label: "📋 My Records" },
    { to: "/grant-access", label: "🔐 Grant Access" },
    { to: "/audit-trail",  label: "📊 Audit Trail" },
  ];

  return (

    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col py-6 px-4 shrink-0">

      <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 px-2">
        Patient Menu
      </p>

      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

    </div>
  );
}

export default Sidebar;