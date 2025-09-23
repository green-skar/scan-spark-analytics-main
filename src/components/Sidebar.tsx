import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BarChart3, Users, Gift, Zap } from "lucide-react";

const links = [
  {
    to: "/",
    label: "Analytics Dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
    desc: "View analytics, scan trends, and key metrics.",
  },
  {
    to: "/sponsor",
    label: "Sponsor Dashboard",
    icon: <Users className="h-5 w-5" />,
    desc: "Sponsor analytics, exports, and campaign data.",
  },
  {
    to: "/action",
    label: "Kardiverse Action",
    icon: <Zap className="h-5 w-5" />,
    desc: "Participate in live actions and promotions.",
  },
  {
    to: "/interactive",
    label: "Interactive Action",
    icon: <Gift className="h-5 w-5" />,
    desc: "Engage with interactive prize draws.",
  },
];

interface SidebarProps {
  collapsed?: boolean;
  mobileOpen?: boolean;
  onMobileSelect?: () => void;
  onRequestPremium?: () => void;
  onToggleCollapse?: () => void;
  isPremium?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  mobileOpen,
  onMobileSelect,
  onRequestPremium,
  onToggleCollapse,
  isPremium,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (to: string) => location.pathname === to;

  // On mobile/tablet, always show full sidebar content under logo and always show labels
  // On desktop, show only icons with tooltips when collapsed
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleSelect = (to: string) => {
    navigate(to);
    if ((isMobile || mobileOpen) && onMobileSelect) onMobileSelect();
  };

  return (
    <div className="flex flex-col h-full items-center md:items-stretch relative">
      {/* Logo and Brand with collapse/expand button */}
      <div
        className={`flex items-center gap-2 mb-8 mt-2 cursor-pointer group w-full ${
          collapsed && !mobileOpen && !isMobile
            ? "justify-center"
            : "md:justify-start"
        }`}
        onClick={() => handleSelect("/")}
      >
        <img
          src="/logo.jpg"
          alt="Kardiverse Logo"
          className="h-10 w-10 rounded shadow-glow group-hover:scale-105 transition-transform"
        />
        {(!collapsed || mobileOpen || isMobile) && (
          <>
            <span className="text-xl font-extrabold text-cyan-300 drop-shadow-[0_0_8px_#00f0ff] group-hover:text-white transition-colors md:inline-block">
              Kardiverse <span className="text-white">Analytics</span>
            </span>
            {/* Collapse/expand button for expanded desktop: to the right of text, basic style */}
            {!isMobile && !mobileOpen && (
              <button
                className="ml-2 flex items-center justify-center text-cyan-300 hover:text-white text-lg rounded-full w-8 h-8 focus:outline-none border-none bg-transparent"
                style={{ boxShadow: "none", border: "none" }}
                onClick={onToggleCollapse}
                aria-label="Collapse sidebar"
                tabIndex={-1}
              >
                <span style={{ fontSize: "1.1rem" }}>×</span>
              </button>
            )}
            {/* Close button for mobile/tablet: to the right of text, basic style, only when sidebar is open */}
            {isMobile && mobileOpen && (
              <button
                className="ml-2 flex items-center justify-center text-cyan-300 hover:text-white text-lg rounded-full w-8 h-8 focus:outline-none border-none bg-transparent"
                style={{ boxShadow: "none", border: "none" }}
                onClick={onMobileSelect}
                aria-label="Close sidebar"
                tabIndex={-1}
              >
                <span style={{ fontSize: "1.1rem" }}>×</span>
              </button>
            )}
          </>
        )}
      </div>
      {/* Collapse/expand button for collapsed sidebar: centered under logo, basic style, desktop only */}
      {collapsed && !isMobile && !mobileOpen && (
        <div
          className="flex justify-center items-center w-full mb-6"
          style={{ marginTop: "-12px" }}
        >
          <button
            className="flex items-center justify-center text-cyan-300 hover:text-white text-lg rounded-full w-8 h-8 focus:outline-none border-none bg-transparent"
            style={{ boxShadow: "none", border: "none" }}
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            tabIndex={-1}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      )}
      {/* Navigation Links */}
      <nav
        className={`flex flex-col gap-2 ${
          collapsed && !mobileOpen && !isMobile ? "items-center" : ""
        }`}
      >
        {links.map((link) => (
          <div
            key={link.to}
            className="relative group w-full flex justify-center"
          >
            <button
              onClick={() => handleSelect(link.to)}
              className={`flex items-center ${
                collapsed && !mobileOpen && !isMobile ? "justify-center" : ""
              } w-full gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-150
                ${
                  isActive(link.to)
                    ? "bg-cyan-900/60 text-cyan-200 shadow-glow"
                    : "text-cyan-100 hover:bg-cyan-800/40 hover:text-white"
                }
                focus:outline-none focus:ring-2 focus:ring-cyan-400/60`}
              tabIndex={0}
              aria-label={link.label}
            >
              {link.icon}
              {(!collapsed || mobileOpen || isMobile) && (
                <span className="md:inline-block">{link.label}</span>
              )}
            </button>
            {/* Tooltip on hover for collapsed desktop */}
            {collapsed && !mobileOpen && !isMobile && (
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-cyan-900 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none z-30 whitespace-nowrap shadow-lg transition-opacity duration-200 md:block">
                {link.label}
              </span>
            )}
            {/* Tooltip on hover for expanded desktop */}
            {!collapsed && !mobileOpen && !isMobile && (
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-cyan-900 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none z-30 whitespace-nowrap shadow-lg transition-opacity duration-200 md:block">
                {link.desc}
              </span>
            )}
          </div>
        ))}
      </nav>
      {/* Premium upgrade button (basic users) */}
      {!isPremium && (
        <div className="mt-auto w-full px-4 pb-6">
          <button
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-cyan-950 font-bold py-2 rounded-lg shadow-glow hover:from-cyan-400 hover:to-cyan-300 transition"
            onClick={onRequestPremium}
          >
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
