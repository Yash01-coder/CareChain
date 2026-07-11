import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../common/Logo";
import Button from "../../ui/Button";
import { navigation } from "../../../constants/navigation";

export default function MobileDrawer({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-[min(22rem,90vw)] bg-white p-6 shadow-2xl lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="flex items-center justify-between">
              <Logo size="sm" />

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 space-y-3">
              <Link to="/login" onClick={onClose} className="block">
                <Button variant="outline" fullWidth>
                  Login
                </Button>
              </Link>

              <Link to="/register" onClick={onClose} className="block">
                <Button fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}