import React, { useState, useEffect } from 'react';
import { Shield, Flame, Swords, Heart, Activity } from 'lucide-react';
import { PowerGrid } from '../types';
import { playTechClick } from '../utils/audio';

interface SystemDiagnosticsProps {
  powerGrid: PowerGrid;
  setPowerGrid: React.Dispatch<React.SetStateAction<PowerGrid>>;
  hullIntegrity: number;
}

export default function SystemDiagnostics({
  powerGrid,
  setPowerGrid,
  hullIntegrity,
}: SystemDiagnosticsProps) {
  const TOTAL_POWER_LIMIT = 100; // MW
  const allocatedPower = powerGrid.shields + powerGrid.engines + powerGrid.weapons + powerGrid.lifeSupport;
  const powerRemaining = TOTAL_POWER_LIMIT - allocatedPower;

  // Track an offset for animated wave visualizer
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setWaveOffset((prev) => (prev + 0.15) % (Math.PI * 2));
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handlePowerChange = (system: keyof PowerGrid, value: number) => {
    playTechClick();
    setPowerGrid((prev) => {
      // Proposed change
      const otherAllocations = Object.keys(prev)
        .filter((k) => k !== system)
        .reduce((sum, k) => sum + prev[k as keyof PowerGrid], 0);

      // Max value we can allocate to this system without exceeding total
      const maxValue = TOTAL_POWER_LIMIT - otherAllocations;
      const finalValue = Math.min(value, Math.max(0, maxValue));

      return {
        ...prev,
        [system]: finalValue,
      };
    });
  };

  // Generate an SVG path for the wave based on engine and shield levels
  const generateWavePath = () => {
    const points: string[] = [];
    const width = 300;
    const height = 60;
    const segments = 40;
    
    // Wave properties determined by engine & shields power
    const amplitude = 5 + (powerGrid.engines / 10) * 12;
    const speedMultiplier = 1 + (powerGrid.weapons / 25);

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      // Combine multiple sine waves for rich futuristic signal feel
      const angle = (i / segments) * Math.PI * 4 * speedMultiplier + waveOffset;
      const y = height / 2 + Math.sin(angle) * amplitude + Math.cos(angle * 2.3) * (amplitude * 0.3);
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ');
  };

  return (
    <div id="system-diagnostics" className="relative p-6 rounded-2xl bg-cyber-gray/40 backdrop-blur-md border border-cyan-500/20 shadow-lg flex flex-col justify-between h-full overflow-hidden">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40"></div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-pink-500" />
            <h3 className="font-display text-sm tracking-wider uppercase text-pink-500">
              Grade de Distribuição de Energia
            </h3>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest ${
            powerRemaining <= 5 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
          }`}>
            DISP: {powerRemaining} MW
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="space-y-4 font-mono text-xs">
          {/* Shields */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Shield className="w-3.5 h-3.5" /> ESCUDOS DEFLETORES
              </span>
              <span className="text-cyan-400">{powerGrid.shields} MW</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="50"
                value={powerGrid.shields}
                onChange={(e) => handlePowerChange('shields', Number(e.target.value))}
                className="w-full accent-cyan-400 bg-cyber-dark/60 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 w-8 text-right">MAX 50</span>
            </div>
          </div>

          {/* Engines */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="flex items-center gap-1.5 text-pink-400">
                <Flame className="w-3.5 h-3.5" /> MOTORES DE DOBRA
              </span>
              <span className="text-pink-400">{powerGrid.engines} MW</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="50"
                value={powerGrid.engines}
                onChange={(e) => handlePowerChange('engines', Number(e.target.value))}
                className="w-full accent-pink-500 bg-cyber-dark/60 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 w-8 text-right">MAX 50</span>
            </div>
          </div>

          {/* Weapons */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Swords className="w-3.5 h-3.5" /> CANHÕES DE FASE
              </span>
              <span className="text-purple-400">{powerGrid.weapons} MW</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="50"
                value={powerGrid.weapons}
                onChange={(e) => handlePowerChange('weapons', Number(e.target.value))}
                className="w-full accent-purple-500 bg-cyber-dark/60 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 w-8 text-right">MAX 50</span>
            </div>
          </div>

          {/* Life Support */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Heart className="w-3.5 h-3.5" /> SUPORTE DE VIDA
              </span>
              <span className="text-emerald-400">{powerGrid.lifeSupport} MW</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5" // Keep minimum life support running!
                max="30"
                value={powerGrid.lifeSupport}
                onChange={(e) => handlePowerChange('lifeSupport', Number(e.target.value))}
                className="w-full accent-emerald-500 bg-cyber-dark/60 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 w-8 text-right">MAX 30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Signal / Telemetry Waveform */}
      <div className="mt-4 pt-4 border-t border-cyan-500/10">
        <div className="flex justify-between items-center mb-1 font-mono text-[10px] text-slate-400">
          <span>FREQUÊNCIA DE SINAL DA GRADE</span>
          <span className="text-pink-400 font-bold">MUTÁVEL</span>
        </div>
        <div className="relative bg-cyber-dark/80 rounded-xl h-20 flex items-center justify-center border border-cyan-500/10 overflow-hidden">
          {/* Animated SVG Path representing a modular wave oscillator */}
          <svg className="w-full h-full stroke-pink-500 fill-none" viewBox="0 0 300 60">
            <path
              d={generateWavePath()}
              strokeWidth="2"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
            />
          </svg>
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-cyber-dark/40 pointer-events-none"></div>
          {/* Subtle scanning horizontal bar */}
          <div className="absolute left-0 right-0 h-0.5 bg-cyan-400/20 top-1/2"></div>
        </div>
      </div>
    </div>
  );
}
