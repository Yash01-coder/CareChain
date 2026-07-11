import { motion } from "framer-motion";
import { ShieldCheck, LockKeyhole, ArrowRight } from "lucide-react";
import GradientText from "../../common/GradientText";
import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
    <div>
      <motion.div
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShieldCheck size={18} />
        Blockchain-powered healthcare records
      </motion.div>

      <motion.h1
        className="max-w-4xl text-5xl font-extrabold leading-tight text-slate-950 md:text-6xl"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Secure Medical Records with{" "}
        <GradientText>Patient-Controlled Access</GradientText>
      </motion.h1>

      <motion.p
        className="mt-6 max-w-2xl text-lg leading-8 text-slate-600"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        CareChain helps patients upload encrypted medical records, store them
        through IPFS, and grant or revoke doctor access using blockchain-backed
        verification.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="inline-flex items-center gap-2">
          <LockKeyhole size={18} className="text-teal-600" />
          AES encrypted uploads
        </span>

        <span className="inline-flex items-center gap-2">
          <ArrowRight size={18} className="text-blue-600" />
          IPFS + Smart Contracts
        </span>
      </motion.div>

      <HeroButtons />
    </div>
  );
}