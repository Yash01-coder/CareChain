import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiActivity,
  FiFileText,
  FiHome,
  FiLock,
  FiLogOut,
  FiMenu,
  FiSearch,
  FiUploadCloud,
  FiUserCheck,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

const patientLinks = [
  { to: "/patient", label: "Dashboard", icon: <FiHome /> },
  { to: "/upload", label: "Upload Record", icon: <FiUploadCloud /> },
  { to: "/my-records", label: "My Records", icon: <FiFileText /> },
  { to: "/grant-access", label: "Access Control", icon: <FiLock /> },
  { to: "/audit-trail", label: "Audit Trail", icon: <FiActivity /> },
];

const doctorLinks = [
  { to: "/doctor-dashboard", label: "Dashboard", icon: <FiHome /> },
];

function AppShell({ role = "patient", title, subtitle, children, actions }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const walletAddress =
    localStorage.getItem("walletAddress") || user.walletAddress || "";

  const links = role === "doctor" ? doctorLinks : patientLinks;

  const shortWallet = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Wallet not connected";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("walletAddress");
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.16),transparent_30rem),radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.22),transparent_34rem)]" />

      <div className="relative z-10 flex min-h-screen">
        <aside className="hidden w-80 border-r border-white/10 bg-slate-950/75 p-6 backdrop-blur-2xl lg:block">
          <SidebarContent
            links={links}
            role={role}
            shortWallet={shortWallet}
            onLogout={handleLogout}
          />
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              aria-label="Close menu"
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative h-full w-80 max-w-[85vw] border-r border-white/10 bg-slate-950 p-6 shadow-2xl">
              <div className="mb-6 flex justify-end">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white"
                  aria-label="Close navigation"
                >
                  <FiX />
                </button>
              </div>
              <SidebarContent
                links={links}
                role={role}
                shortWallet={shortWallet}
                onLogout={handleLogout}
                onNavigate={() => setMobileOpen(false)}
              />
            </aside>
          </div>
        )}

        <section className="flex-1 p-4 md:p-8">
          <header className="mb-8 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white lg:hidden"
                  aria-label="Open navigation"
                >
                  <FiMenu />
                </button>

                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                    {role === "doctor" ? "Doctor Portal" : "Patient Portal"}
                  </p>
                  <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {actions}
                <button
                  onClick={handleLogout}
                  className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-500/10 px-5 font-black text-red-200 transition hover:bg-red-500/20"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}

function SidebarContent({ links, role, shortWallet, onLogout, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <Link to="/" className="mb-10 flex items-center gap-3 text-2xl font-black">
        <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_#67e8f9]" />
        CareChain
      </Link>

      <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
        {role === "doctor" ? "Doctor Workspace" : "Patient Workspace"}
      </p>

      <nav className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${
                isActive
                  ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-5">
        <p className="text-sm font-bold text-cyan-100">Connected Wallet</p>
        <p className="mt-2 font-mono text-sm text-cyan-300">{shortWallet}</p>
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-200">
          <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_#6ee7b7]" />
          Network Online
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-black text-slate-200 hover:bg-white/15"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
}

export default AppShell;