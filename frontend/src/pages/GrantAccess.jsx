import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiKey,
  FiRefreshCw,
  FiShield,
  FiSlash,
} from "react-icons/fi";

import AppShell from "../components/AppShell";
import API from "../services/api";

function ActionCard({ icon, title, text, buttonText, buttonClass, onClick, loading }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-300/10 text-3xl text-cyan-300">
        {icon}
      </div>

      <h3 className="text-2xl font-black text-white">{title}</h3>

      <p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-400">
        {text}
      </p>

      <button
        onClick={onClick}
        disabled={loading}
        className={`mt-5 flex h-13 w-full items-center justify-center rounded-2xl px-5 py-4 font-black text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${buttonClass}`}
      >
        {loading ? "Processing..." : buttonText}
      </button>
    </motion.div>
  );
}

function GrantAccess() {
  const [doctorAddress, setDoctorAddress] = useState("");
  const [durationHours, setDurationHours] = useState(24);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const walletAddress =
    localStorage.getItem("walletAddress") || user.walletAddress || "";

  const validateDoctorAddress = () => {
    if (!doctorAddress.trim()) {
      setStatus({
        type: "error",
        message: "Please enter a doctor wallet address.",
      });
      return false;
    }

    return true;
  };

  const handleGrantAccess = async () => {
    if (!validateDoctorAddress()) return;

    try {
      setLoading(true);
      setStatus(null);

      const response = await API.post("/records/grant-access", {
        doctorAddress: doctorAddress.trim(),
      });

      setStatus({
        type: "success",
        message:
          "Access granted successfully. Doctor can now view your records.",
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Grant access failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyAccess = async () => {
    if (!validateDoctorAddress()) return;

    try {
      setLoading(true);
      setStatus(null);

      const response = await API.post("/records/emergency-access", {
        doctorAddress: doctorAddress.trim(),
        durationHours,
      });

      const expiry = response.data?.expiresAt
        ? new Date(response.data.expiresAt).toLocaleString()
        : "";

      setStatus({
        type: "warning",
        message: expiry
          ? `Emergency access granted until ${expiry}.`
          : "Emergency access granted successfully.",
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Emergency access failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAccess = async () => {
    if (!validateDoctorAddress()) return;

    try {
      setLoading(true);
      setStatus(null);

      const response = await API.post("/records/revoke-access", {
        doctorAddress: doctorAddress.trim(),
      });

      setStatus({
        type: "warning",
        message:
          "Access revoked successfully. Doctor can no longer view your records.",
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Revoke failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckAccess = async () => {
    if (!validateDoctorAddress()) return;

    try {
      setLoading(true);
      setStatus(null);

      const response = await API.post("/records/check-access", {
        patientAddress: walletAddress,
        doctorAddress: doctorAddress.trim(),
      });

      const hasAccess = response.data.access;
      const isEmergency = response.data.isEmergency;
      const expiresAt = response.data.expiresAt
        ? new Date(response.data.expiresAt).toLocaleString()
        : null;

      setStatus({
        type: hasAccess ? "success" : "error",
        message: hasAccess
          ? isEmergency && expiresAt
            ? `Doctor has emergency access until ${expiresAt}.`
            : "Doctor has active access to your records."
          : "Doctor does not currently have access.",
      });
    } catch (error) {
      console.log(error);
      setStatus({
        type: "error",
        message: "Access check failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell
      role="patient"
      title="Doctor Access Control"
      subtitle="Grant permanent access, issue emergency time-limited access, revoke permissions, and verify access status for any doctor wallet."
    >
      <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <label className="mb-2 block text-sm font-bold text-slate-200">
          Doctor Wallet Address
        </label>

        <input
          type="text"
          placeholder="0x..."
          value={doctorAddress}
          onChange={(e) => setDoctorAddress(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 font-mono text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
        />

        {status && (
          <div
            className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-bold ${
              status.type === "success"
                ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
                : status.type === "warning"
                ? "border-amber-300/20 bg-amber-400/10 text-amber-100"
                : "border-red-300/20 bg-red-400/10 text-red-200"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <ActionCard
          icon={<FiKey />}
          title="Grant Access"
          text="Create an active patient-doctor permission so the selected doctor can view and download authorized records."
          buttonText="Grant Access"
          loading={loading}
          onClick={handleGrantAccess}
          buttonClass="bg-gradient-to-r from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/20"
        />

        <motion.div
          whileHover={{ y: -8, scale: 1.01 }}
          className="rounded-3xl border border-amber-300/15 bg-amber-400/[0.08] p-6 shadow-2xl shadow-amber-950/20 backdrop-blur-xl"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300/10 text-3xl text-amber-200">
            <FiAlertTriangle />
          </div>

          <h3 className="text-2xl font-black text-white">
            Emergency Access
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            Grant temporary critical-care access with automatic expiry and
            special audit logging.
          </p>

          <label className="mb-2 mt-5 block text-sm font-bold text-amber-100">
            Duration
          </label>

          <select
            value={durationHours}
            onChange={(e) => setDurationHours(Number(e.target.value))}
            className="mb-5 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-4 font-bold text-white outline-none"
          >
            <option value={6} className="bg-slate-950">
              6 Hours
            </option>
            <option value={12} className="bg-slate-950">
              12 Hours
            </option>
            <option value={24} className="bg-slate-950">
              24 Hours
            </option>
            <option value={48} className="bg-slate-950">
              48 Hours
            </option>
          </select>

          <button
            onClick={handleEmergencyAccess}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-600 px-5 py-4 font-black text-white shadow-lg shadow-amber-500/20 transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : "Grant Emergency Access"}
          </button>
        </motion.div>

        <ActionCard
          icon={<FiSlash />}
          title="Revoke Access"
          text="Immediately deactivate the doctor permission and record the event in the patient audit trail."
          buttonText="Revoke Access"
          loading={loading}
          onClick={handleRevokeAccess}
          buttonClass="bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/20"
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          whileHover={{ y: -6 }}
          className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-300/10 text-3xl text-blue-200">
            <FiCheckCircle />
          </div>

          <h3 className="text-2xl font-black text-white">Access Status</h3>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Confirm whether the selected doctor currently has normal or
            emergency access.
          </p>

          <button
            onClick={handleCheckAccess}
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-4 font-black text-cyan-100 hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw />
            {loading ? "Checking..." : "Check Access Status"}
          </button>
        </motion.div>

        <div className="rounded-3xl border border-cyan-300/15 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/20">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
            Permission Flow
          </p>

          <div className="grid gap-4 md:grid-cols-4">
            {["Patient", "Access Grant", "Smart Contract", "Doctor"].map(
              (item, index) => (
                <div
                  key={item}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-center font-black text-cyan-100"
                >
                  <FiShield className="mx-auto mb-3 text-2xl text-cyan-300" />
                  {item}

                  {index < 3 && (
                    <span className="absolute -right-3 top-1/2 hidden h-0.5 w-6 bg-cyan-300/40 md:block" />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default GrantAccess;