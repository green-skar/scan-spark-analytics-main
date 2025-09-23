import Sidebar from "../components/Sidebar";
import PremiumUpgradeModal from "../components/PremiumUpgradeModal";
import React, { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showPremiumModal: boolean;
  setShowPremiumModal: (open: boolean) => void;
  isPremium: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  showPremiumModal,
  setShowPremiumModal,
  isPremium,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Sidebar width
  const sidebarWidth = sidebarCollapsed ? 64 : 256; // px
  // On mobile/tablet, sidebar should overlay and not affect main content margin
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Responsive: show sidebar as drawer on mobile/tablet
  // On mobile/tablet, sidebar overlays and dims page, toggle becomes X, and selecting an item closes sidebar
  return (
    <div className="dashboard-layout min-h-screen w-full overflow-x-hidden relative">
      {/* Hamburger for mobile/tablet */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-40 bg-cyan-900/80 text-cyan-200 p-2 rounded-lg shadow-glow focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
      {/* Sidebar */}
      <aside
        className={`sidebar fixed top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out
          ${sidebarCollapsed && !sidebarOpen ? "w-16" : "w-64"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          p-2 flex flex-col
        `}
        style={{
          width: sidebarCollapsed && !sidebarOpen && !isMobile ? 64 : 256,
          background: "rgba(10, 10, 35, 0.72)",
          boxShadow: "0 0 32px #00f0ff44",
        }}
      >
        {/* Close/X button for mobile/tablet only when sidebar is open, placed inline to the right of branding */}
        {/* ...existing code... */}
        {/* Collapse/expand toggle for desktop is now handled in Sidebar via onToggleCollapse prop */}
        <Sidebar
          collapsed={sidebarCollapsed && !sidebarOpen && !isMobile}
          mobileOpen={sidebarOpen}
          onMobileSelect={() => setSidebarOpen(false)}
          onRequestPremium={() => setShowPremiumModal(true)}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          isPremium={isPremium}
        />
      </aside>
      {/* Overlay for mobile/tablet when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Sidebar overlay"
        />
      )}
      {/* Main Content */}
      <main
        className="flex-1 p-2 md:p-4 min-h-screen transition-all duration-300"
        style={{
          marginLeft: isMobile || sidebarOpen ? 0 : sidebarCollapsed ? 64 : 256,
        }}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              onRequestPremium: () => setShowPremiumModal(true),
            })
          : children}
      </main>
      {/* Premium Upgrade Modal */}
      <PremiumUpgradeModal
        open={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
};

export default DashboardLayout;
