"use client";

import { useState, useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";
import InstrumentPanel from "@/components/InstrumentPanel";
import SpaceBackground from "@/components/SpaceBackground";

export default function CockpitPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");

  useEffect(() => {
    // Simulate system initialization
    const timer = setTimeout(() => {
      setIsConnected(true);
      setSystemStatus("NOMINAL");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-surface">
      {/* Space Background */}
      <SpaceBackground />

      {/* Cockpit Grid Layout */}
      <div className="relative w-full h-full grid grid-cols-12 grid-rows-12 gap-0 z-10">
        {/* Top Instrument Panel - spans full width, top 2 rows */}
        <div className="col-span-12 row-span-2 bg-gradient-to-b from-surface-elev2/80 to-transparent backdrop-blur-sm border-b border-accent/30">
          <InstrumentPanel position="top" />
        </div>

        {/* Left Side Panel - spans left 2 columns, rows 3-11 */}
        <div className="col-span-2 row-span-9 bg-gradient-to-r from-surface-elev2/60 to-transparent backdrop-blur-sm border-r border-accent/30">
          <InstrumentPanel position="left" />
        </div>

        {/* Right Side Panel - spans right 2 columns, rows 3-11 */}
        <div className="col-span-2 col-start-11 row-span-9 bg-gradient-to-l from-surface-elev2/60 to-transparent backdrop-blur-sm border-l border-accent/30">
          <InstrumentPanel position="right" />
        </div>

        {/* Center Console Area - spans columns 3-10, rows 3-11 */}
        <div className="col-span-8 col-start-3 row-span-9 p-4">
          <div className="w-full h-full">
            <ChatInterface />
          </div>
        </div>

        {/* Bottom Panel - spans full width, bottom 1 row */}
        <div className="col-span-12 row-span-1 bg-gradient-to-t from-surface-elev2/80 to-transparent backdrop-blur-sm border-t border-accent/30">
          <InstrumentPanel position="bottom" />
        </div>

        {/* System Status Indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? "bg-success" : "bg-warning"
            } animate-pulse`}
          ></div>
          <span className="text-sm font-mono text-text-secondary">
            {systemStatus}
          </span>
        </div>

        {/* Cockpit Frame Elements */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {/* Top Frame */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"></div>

          {/* Bottom Frame */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"></div>

          {/* Left Frame */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-30"></div>

          {/* Right Frame */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-30"></div>
        </div>

        {/* Corner Accent Elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent opacity-50"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent opacity-50"></div>
      </div>
    </div>
  );
}
