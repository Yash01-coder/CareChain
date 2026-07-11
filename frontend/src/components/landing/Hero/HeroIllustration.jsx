import { motion } from "framer-motion";
import {
  Activity,
  Database,
  FileLock2,
  KeyRound,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import GlassPanel from "../../common/GlassPanel";

const nodes = [
  {
    icon: FileLock2,
    label: "Encrypted File",
    className: "left-0 top-10",
  },
  {
    icon: Database,
    label: "IPFS Storage",
    className: "right-0 top-24",
  },
  {
    icon: KeyRound,
    label: "Access Key",
    className: "left-8 bottom-20",
  },
  {
    icon: Stethoscope,
    label: "Doctor View",
    className: "right-10 bottom-6",
  },
];

export default function HeroIllustration() {
  return (
    <div className="relative hidden min-h-[520px] lg:block">
      <motion.div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 p-1 shadow-2xl shadow-blue-500/30"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white text-center">
          <ShieldCheck size={64} className="text-blue-600" />

          <h3 className="mt-5 text-2xl font-extrabold text-slate-950">
            CareChain
          </h3>

          <p className="mt-2 max-w-44 text-sm leading-6 text-slate-500">
            Secure health data flow between patient and doctor
          </p>
        </div>
      </motion.div>

      <div className="absolute left-1/2 top-1/2 h-[1px] w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-full w-[1px] -translate-y-1/2 bg-gradient-to-b from-transparent via-teal-300 to-transparent" />

      {nodes.map((node, index) => {
        const Icon = node.icon;

        return (
          <motion.div
            key={node.label}
            className={`absolute ${node.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <GlassPanel
              className="flex min-w-48 items-center gap-3 px-5 py-4"
              hover
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Icon size={22} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  {node.label}
                </p>
                <p className="text-xs text-slate-500">
                  Verified
                </p>
              </div>
            </GlassPanel>
          </motion.div>
        );
      })}

      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <Activity size={42} className="text-teal-500" />
      </motion.div>
    </div>
  );
}