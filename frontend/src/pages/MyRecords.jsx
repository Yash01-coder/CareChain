import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiDatabase,
  FiDownload,
  FiFileText,
  FiLock,
  FiSearch,
  FiShield,
} from "react-icons/fi";

import AppShell from "../components/AppShell";
import api from "../services/api";
import EmptyState from "../components/ui/EmptyState";
import LoadingState from "../components/ui/LoadingState";
import SectionCard from "../components/ui/SectionCard";
import StatusBadge from "../components/ui/StatusBadge";


function MyRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await api.get("/records/my-records");
      setRecords(response.data.records || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (record) => {
    try {
      const response = await api.get(`/records/download/${record._id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", record.fileName || "medical-record");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Download failed");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(
      records.map((record) => record.recordType).filter(Boolean)
    );

    return ["all", ...Array.from(unique)];
  }, [records]);

  const filteredRecords = records.filter((record) => {
    const text = `${record.recordType || ""} ${record.fileName || ""} ${
      record.ipfsHash || ""
    }`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());
    const matchesFilter = filter === "all" || record.recordType === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <AppShell
      role="patient"
      title="My Medical Records"
      subtitle="Search encrypted records, inspect IPFS hashes, verify blockchain transactions, and download authorized files."
    >
      <div className="mb-6 grid gap-4 xl:grid-cols-[1fr_auto]">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
          <FiSearch className="text-cyan-300" />

          <input
            type="text"
            placeholder="Search by record type, file name, or IPFS hash..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 font-bold text-white outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category} className="bg-slate-950">
              {category === "all" ? "All Categories" : category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
          <FiDatabase className="mb-4 text-3xl text-cyan-300" />
          <p className="text-sm font-bold text-slate-400">Total Records</p>
          <p className="mt-2 text-4xl font-black">{records.length}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
          <FiShield className="mb-4 text-3xl text-cyan-300" />
          <p className="text-sm font-bold text-slate-400">Verified Files</p>
          <p className="mt-2 text-4xl font-black">{filteredRecords.length}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
          <FiLock className="mb-4 text-3xl text-cyan-300" />
          <p className="text-sm font-bold text-slate-400">Encryption</p>
          <p className="mt-2 text-4xl font-black">AES</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
      >
        {loading ? (
          <div className="p-6">
            <LoadingState message="Loading records..." />
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-6">
  <EmptyState
    icon={<FiFileText />}
    title="No records found"
    message="Upload a record or adjust your search filter."
  />
</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-[0.18em] text-slate-400">
                <tr>
                  <th className="p-4">Record Type</th>
                  <th className="p-4">File Name</th>
                  <th className="p-4">IPFS Hash</th>
                  <th className="p-4">Transaction Hash</th>
                  <th className="p-4">Upload Date</th>
                  <th className="p-4">Download</th>
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
                    <td className="p-4 font-black text-white">
                      {record.recordType}
                    </td>

                    <td className="p-4 text-slate-300">{record.fileName}</td>

                    <td className="max-w-[220px] truncate p-4 font-mono text-xs text-cyan-200">
                      {record.ipfsHash || "-"}
                    </td>

                    <td className="max-w-[220px] truncate p-4 font-mono text-xs text-blue-200">
                      {record.transactionHash || "-"}
                    </td>

                    <td className="p-4 text-slate-300">
                      {new Date(
                        record.uploadedAt || record.createdAt
                      ).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => handleDownload(record)}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-cyan-500/20 hover:scale-105"
                      >
                        <FiDownload />
                        Download
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </AppShell>
  );
}

export default MyRecords;