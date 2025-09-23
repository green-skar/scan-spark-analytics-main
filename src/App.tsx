import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import "./styles/neon.css";
import "./styles/dashboard.css";
import DashboardLayout from "./layouts/DashboardLayout";
import Sidebar from "./components/Sidebar";

import AnalyticsDashboard from "./components/AnalyticsDashboard";
import SponsorDashboard from "./components/SponsorDashboard";
import KardiverseAction from "./components/KardiverseAction";
import InteractiveAction from "./components/InteractiveAction";
import React, { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DashboardLayout
            showPremiumModal={showPremiumModal}
            setShowPremiumModal={setShowPremiumModal}
            isPremium={isPremium}
          >
            {/* Premium toggle switch */}
            <div style={{ position: "fixed", top: 16, right: 24, zIndex: 100 }}>
              <label className="flex items-center gap-2 cursor-pointer bg-cyan-900/80 px-3 py-2 rounded-lg shadow-glow">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="accent-cyan-400 w-5 h-5"
                />
                <span className="text-cyan-100 font-semibold">
                  Premium Mode
                </span>
              </label>
            </div>
            <Routes>
              <Route
                path="/"
                element={
                  <AnalyticsDashboard
                    isPremium={isPremium}
                    onRequestPremium={() => setShowPremiumModal(true)}
                  />
                }
              />
              <Route
                path="/basic-data"
                element={
                  <AnalyticsDashboard
                    isPremium={isPremium}
                    onRequestPremium={() => setShowPremiumModal(true)}
                  />
                }
              />
              <Route
                path="/sponsor"
                element={<SponsorDashboard isPremium={isPremium} />}
              />
              <Route path="/action" element={<KardiverseAction />} />
              <Route path="/interactive" element={<InteractiveAction />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
