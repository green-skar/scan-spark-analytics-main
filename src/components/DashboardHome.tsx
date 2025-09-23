import React from "react";
import ScanRegistration from "./ScanRegistration";
import NeonCard from "./NeonCard";

const DashboardHome: React.FC = () => (
  <div className="space-y-6">
    <ScanRegistration />
    <NeonCard title="Stats">
      <div className="flex gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold neon-text-glow">154</div>
          <div>Total Entries</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold neon-text-glow">€100</div>
          <div>Prize</div>
        </div>
      </div>
    </NeonCard>
    <NeonCard title="Promotions">
      <div className="flex flex-col items-center">
        <img
          src="/assets/hero-analytics.jpg"
          alt="Promo"
          className="w-48 mb-4 neon-card"
        />
        <button className="neon-btn">Tap to Claim Entry</button>
      </div>
    </NeonCard>
  </div>
);

export default DashboardHome;
