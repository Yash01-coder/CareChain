import { motion } from "framer-motion";

export default function AIFeature({ item, index }) {
  const Icon = item.icon;

  return (
    <motion.div
      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.06 }}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
        <Icon size={22} />
      </div>

      <div>
        <h3 className="font-bold text-slate-950">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}