import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiCreditCard,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    walletAddress: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setStatus(null);

      const response = await api.post("/auth/register", formData);
      console.log(response.data);

      setStatus({
        type: "success",
        message: "Registration successful. Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (error) {
      console.log(error);

      setStatus({
        type: "error",
        message: error.response?.data?.message || "Registration failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.18),transparent_28rem),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.22),transparent_30rem)]" />

      <div className="pointer-events-none absolute left-8 top-28 h-40 w-40 rounded-full border border-cyan-300/20 bg-cyan-300/10 blur-sm" />
      <div className="pointer-events-none absolute bottom-12 right-12 h-56 w-56 rounded-full border border-blue-400/10 bg-blue-500/10 blur-xl" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 text-xl font-black text-white"
          >
            <span className="h-3 w-3 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_24px_#67e8f9]" />
            <span className="break-words">CareChain</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FiArrowLeft />
            Home
          </Link>
        </div>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.9fr_1fr]">
          <section className="hidden lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100">
              <FiUsers />
              Patient and doctor onboarding
            </div>

            <h1 className="max-w-2xl text-6xl font-black leading-tight tracking-tight text-white">
              Create your secure healthcare identity.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              Register as a patient to manage encrypted records, or as a doctor
              to access records only when patients grant permission.
            </p>

            <div className="mt-8 grid max-w-xl gap-4">
              {[
                "Wallet-based healthcare identity",
                "Role-aware patient and doctor access",
                "Encrypted records and blockchain workflows",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-slate-200"
                >
                  <FiCheckCircle className="shrink-0 text-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl sm:p-8"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-3xl text-cyan-200 shadow-2xl shadow-cyan-500/10">
                <FiUsers />
              </div>

              <h2 className="break-words text-4xl font-black tracking-tight text-white">
                Join CareChain
              </h2>

              <p className="mt-3 break-words text-sm leading-6 text-slate-300">
                Create your secure healthcare blockchain identity.
              </p>
            </div>

            {status && (
              <div
                className={`mb-5 break-words rounded-2xl border px-4 py-3 text-sm font-bold ${
                  status.type === "success"
                    ? "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
                    : "border-red-300/20 bg-red-400/10 text-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  Full Name
                </label>

                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 focus-within:border-cyan-300/50">
                  <FiUser className="shrink-0 text-cyan-300" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Patient or Doctor"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="min-w-0 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-200">
                  Role
                </label>

                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 focus-within:border-cyan-300/50">
                  <FiShield className="shrink-0 text-cyan-300" />

                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="min-w-0 w-full bg-transparent text-white outline-none"
                  >
                    <option className="bg-slate-950" value="patient">
                      Patient
                    </option>
                    <option className="bg-slate-950" value="doctor">
                      Doctor
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <label className="mb-2 mt-4 block text-sm font-bold text-slate-200">
              Email Address
            </label>

            <div className="mb-4 flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 focus-within:border-cyan-300/50">
              <FiMail className="shrink-0 text-cyan-300" />

              <input
                type="email"
                name="email"
                placeholder="you@carechain.health"
                value={formData.email}
                onChange={handleChange}
                required
                className="min-w-0 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <label className="mb-2 block text-sm font-bold text-slate-200">
              Password
            </label>

            <div className="mb-4 flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 focus-within:border-cyan-300/50">
              <FiLock className="shrink-0 text-cyan-300" />

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                className="min-w-0 w-full bg-transparent text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <label className="mb-2 block text-sm font-bold text-slate-200">
              Wallet Address
            </label>

            <div className="mb-6 flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 focus-within:border-cyan-300/50">
              <FiCreditCard className="shrink-0 text-cyan-300" />

              <input
                type="text"
                name="walletAddress"
                placeholder="0x..."
                value={formData.walletAddress}
                onChange={handleChange}
                required
                className="min-w-0 w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>

            <div className="mb-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-4 py-3 text-xs leading-6 text-cyan-100">
              Patients control medical access. Doctors can view records only
              when permission is granted.
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-4 text-center font-black text-white shadow-2xl shadow-cyan-500/25 transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="break-words">
                {loading ? "Creating Account..." : "Create Account"}
              </span>

              {!loading && <FiArrowRight className="shrink-0" />}
            </motion.button>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already registered?{" "}
              <Link
                to="/login"
                className="font-black text-cyan-300 hover:text-cyan-200"
              >
                Login
              </Link>
            </p>
          </motion.form>
        </div>
      </div>
    </main>
  );
}

export default Register;