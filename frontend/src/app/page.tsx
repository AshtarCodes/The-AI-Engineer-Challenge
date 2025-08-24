'use client';

import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import InstrumentPanel from '@/components/InstrumentPanel';
import SpaceBackground from '@/components/SpaceBackground';

export default function CockpitPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [systemStatus, setSystemStatus] = useState('INITIALIZING');

  useEffect(() => {
    // Simulate system initialization
    const timer = setTimeout(() => {
      setIsConnected(true);
      setSystemStatus('NOMINAL');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-surface">
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Cockpit Overlay */}
      <div className="absolute inset-0 z-10">
        {/* Top Instrument Panel */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface-elev2/80 to-transparent backdrop-blur-sm">
          <InstrumentPanel position="top" />
        </div>

        {/* Left Side Panel */}
        <div className="absolute left-0 top-32 bottom-32 w-64 bg-gradient-to-r from-surface-elev2/60 to-transparent backdrop-blur-sm">
          <InstrumentPanel position="left" />
        </div>

        {/* Right Side Panel */}
        <div className="absolute right-0 top-32 bottom-32 w-64 bg-gradient-to-l from-surface-elev2/60 to-transparent backdrop-blur-sm">
          <InstrumentPanel position="right" />
        </div>

        {/* Bottom Panel */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-elev2/80 to-transparent backdrop-blur-sm">
          <InstrumentPanel position="bottom" />
        </div>

        {/* Center Console */}
        <div className="absolute inset-32 flex items-center justify-center">
          <div className="w-full max-w-4xl h-full max-h-2xl">
            <ChatInterface />
          </div>
        </div>

        {/* System Status Indicator */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success' : 'bg-warning'} animate-pulse`}></div>
          <span className="text-sm font-mono text-text-secondary">
            {systemStatus}
          </span>
        </div>

        {/* Cockpit Frame Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Frame */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"></div>
          
          {/* Bottom Frame */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"></div>
          
          {/* Left Frame */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-30"></div>
          
          {/* Right Frame */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent opacity-30"></div>
        </div>
      </div>
    </div>
  );
}
