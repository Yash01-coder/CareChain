import Logo from "../../common/Logo";
import Container from "../../ui/Container";
import { navigation } from "../../../constants/navigation";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-12 text-white">
      <Container>
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Logo size="sm" />

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              CareChain is a secure healthcare records platform built with
              encrypted storage, blockchain verification, patient-controlled
              access, and AI-ready medical record workflows.
            </p>
          </div>

          <div className="md:text-right">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-300">
              Navigation
            </h3>

            <div className="mt-4 flex flex-wrap gap-4 md:justify-end">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-cyan-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 CareChain. All rights reserved.
          </p>

          <p>
            Built for MCA final year project presentation.
          </p>
        </div>
      </Container>
    </footer>
  );
}