"use client";

import { useState, useEffect } from "react";

interface InstrumentPanelProps {
  position: "top" | "bottom" | "left" | "right";
}

interface TelemetryData {
  altitude: number;
  velocity: number;
  temperature: number;
  pressure: number;
  oxygen: number;
  battery: number;
  fuel: number;
}

const InstrumentPanel = ({ position }: InstrumentPanelProps) => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    altitude: 408000,
    velocity: 27600,
    temperature: 22.5,
    pressure: 1013.25,
    oxygen: 98.5,
    battery: 87.2,
    fuel: 94.8,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        altitude: prev.altitude + (Math.random() - 0.5) * 100,
        velocity: prev.velocity + (Math.random() - 0.5) * 50,
        temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
        pressure: prev.pressure + (Math.random() - 0.5) * 2,
        oxygen: Math.max(
          95,
          Math.min(100, prev.oxygen + (Math.random() - 0.5) * 0.5)
        ),
        battery: Math.max(
          80,
          Math.min(100, prev.battery + (Math.random() - 0.5) * 0.3)
        ),
        fuel: Math.max(
          90,
          Math.min(100, prev.fuel + (Math.random() - 0.5) * 0.2)
        ),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderTopPanel = () => (
    <div className="flex justify-between items-center h-full px-8 gap-8">
      <div className="flex space-x-8 gap-4">
        <TelemetryDisplay
          label="ALTITUDE"
          value={`${Math.round(telemetry.altitude).toLocaleString()}`}
          unit="m"
          status="nominal"
        />
        <TelemetryDisplay
          label="VELOCITY"
          value={`${Math.round(telemetry.velocity).toLocaleString()}`}
          unit="km/h"
          status="nominal"
        />
        <TelemetryDisplay
          label="TEMP"
          value={telemetry.temperature.toFixed(1)}
          unit="°C"
          status="nominal"
        />
        <TelemetryDisplay
          label="PRESSURE"
          value={telemetry.pressure.toFixed(1)}
          unit="hPa"
          status="nominal"
        />
      </div>
      <div className="flex gap-2">
        <StatusIndicator label="LIFE SUPPORT" status="nominal" />
        <StatusIndicator label="NAVIGATION" status="nominal" />
        <StatusIndicator label="COMMUNICATIONS" status="nominal" />
      </div>
    </div>
  );

  const renderBottomPanel = () => (
    <div className="flex justify-between items-center h-full px-8 mx-4 gap-8">
      <div className="flex space-x-8 gap-2">
        <GaugeDisplay
          label="OXYGEN"
          value={telemetry.oxygen}
          unit="%"
          color="success"
        />
        <GaugeDisplay
          label="BATTERY"
          value={telemetry.battery}
          unit="%"
          color={telemetry.battery < 90 ? "warning" : "success"}
        />
        <GaugeDisplay
          label="FUEL"
          value={telemetry.fuel}
          unit="%"
          color="success"
        />
      </div>
      <div className="flex space-x-4">
        <div className="text-sm font-mono text-text-secondary">
          <div>MISSION TIME: 02:14:37</div>
          <div>ORBIT: LEO-408</div>
        </div>
      </div>
    </div>
  );

  const renderSidePanel = () => (
    <div className="flex flex-col justify-center items-center h-full space-y-6">
      <div className="text-center">
        <div className="text-lg font-mono text-accent mb-2">DRAGON</div>
        <div className="text-xs text-text-secondary">CAPSULE v2.1</div>
      </div>
      <div className="w-32 h-32 border-2 border-accent rounded-full flex items-center justify-center">
        <div className="w-24 h-24 border border-accent/50 rounded-full animate-spin-slow"></div>
      </div>
      <div className="text-center space-y-2">
        <div className="text-sm font-mono text-text-secondary">
          <div>STATUS: NOMINAL</div>
          <div>MODE: AUTO</div>
        </div>
      </div>
    </div>
  );

  switch (position) {
    case "top":
      return renderTopPanel();
    case "bottom":
      return renderBottomPanel();
    case "left":
    case "right":
      return renderSidePanel();
    default:
      return null;
  }
};

interface TelemetryDisplayProps {
  label: string;
  value: string;
  unit: string;
  status: "nominal" | "warning" | "danger";
}

const TelemetryDisplay = ({
  label,
  value,
  unit,
  status,
}: TelemetryDisplayProps) => (
  <div className="text-center">
    <div className="text-xs text-text-dim mb-1">{label}</div>
    <div
      className={`flex items-center gap-1 ${
        status === "nominal"
          ? "text-text-primary"
          : status === "warning"
          ? "text-warning"
          : "text-danger"
      }`}
    >
      <span className="text-lg font-mono">{value}</span>
      <span className="text-sm text-text-secondary">{unit}</span>
    </div>
  </div>
);

interface StatusIndicatorProps {
  label: string;
  status: "nominal" | "warning" | "danger";
}

const StatusIndicator = ({ label, status }: StatusIndicatorProps) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-2 h-2 rounded-full ${
        status === "nominal"
          ? "bg-success"
          : status === "warning"
          ? "bg-warning"
          : "bg-danger"
      } animate-pulse`}
    ></div>
    <div className="text-xs font-mono text-text-secondary">{label}</div>
  </div>
);

interface GaugeDisplayProps {
  label: string;
  value: number;
  unit: string;
  color: "success" | "warning" | "danger";
}

const GaugeDisplay = ({ label, value, unit, color }: GaugeDisplayProps) => (
  <div className="text-center">
    <div className="text-xs text-text-dim mb-1">{label}</div>
    <div className="relative w-16 h-16 mx-auto">
      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="var(--field-border)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke={`var(--${color})`}
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${(value / 100) * 175.93} 175.93`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-sm font-mono ${
            color === "success"
              ? "text-success"
              : color === "warning"
              ? "text-warning"
              : "text-danger"
          }`}
        >
          {Math.round(value)}
          {unit}
        </span>
      </div>
    </div>
  </div>
);

export default InstrumentPanel;
