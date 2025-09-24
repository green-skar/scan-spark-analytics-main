import React, { useState } from "react";
import { SCAN_SOURCES } from "../constants/scanSources";
import { Scan } from "../types/scan";
import NeonCard from "./NeonCard";

const ScanRegistration: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const scansPerPage = 50;
  const totalPages = Math.ceil(scans.length / scansPerPage);

  const handleSimulateScan = (source: "Internal" | "External") => {
    const newScan: Scan = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      location: "Nairobi, Kenya", // Placeholder
      source,
      user: "User123", // Placeholder
    };
    setScans([newScan, ...scans]);
  };

  return (
    <NeonCard title="QR/NFC Scan Registration">
      <div className="flex gap-4 mb-4">
        <button
          className="neon-btn"
          onClick={() => handleSimulateScan(SCAN_SOURCES.INTERNAL)}
        >
          Simulate Internal Scan
        </button>
        <button
          className="neon-btn"
          onClick={() => handleSimulateScan(SCAN_SOURCES.EXTERNAL)}
        >
          Simulate External Scan
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Location</th>
              <th>Source</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {scans.slice(0, 2).map((scan) => (
              <tr key={scan.id}>
                <td>{new Date(scan.timestamp).toLocaleString()}</td>
                <td>{scan.location}</td>
                <td>{scan.source}</td>
                <td>{scan.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {scans.length > 2 && (
        <button className="neon-btn mt-4" onClick={() => setModalOpen(true)}>
          More Scans
        </button>
      )}

      {/* Modal for all scans, paginated */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative z-10 bg-cyan-950 border border-cyan-400 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 animate-fadeIn">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-cyan-300 hover:text-white text-2xl bg-transparent border-none focus:outline-none"
              onClick={() => setModalOpen(false)}
              aria-label="Close scan modal"
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-cyan-200 mb-4 text-center">
              All Scans
            </h2>
            <div className="overflow-x-auto max-h-[60vh]">
              <table className="min-w-full text-left">
                <thead>
                  <tr>
                    <th>Date/Time</th>
                    <th>Location</th>
                    <th>Source</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {scans
                    .slice((page - 1) * scansPerPage, page * scansPerPage)
                    .map((scan) => (
                      <tr key={scan.id}>
                        <td>{new Date(scan.timestamp).toLocaleString()}</td>
                        <td>{scan.location}</td>
                        <td>{scan.source}</td>
                        <td>{scan.user}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="neon-btn px-3 py-1"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="text-cyan-200 font-bold">
                Page {page} of {totalPages}
              </span>
              <button
                className="neon-btn px-3 py-1"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </NeonCard>
  );
};

export default ScanRegistration;
