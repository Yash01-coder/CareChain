import { useEffect, useState } from "react";
import api from "../services/api";

function RecordsTable() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/records/my-records");

      setRecords(res.data.records);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadRecord = async (id) => {
    try {
      const response = await api.get(
        `/records/download/${id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "medical-record.pdf"
      );

      document.body.appendChild(link);

      link.click();
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        mt-8
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >
        Medical Records
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Record Type
              </th>

              <th className="text-left p-3">
                Upload Date
              </th>

              <th className="text-left p-3">
                IPFS Hash
              </th>

              <th className="text-left p-3">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {records.map((record) => (

              <tr
                key={record._id}
                className="border-b"
              >

                <td className="p-3">
                  {record.recordType}
                </td>

                <td className="p-3">
                  {new Date(
                    record.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {record.ipfsHash?.slice(0, 20)}...
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      downloadRecord(record._id)
                    }
                    className="
                      bg-blue-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Download
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecordsTable;