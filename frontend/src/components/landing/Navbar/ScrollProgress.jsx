import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400"
      style={{ scaleX: scrollYProgress }}
    />
  );
}