import React from "react";

const NeonCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="neon-card p-6 mb-6">
    <h2 className="text-xl font-bold mb-2 neon-text-glow">{title}</h2>
    {children}
  </div>
);

export default NeonCard;
