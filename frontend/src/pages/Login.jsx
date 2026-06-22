import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiLock, FiMail, FiShield } from "react-icons/fi";

import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

      const response = await API.post("/auth/login", formData);

      localStorage.setItem("walletAddress", response.data.user.walletAddress);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setStatus({
        type: "success",
        message: "Login successful. Redirecting...",
      });

      const role = response.data.user.role;

      setTimeout(() => {
        if (role === "patient") {
          navigate("/patient");
        } else if (role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/");
        }
      }, 500);
    } catch (error) {
      console.log(error);

      setStatus({
        type: "error",
        message: error.response?.data?.message || "Login failed. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(34,211,238,0.18),transparent_28rem),radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.22),transparent_30rem)]" />

      <div className="absolute left-10 top-24 h-32 w-32 rounded-full border border-cyan-300/20 bg-cyan-300/10 blur-sm" />
      <div className="absolute bottom-16 right-16 h-48 w-48 rounded-full border border-blue-400/10 bg-blue-500/10 blur-xl" />

      <Link
        to="/"
        className="absolute left-6 top-6 z-20 flex items-center gap-3 text-xl font-black text-white"
      >
        <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_#67e8f9]" />
        CareChain
      </Link>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-3xl text-cyan-200 shadow-2xl shadow-cyan-500/10">
            <FiShield />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Access your encrypted healthcare blockchain workspace.
          </p>
        </div>

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
          Email Address
        </label>
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 focus-within:border-cyan-300/50">
          <FiMail className="text-cyan-300" />
          <input
            type="email"
            name="email"
            placeholder="you@carechain.health"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <label className="mb-2 block text-sm font-bold text-slate-200">
          Password
        </label>
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 focus-within:border-cyan-300/50">
          <FiLock className="text-cyan-300" />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 font-black text-white shadow-2xl shadow-cyan-500/25 transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Authenticating..." : "Login"}
          {!loading && <FiArrowRight />}
        </motion.button>

        <p className="mt-6 text-center text-sm text-slate-400">
          New to CareChain?{" "}
          <Link to="/register" className="font-black text-cyan-300 hover:text-cyan-200">
            Create an account
          </Link>
        </p>
      </motion.form>
    </main>
  );
}

export default Login;