import {
  FileLock2,
  Wallet,
  UserCheck,
  History,
  Database,
  ShieldCheck,
} from "lucide-react";

export const features = [
  {
    icon: FileLock2,
    title: "Encrypted Medical Uploads",
    description:
      "Patients can upload reports, prescriptions, and medical files after client-to-server secured handling and backend AES encryption.",
  },
  {
    icon: Database,
    title: "IPFS-Based Storage",
    description:
      "Encrypted medical data is stored using decentralized IPFS workflows, reducing dependency on a single centralized file store.",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Verification",
    description:
      "Smart contracts help verify record ownership, access permissions, and important healthcare actions with tamper-resistant logs.",
  },
  {
    icon: UserCheck,
    title: "Doctor Access Control",
    description:
      "Patients can grant and revoke doctor access, keeping medical visibility under patient-controlled permission rules.",
  },
  {
    icon: History,
    title: "Audit Trail",
    description:
      "Record uploads, downloads, access grants, and revocations are tracked so patients can monitor sensitive activity.",
  },
  {
    icon: Wallet,
    title: "Wallet Identity",
    description:
      "CareChain connects healthcare workflows with wallet-based identity for patients and doctors in a Web3-ready system.",
  },
];