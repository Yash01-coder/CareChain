import {
  Fingerprint,
  FileKey2,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";

export const securityHighlights = [
  {
    icon: LockKeyhole,
    title: "Encrypted Before Storage",
    description:
      "Medical files are encrypted before being uploaded, reducing exposure of sensitive healthcare data.",
  },
  {
    icon: FileKey2,
    title: "Controlled Access",
    description:
      "Patients decide which doctor can access records and can revoke permissions whenever required.",
  },
  {
    icon: Fingerprint,
    title: "Wallet-Based Identity",
    description:
      "Wallet addresses help connect users, roles, and healthcare actions with verifiable identity.",
  },
  {
    icon: ShieldCheck,
    title: "Tamper-Resistant Logs",
    description:
      "Important record and access activities are tracked through audit workflows for visibility.",
  },
];