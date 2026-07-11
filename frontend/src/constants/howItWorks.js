import {
  Wallet,
  UploadCloud,
  LockKeyhole,
  Database,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const howItWorks = [
  {
    icon: Wallet,
    title: "Patient Connects Wallet",
    description:
      "The patient starts by connecting their wallet identity and registering on the CareChain platform.",
  },
  {
    icon: UploadCloud,
    title: "Medical Record Uploaded",
    description:
      "The patient uploads a medical report, prescription, scan, or document from the secure dashboard.",
  },
  {
    icon: LockKeyhole,
    title: "File Gets Encrypted",
    description:
      "The backend encrypts the medical file before storage, so raw health data is not exposed directly.",
  },
  {
    icon: Database,
    title: "Stored Through IPFS",
    description:
      "The encrypted file is uploaded to IPFS and represented by a content identifier for retrieval.",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Entry Created",
    description:
      "Record metadata and access actions are connected with smart contract based verification.",
  },
  {
    icon: UserCheck,
    title: "Doctor Access Managed",
    description:
      "Patients grant, revoke, and monitor doctor access while audit logs track sensitive actions.",
  },
];