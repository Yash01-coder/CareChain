import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowLeft,
  FiCheckCircle,
  FiDatabase,
  FiFileText,
  FiHome,
  FiLock,
  FiShield,
  FiUploadCloud,
  FiUsers,
} from "react-icons/fi";

import API from "../services/api";

function UploadStep({ active, done, icon, title }) {
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        done
          ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
          : active
          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
          : "border-white/10 bg-white/[0.04] text-slate-400"
      }`}
    >
      <div className="mb-3 text-2xl">{done ? <FiCheckCircle /> : icon}</div>
      <p className="text-sm font-black">{title}</p>
    </div>
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

function UploadRecord() {
  const [recordType, setRecordType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const walletAddress = localStorage.getItem("walletAddress") || user.walletAddress || "";

  const shortWallet = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Wallet not connected";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !recordType) {
      setStatus({
        type: "error",
        message: "Please fill in record type and select a file.",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);
      setProgress(18);

      const formData = new FormData();
      formData.append("recordType", recordType);
      formData.append("file", file);
      formData.append("patientWallet", walletAddress || "");

      setProgress(42);

      const response = await API.post("/records/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);

      setProgress(100);
      setStatus({
        type: "success",
        message: "Record encrypted, uploaded to IPFS, and linked to blockchain successfully.",
      });

      setRecordType("");
      setFile(null);
    } catch (error) {
      console.log(error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Upload failed.",
      });
    } finally {
      setLoading(false);
    }
  };

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
            <SidebarLink to="/patient" icon={<FiHome />} label="Dashboard" />
            <SidebarLink to="/upload" active icon={<FiUploadCloud />} label="Upload Record" />
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
              <Link
                to="/patient"
                className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-200"
              >
                <FiArrowLeft />
                Back to Dashboard
              </Link>

              <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
                Secure Upload
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">
                Upload Medical Record
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Encrypt a file, send it to IPFS, and register its hash on blockchain.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Wallet
              </p>
              <p className="mt-1 font-mono text-sm text-white">{shortWallet}</p>
            </div>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
            <motion.form
              onSubmit={handleUpload}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
            >
              {status && (
                <div
                  className={`mb-5 rounded-2xl border px-4 py-3 text-sm font-bold ${
                    status.type === "success"
                      ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
                      : "border-red-300/20 bg-red-400/10 text-red-200"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <label className="mb-2 block text-sm font-bold text-slate-200">
                Record Type
              </label>
              <input
                type="text"
                placeholder="Prescription, Blood Report, MRI Scan..."
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="mb-5 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                required
              />

              <label className="mb-2 block text-sm font-bold text-slate-200">
                Medical File
              </label>

              <label className="group flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-cyan-300/30 bg-slate-950/50 p-8 text-center transition hover:border-cyan-300/60 hover:bg-cyan-300/10">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-300/10 text-4xl text-cyan-300 shadow-2xl shadow-cyan-500/10 transition group-hover:scale-105">
                  <FiUploadCloud />
                </div>

                <p className="text-xl font-black text-white">
                  {file ? file.name : "Drop or select medical record"}
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                  Files are encrypted locally by backend processing before being uploaded to IPFS.
                </p>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs font-bold text-slate-400">
                  <span>Upload Pipeline</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-600 shadow-[0_0_24px_rgba(34,211,238,0.45)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 font-black text-white shadow-2xl shadow-cyan-500/25 transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Encrypting and Uploading..." : "Upload Record"}
                <FiUploadCloud />
              </motion.button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
            >
              <h2 className="text-2xl font-black text-white">Upload Pipeline</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                CareChain transforms a medical file into a verified blockchain-linked record.
              </p>

              <div className="mt-6 grid gap-4">
                <UploadStep
                  active={loading && progress >= 18}
                  done={progress >= 42}
                  icon={<FiLock />}
                  title="AES-256 Encryption"
                />
                <UploadStep
                  active={loading && progress >= 42}
                  done={progress >= 100}
                  icon={<FiDatabase />}
                  title="IPFS Storage"
                />
                <UploadStep
                  active={loading && progress >= 42}
                  done={progress >= 100}
                  icon={<FiShield />}
                  title="Blockchain Hash Registry"
                />
              </div>

              <div className="mt-6 rounded-3xl border border-cyan-300/15 bg-slate-950/60 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                    <FiActivity />
                  </div>
                  <div>
                    <p className="font-black text-white">Network Visualizer</p>
                    <p className="text-xs text-slate-400">Patient to IPFS to chain</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {["Patient", "IPFS", "Chain"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center text-sm font-black text-cyan-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default UploadRecord;