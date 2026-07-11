import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiEye,
  FiFileText,
  FiFilter,
  FiLogOut,
  FiRefreshCw,
  FiShield,
  FiUserCheck,
  FiUsers,
  FiX,
} from "react-icons/fi";
import MobileDoctorNav from "../components/MobileDoctorNav";
import API from "../services/api";

function StatCard({ icon, title, value, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-2xl text-cyan-300">
        {icon}
      </div>

      <p className="break-words text-sm font-bold text-slate-300">{title}</p>

      <h3 className="mt-2 break-words text-5xl font-black tracking-tight text-white">
        {value}
      </h3>

      <p className="mt-3 break-words text-sm text-slate-400">{subtitle}</p>
    </motion.div>
  );
}

function DoctorDashboard() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("all");
  const [previewRecord, setPreviewRecord] = useState(null);

  const doctorWallet = localStorage.getItem("walletAddress");
  const doctorName =
    JSON.parse(localStorage.getItem("user") || "{}")?.name || "Doctor";

  const shortWallet = doctorWallet
    ? `${doctorWallet.slice(0, 6)}...${doctorWallet.slice(-4)}`
    : "Wallet not connected";

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError("");

      if (!doctorWallet) {
        setError("Wallet address not found. Please log in again.");
        return;
      }

      const [recordsRes, patientsRes] = await Promise.all([
        API.get(`/doctors/records?doctorAddress=${doctorWallet}`),
        API.get(`/doctors/patients?doctorAddress=${doctorWallet}`),
      ]);

      setRecords(recordsRes.data.records || []);
      setPatients(patientsRes.data.patients || []);
    } catch (err) {
      console.log("FETCH ERROR:", err);
      setError(
        err.response?.data?.message ||
          "Failed to load records. Check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const filteredRecords = useMemo(() => {
    return selectedPatient === "all"
      ? records
      : records.filter(
          (record) =>
            record.patientWallet?.toLowerCase() ===
            selectedPatient.toLowerCase()
        );
  }, [records, selectedPatient]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("walletAddress");
    navigate("/login");
  };

  const handleDownload = async (recordId, fileName) => {
    try {
      const response = await API.get(`/records/download/${recordId}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", fileName || "medical-record");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.response?.data?.message || "Access denied or download failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.18),transparent_30rem),radial-gradient(circle_at_85%_20%,rgba(37,99,235,0.24),transparent_34rem)]" />

      <div className="relative z-10 min-w-0 overflow-hidden p-4 pb-24 md:p-8 lg:pb-8">
        <nav className="mb-8 flex min-w-0 flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 text-2xl font-black"
          >
            <span className="h-3 w-3 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_24px_#67e8f9]" />
            <span className="break-words">CareChain Doctor Portal</span>
          </Link>

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="min-w-0 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 px-4 py-3">
              <p className="break-words text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Dr. {doctorName}
              </p>

              <p className="mt-1 break-all font-mono text-sm text-white">
                {shortWallet}
              </p>
            </div>

            <button
              onClick={fetchRecords}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 font-black text-cyan-100 hover:bg-cyan-300/20 sm:w-auto"
            >
              <FiRefreshCw />
              Refresh
            </button>

            <button
              onClick={handleLogout}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-300/20 bg-red-500/10 px-5 font-black text-red-200 hover:bg-red-500/20 sm:w-auto"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </nav>

        <header className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
            Authorized Healthcare Network
          </p>

          <h1 className="mt-3 break-words text-4xl font-black tracking-tight text-white md:text-6xl">
            Doctor Dashboard
          </h1>

          <p className="mt-3 max-w-3xl break-words text-sm leading-7 text-slate-300 md:text-base">
            View patient records only when access is granted, verify
            blockchain-linked files, and download encrypted medical data through
            authorized permissions.
          </p>
        </header>

        <div className="mb-6 grid gap-5 md:grid-cols-3">
          <StatCard
            icon={<FiUsers />}
            title="Authorized Patients"
            value={patients.length}
            subtitle="Patients who granted access"
          />

          <StatCard
            icon={<FiFileText />}
            title="Total Records"
            value={records.length}
            subtitle="Available medical files"
          />

          <StatCard
            icon={<FiShield />}
            title="Showing"
            value={filteredRecords.length}
            subtitle="Filtered accessible records"
          />
        </div>

        <div className="mb-6 grid min-w-0 gap-4 lg:grid-cols-[1fr_0.75fr]">
          <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
              <FiFilter className="shrink-0" />
              Patient Filter
            </div>

            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="min-w-0 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-4 font-bold text-white outline-none"
            >
              <option value="all" className="bg-slate-950">
                All Patients ({records.length} records)
              </option>

              {patients.map((patient) => (
                <option
                  key={patient.patientWallet}
                  value={patient.patientWallet}
                  className="bg-slate-950"
                >
                  {patient.patientName} - {patient.patientWallet.slice(0, 12)}
                  ...
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0 rounded-3xl border border-emerald-300/15 bg-emerald-400/10 p-5 backdrop-blur-xl">
            <div className="mb-3 flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
                <FiUserCheck />
              </div>

              <div className="min-w-0">
                <p className="break-words font-black text-white">
                  Access Status
                </p>

                <p className="break-words text-sm text-emerald-100/80">
                  Smart contract permissions active
                </p>
              </div>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 shadow-[0_0_22px_rgba(45,212,191,0.45)]" />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 break-words rounded-2xl border border-red-300/20 bg-red-400/10 px-5 py-4 font-bold text-red-200">
            {error}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
        >
          {loading ? (
            <div className="p-12 text-center text-slate-300">
              Loading authorized records...
            </div>
          ) : !error && filteredRecords.length === 0 ? (
            <div className="p-12 text-center">
              <FiShield className="mx-auto mb-4 text-6xl text-cyan-300" />

              <p className="text-2xl font-black text-white">
                No records available
              </p>

              <p className="mt-2 text-sm text-slate-400">
                No patients have granted access yet, or no records match this
                filter.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 p-4 md:hidden">
                {filteredRecords.map((record) => (
                  <div
                    key={record._id}
                    className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="break-words font-black text-white">
                          {record.recordType}
                        </p>

                        <p className="mt-1 break-words text-sm text-slate-300">
                          {record.fileName}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-100">
                        Record
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs text-slate-400">
                      <p className="break-all font-mono">
                        Patient: {record.patientWallet || "-"}
                      </p>

                      <p className="break-all font-mono">
                        IPFS: {record.ipfsHash || "-"}
                      </p>

                      <p className="break-words">
                        Uploaded:{" "}
                        {new Date(
                          record.uploadedAt || record.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <button
                        onClick={() => setPreviewRecord(record)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-purple-300/20 bg-purple-400/10 px-4 py-2 text-xs font-black text-purple-100 hover:bg-purple-400/20"
                      >
                        <FiEye />
                        Preview
                      </button>

                      <button
                        onClick={() =>
                          handleDownload(record._id, record.fileName)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-cyan-500/20"
                      >
                        <FiDownload />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[1050px]">
                  <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-[0.18em] text-slate-400">
                    <tr>
                      <th className="p-4">Record Type</th>
                      <th className="p-4">File Name</th>
                      <th className="p-4">Patient</th>
                      <th className="p-4">Upload Date</th>
                      <th className="p-4">IPFS Hash</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <motion.tr
                        key={record._id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-t border-white/10 text-sm hover:bg-cyan-300/[0.04]"
                      >
                        <td className="p-4">
                          <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-100">
                            {record.recordType}
                          </span>
                        </td>

                        <td className="p-4 font-bold text-white">
                          {record.fileName}
                        </td>

                        <td className="p-4 font-mono text-xs text-slate-300">
                          {record.patientWallet
                            ? `${record.patientWallet.slice(
                                0,
                                8
                              )}...${record.patientWallet.slice(-6)}`
                            : "-"}
                        </td>

                        <td className="p-4 text-slate-300">
                          {new Date(
                            record.uploadedAt || record.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="max-w-[220px] truncate p-4 font-mono text-xs text-cyan-200">
                          {record.ipfsHash || "-"}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => setPreviewRecord(record)}
                              className="inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-purple-400/10 px-4 py-2 text-xs font-black text-purple-100 hover:bg-purple-400/20"
                            >
                              <FiEye />
                              Preview
                            </button>

                            <button
                              onClick={() =>
                                handleDownload(record._id, record.fileName)
                              }
                              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-cyan-500/20 hover:scale-105"
                            >
                              <FiDownload />
                              Download
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {previewRecord && (
        <RecordPreviewModal
          record={previewRecord}
          onClose={() => setPreviewRecord(null)}
        />
      )}

      <MobileDoctorNav />
    </main>
  );
}

function RecordPreviewModal({ record, onClose }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isImage = (name) => /\.(jpg|jpeg|png|gif|webp)$/i.test(name);
  const isPDF = (name) => /\.pdf$/i.test(name);

  useEffect(() => {
    let objectUrl = null;

    const fetchFile = async () => {
      try {
        setLoading(true);

        const response = await API.get(`/records/download/${record._id}`, {
          responseType: "blob",
        });

        objectUrl = URL.createObjectURL(response.data);
        setFileUrl(objectUrl);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load preview");
      } finally {
        setLoading(false);
      }
    };

    fetchFile();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [record._id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-cyan-950/40"
      >
        <div className="flex min-w-0 items-center justify-between gap-4 border-b border-white/10 p-5">
          <div className="min-w-0">
            <h3 className="break-words text-xl font-black text-white">
              {record.fileName}
            </h3>

            <p className="mt-1 break-words text-sm text-cyan-300">
              {record.recordType}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-white/20"
          >
            <FiX />
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-slate-900/70 p-5">
          {loading && (
            <div className="py-16 text-center text-slate-300">
              Loading preview...
            </div>
          )}

          {error && (
            <div className="py-16 text-center font-bold text-red-200">
              {error}
            </div>
          )}

          {!loading && !error && fileUrl && (
            <>
              {isImage(record.fileName) && (
                <img
                  src={fileUrl}
                  alt={record.fileName}
                  className="mx-auto max-w-full rounded-2xl shadow-2xl"
                />
              )}

              {isPDF(record.fileName) && (
                <iframe
                  src={fileUrl}
                  title={record.fileName}
                  className="h-[65vh] w-full rounded-2xl border border-white/10"
                />
              )}

              {!isImage(record.fileName) && !isPDF(record.fileName) && (
                <div className="py-16 text-center">
                  <FiFileText className="mx-auto mb-4 text-6xl text-cyan-300" />

                  <p className="text-xl font-black text-white">
                    Preview not available for this file type.
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Use the Download button to open this file.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="break-all border-t border-white/10 bg-slate-950 p-4 font-mono text-xs text-slate-400">
          IPFS: {record.ipfsHash || "-"}
        </div>
      </motion.div>
    </div>
  );
}

export default DoctorDashboard;