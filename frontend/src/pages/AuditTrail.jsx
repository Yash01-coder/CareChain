import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiAlertTriangle,
  FiClock,
  FiDownload,
  FiEye,
  FiShield,
  FiSlash,
  FiUploadCloud,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import MobilePatientNav from "../components/MobilePatientNav";
import API from "../services/api";

function getActionIcon(action) {
  const icons = {
    RECORD_VIEWED: <FiEye />,
    EMERGENCY_RECORD_VIEWED: <FiAlertTriangle />,
    RECORD_DOWNLOADED: <FiDownload />,
    RECORD_UPLOADED: <FiUploadCloud />,
    ACCESS_GRANTED: <FiShield />,
    EMERGENCY_ACCESS_GRANTED: <FiAlertTriangle />,
    ACCESS_REVOKED: <FiSlash />,
  };

  return icons[action] || <FiActivity />;
}

function getActionClass(action) {
  if (action?.includes("EMERGENCY")) {
    return "border-amber-300/25 bg-amber-400/10 text-amber-100";
  }

  const classes = {
    RECORD_VIEWED: "border-blue-300/25 bg-blue-400/10 text-blue-100",
    RECORD_DOWNLOADED:
      "border-purple-300/25 bg-purple-400/10 text-purple-100",
    RECORD_UPLOADED:
      "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
    ACCESS_GRANTED: "border-cyan-300/25 bg-cyan-400/10 text-cyan-100",
    ACCESS_REVOKED: "border-red-300/25 bg-red-400/10 text-red-100",
  };

  return classes[action] || "border-white/10 bg-white/[0.06] text-slate-200";
}

