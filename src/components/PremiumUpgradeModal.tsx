import React from "react";

interface PremiumUpgradeModalProps {
  open: boolean;
  onClose: () => void;
}

const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({
  open,
  onClose,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed, non-interactive background */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      {/* Modal panel */}
      <div className="relative z-10 bg-cyan-950 border border-cyan-400 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-cyan-300 hover:text-white text-2xl bg-transparent border-none focus:outline-none"
          onClick={onClose}
          aria-label="Close upgrade modal"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-cyan-200 mb-4 text-center">
          Upgrade to Premium
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-cyan-900/80 border border-cyan-700 rounded-lg px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-cyan-900/80 border border-cyan-700 rounded-lg px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <input
            type="text"
            placeholder="Organization (optional)"
            className="bg-cyan-900/80 border border-cyan-700 rounded-lg px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="mt-2 bg-cyan-500 hover:bg-cyan-400 text-cyan-950 font-bold py-2 rounded-lg shadow-glow transition"
          >
            Request Upgrade
          </button>
        </form>
        <p className="mt-4 text-cyan-400 text-sm text-center">
          Fill in your details to request access to premium services. Our team
          will contact you soon.
        </p>
      </div>
    </div>
  );
};

export default PremiumUpgradeModal;
