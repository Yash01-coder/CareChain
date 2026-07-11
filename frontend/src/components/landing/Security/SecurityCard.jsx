import { motion } from "framer-motion";

export default function SecurityCard({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
        <Icon size={24} />
      </div>

      <h3 className="text-lg font-bold text-white">
        {item.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">
        {item.description}
      </p>
    </motion.div>
  );
}