function AuditTrail() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchLogs = async () => {
    try {
      setLoading(true);

      const response = await API.get("/records/audit-trail");
      setLogs(response.data.logs || []);
    } catch (error) {
      console.log("AUDIT FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const actionLabels = {
    RECORD_VIEWED: "Record Viewed",
    EMERGENCY_RECORD_VIEWED: "Emergency Record Viewed",
    RECORD_DOWNLOADED: "Record Downloaded",
    RECORD_UPLOADED: "Record Uploaded",
    ACCESS_GRANTED: "Access Granted",
    EMERGENCY_ACCESS_GRANTED: "Emergency Access Granted",
    ACCESS_REVOKED: "Access Revoked",
  };

  const filters = [
    { value: "all", label: "All Events" },
    { value: "RECORD_VIEWED", label: "Viewed" },
    { value: "EMERGENCY_RECORD_VIEWED", label: "Emergency Viewed" },
    { value: "RECORD_DOWNLOADED", label: "Downloaded" },
    { value: "ACCESS_GRANTED", label: "Granted" },
    { value: "EMERGENCY_ACCESS_GRANTED", label: "Emergency" },
    { value: "ACCESS_REVOKED", label: "Revoked" },
    { value: "RECORD_UPLOADED", label: "Uploaded" },
  ];

  const filteredLogs =
    filter === "all" ? logs : logs.filter((log) => log.action === filter);

  const stats = useMemo(() => {
    return {
      total: logs.length,
      emergency: logs.filter((log) => log.action?.includes("EMERGENCY"))
        .length,
      access: logs.filter((log) => log.action?.includes("ACCESS")).length,
    };
  }, [logs]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.18),transparent_30rem),radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.24),transparent_34rem)]" />

      <div className="relative z-10 flex min-h-screen overflow-hidden">
        <Sidebar />

        <section className="min-w-0 flex-1 overflow-hidden p-4 pb-24 md:p-8 lg:pb-8">
          <header className="mb-8 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
              Access Intelligence
            </p>

            <h1 className="mt-2 break-words text-3xl font-black tracking-tight text-white md:text-5xl">
              Audit Trail
            </h1>

            <p className="mt-2 max-w-3xl break-words text-sm leading-7 text-slate-300">
              Full patient-visible history of uploads, doctor access,
              emergency permissions, downloads, and blockchain-linked
              healthcare interactions.
            </p>
          </header>

          <div className="mb-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
              <FiActivity className="mb-4 text-3xl text-cyan-300" />

              <p className="text-sm font-bold text-slate-400">
                Total Events
              </p>

              <p className="mt-2 text-4xl font-black">{stats.total}</p>
            </div>

            <div className="rounded-3xl border border-amber-300/15 bg-amber-400/10 p-5 backdrop-blur-xl">
              <FiAlertTriangle className="mb-4 text-3xl text-amber-200" />

              <p className="text-sm font-bold text-amber-100/80">
                Emergency Events
              </p>

              <p className="mt-2 text-4xl font-black">{stats.emergency}</p>
            </div>

            <div className="rounded-3xl border border-cyan-300/15 bg-cyan-400/10 p-5 backdrop-blur-xl">
              <FiShield className="mb-4 text-3xl text-cyan-200" />

              <p className="text-sm font-bold text-cyan-100/80">
                Access Events
              </p>

              <p className="mt-2 text-4xl font-black">{stats.access}</p>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`rounded-full px-4 py-2 text-sm font-black transition ${
                  filter === item.value
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    : "border border-white/10 bg-white/[0.06] text-slate-300 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl md:p-6"
          >
            {loading && (
              <div className="py-16 text-center text-slate-300">
                Loading audit logs...
              </div>
            )}

            {!loading && filteredLogs.length === 0 && (
              <div className="py-16 text-center">
                <FiClock className="mx-auto mb-4 text-6xl text-cyan-300" />

                <p className="text-2xl font-black text-white">
                  No audit events found
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Try a different filter or perform a healthcare record action.
                </p>
              </div>
            )}

            {!loading && filteredLogs.length > 0 && (
              <div className="relative space-y-4">
                <div className="absolute left-[1.38rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-cyan-300 via-blue-500 to-transparent md:block" />

                {filteredLogs.map((log, index) => (
                  <motion.div
                    key={log._id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl ${getActionClass(
                      log.action
                    )}`}
                  >
                    <div className="grid min-w-0 gap-4 md:grid-cols-[auto_1fr_auto] md:items-start">
                      <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950/70 text-xl">
                        {getActionIcon(log.action)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <h3 className="break-words text-lg font-black text-white">
                            {actionLabels[log.action] ||
                              log.action?.replace(/_/g, " ") ||
                              "Audit Event"}
                          </h3>

                          {log.action?.includes("EMERGENCY") && (
                            <span className="shrink-0 rounded-full bg-amber-300/15 px-3 py-1 text-xs font-black text-amber-100">
                              Emergency
                            </span>
                          )}
                        </div>

                        <p className="mt-2 break-words text-sm leading-7 text-slate-300">
                          {log.details || "No event details available."}
                        </p>

                        <div className="mt-3 flex min-w-0 flex-wrap gap-3 text-xs font-bold text-slate-400">
                          <span className="min-w-0 break-words">
                            Doctor:{" "}
                            <span className="break-all font-mono text-cyan-200">
                              {log.doctorWallet
                                ? `${log.doctorWallet.slice(
                                    0,
                                    10
                                  )}...${log.doctorWallet.slice(-6)}`
                                : "-"}
                            </span>
                          </span>

                          {log.ipfsHash && (
                            <span className="min-w-0 break-words">
                              IPFS:{" "}
                              <span className="break-all font-mono text-cyan-200">
                                {`${log.ipfsHash.slice(0, 12)}...`}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="max-w-full break-words rounded-full border border-white/10 bg-slate-950/50 px-4 py-2 text-xs font-bold text-slate-300 md:flex md:items-center md:gap-2">
                        <FiClock className="mb-1 inline md:mb-0" />
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      </div>

      <MobilePatientNav />
    </main>
  );
}

export default AuditTrail;