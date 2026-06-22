import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiClock,
  FiDatabase,
  FiFileText,
  FiHome,
  FiLock,
  FiLogOut,
  FiShield,
  FiUploadCloud,
  FiUsers,
} from "react-icons/fi";

function StatCard({ icon, title, value, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-2xl text-cyan-300">
          {icon}
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-200">
          Live
        </span>
      </div>

      <p className="text-sm font-bold text-slate-300">{title}</p>
      <h3 className="mt-2 text-5xl font-black tracking-tight text-white">
        {value}
      </h3>
      <p className="mt-3 text-sm text-slate-400">{subtitle}</p>
    </motion.div>
  );
}

function SidebarLink({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-bold transition ${
        active
          ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function PatientDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const walletAddress = localStorage.getItem("walletAddress") || user.walletAddress || "";

  const shortWallet = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Wallet not connected";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("walletAddress");
    navigate("/login");
  };

  const recentActivity = [
    {
      title: "Record uploaded",
      detail: "Encrypted medical report stored on IPFS",
      time: "Just now",
      icon: <FiUploadCloud />,
    },
    {
      title: "Access verified",
      detail: "Smart contract permission check completed",
      time: "12 min ago",
      icon: <FiShield />,
    },
    {
      title: "Doctor authorized",
      detail: "Patient granted controlled access",
      time: "Today",
      icon: <FiUsers />,
    },
  ];

  const records = [
    { type: "Blood Report", network: "IPFS", status: "Verified" },
    { type: "Prescription", network: "Blockchain", status: "Encrypted" },
    { type: "Scan Image", network: "IPFS", status: "Authorized" },
    { type: "Discharge Summary", network: "Blockchain", status: "Verified" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.18),transparent_30rem),radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.24),transparent_34rem)]" />

      <div className="relative z-10 flex min-h-screen">
        <aside className="hidden w-80 border-r border-white/10 bg-slate-950/70 p-6 backdrop-blur-2xl lg:block">
          <Link to="/" className="mb-10 flex items-center gap-3 text-2xl font-black">
            <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_#67e8f9]" />
            CareChain
          </Link>

          <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-slate-500">
            Patient Command
          </p>

          <nav className="space-y-3">
            <SidebarLink to="/patient" active icon={<FiHome />} label="Dashboard" />
            <SidebarLink to="/upload" icon={<FiUploadCloud />} label="Upload Record" />
            <SidebarLink to="/my-records" icon={<FiFileText />} label="My Records" />
            <SidebarLink to="/grant-access" icon={<FiLock />} label="Access Control" />
            <SidebarLink to="/audit-trail" icon={<FiActivity />} label="Audit Trail" />
          </nav>

          <div className="mt-10 rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-5">
            <p className="text-sm font-bold text-cyan-100">Connected Wallet</p>
            <p className="mt-2 font-mono text-sm text-cyan-300">{shortWallet}</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_16px_#6ee7b7]" />
              Network Online
            </div>
          </div>
        </aside>

        <section className="flex-1 p-4 md:p-8">
          <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                Patient Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">
                Welcome, {user.name || "Patient"}
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Manage encrypted records, doctor access, and blockchain activity.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-500/10 px-5 font-black text-red-200 transition hover:bg-red-500/20"
            >
              <FiLogOut />
              Logout
            </button>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            <StatCard
              icon={<FiDatabase />}
              title="Total Records"
              value="12"
              subtitle="Encrypted medical files"
            />
            <StatCard
              icon={<FiUsers />}
              title="Authorized Doctors"
              value="4"
              subtitle="Active patient-doctor grants"
            />
            <StatCard
              icon={<FiShield />}
              title="Blockchain Transactions"
              value="18"
              subtitle="Verified smart contract events"
            />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">Recent Records</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Latest encrypted healthcare activity
                  </p>
                </div>

                <Link
                  to="/my-records"
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100 hover:bg-cyan-300/20"
                >
                  View All
                </Link>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full min-w-[620px]">
                  <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-[0.18em] text-slate-400">
                    <tr>
                      <th className="p-4">Record</th>
                      <th className="p-4">Network</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record) => (
                      <tr key={record.type} className="border-t border-white/10 text-sm">
                        <td className="p-4 font-bold text-white">{record.type}</td>
                        <td className="p-4 text-slate-300">{record.network}</td>
                        <td className="p-4">
                          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-200">
                            {record.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="rounded-full bg-blue-500 px-4 py-2 text-xs font-black text-white hover:bg-blue-400">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
            >
              <h2 className="text-2xl font-black text-white">Recent Activity</h2>
              <p className="mt-1 text-sm text-slate-400">
                Live audit timeline
              </p>

              <div className="mt-6 space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-black text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{item.detail}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs font-bold text-cyan-300">
                        <FiClock />
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-cyan-300/15 bg-slate-950/60 p-5">
                <p className="text-sm font-black text-cyan-200">
                  Blockchain Health
                </p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 shadow-[0_0_24px_rgba(34,211,238,0.45)]" />
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  Smart contract, IPFS, and wallet services are responding.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default PatientDashboard;