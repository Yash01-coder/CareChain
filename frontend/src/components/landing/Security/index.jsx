import { Shield, CheckCircle2 } from "lucide-react";
import Container from "../../ui/Container";
import SecurityCard from "./SecurityCard";
import { securityHighlights } from "../../../constants/security";

export default function Security() {
  return (
    <section
      id="security"
      className="bg-slate-950 px-4 py-24 text-white"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              <Shield size={18} />
              Security-first architecture
            </div>

            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Designed to protect sensitive healthcare records.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              CareChain uses encryption, wallet identity, IPFS workflows,
              blockchain verification, and audit tracking to keep patient data
              controlled, traceable, and harder to tamper with.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Encrypted medical record storage",
                "Grant and revoke doctor access",
                "Patient-side visibility of sensitive actions",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-semibold text-slate-200"
                >
                  <CheckCircle2 size={20} className="text-teal-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {securityHighlights.map((item, index) => (
              <SecurityCard
                key={item.title}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}