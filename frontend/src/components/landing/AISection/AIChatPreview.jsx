import { motion } from "framer-motion";
import { Bot, UserRound, Sparkles } from "lucide-react";

export default function AIChatPreview() {
  return (
    <motion.div
      className="rounded-3xl border border-slate-200 bg-slate-950 p-5 shadow-2xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500 text-white">
            <Bot size={22} />
          </div>

          <div>
            <h3 className="font-bold text-white">
              CareChain AI
            </h3>
            <p className="text-xs text-slate-400">
              Medical record assistant
            </p>
          </div>
        </div>

        <Sparkles size={22} className="text-purple-300" />
      </div>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
            <UserRound size={16} />
          </div>

          <div className="rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3 text-sm leading-6 text-slate-200">
            Summarize my uploaded blood test report.
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500 text-white">
            <Bot size={16} />
          </div>

          <div className="rounded-2xl rounded-tl-sm bg-purple-500/20 px-4 py-3 text-sm leading-6 text-purple-50">
            Your report summary can highlight key values, abnormal ranges,
            and recommended doctor review points.
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-300">
            AI output
          </p>

          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Detect important medical terms</li>
            <li>• Convert complex records into simple language</li>
            <li>• Help patients prepare for consultation</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}