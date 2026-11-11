import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldAlert, Cpu, RefreshCw, AlertTriangle } from 'lucide-react';
import { playTechClick, playBeep, playSuccess, playError } from '../utils/audio';

interface QuantumCoreProps {
  coreStability: number;
  setCoreStability: React.Dispatch<React.SetStateAction<number>>;
  alertLevel: 'NORMAL' | 'WARNING' | 'CRITICAL';
  addLog: (source: 'SYSTEM' | 'TACTICAL' | 'NAVIGATION' | 'COMMS', message: string, type: 'INFO' | 'WARN' | 'ALERT') => void;
}

export default function QuantumCore({
  coreStability,
  setCoreStability,
  alertLevel,
  addLog,
}: QuantumCoreProps) {
  const [frequency, setFrequency] = useState(440); // THz
  const [containment, setContainment] = useState(98.4); // %
  const [isOvercharged, setIsOvercharged] = useState(false);
  const [isVenting, setIsVenting] = useState(false);

  // Core fluctuation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCoreStability((prev) => {
        // Naturally drift
        let drift = (Math.random() - 0.5) * 1.5;
        if (isOvercharged) {
          drift -= 1.8; // Decreases stability fast when overcharged
        }
        if (isVenting) {
          drift += 2.5; // Increases stability fast when venting
        }
        
        const next = Math.max(10, Math.min(100, prev + drift));
        
        // Log alerts when stability crosses thresholds
        if (prev >= 80 && next < 80) {
          addLog('SYSTEM', 'Estabilidade do Núcleo Quântico abaixo de 80%!', 'WARN');
        }
        if (prev >= 40 && next < 40) {
          addLog('SYSTEM', 'ALERTA CRÍTICO: Falha catastrófica iminente no reator!', 'ALERT');
        }
        
        return Number(next.toFixed(1));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isOvercharged, isVenting]);

  const handleOvercharge = () => {
    if (isOvercharged) {
      setIsOvercharged(false);
      addLog('SYSTEM', 'Modo de Sobrecarga Quântica desativado.', 'INFO');
      playTechClick();
    } else {
      setIsOvercharged(true);
      addLog('SYSTEM', 'Modo de Sobrecarga Quântica ATIVADO! Gerando energia extra.', 'WARN');
      playBeep(900, 0.3, 'sawtooth');
    }
  };

  const handleVentPlasma = () => {
    if (isVenting) return;
    setIsVenting(true);
    addLog('SYSTEM', 'Iniciando purga de plasma superaquecido do núcleo...', 'INFO');
    playBeep(300, 0.8, 'triangle');
    
    setTimeout(() => {
      setIsVenting(false);
      setCoreStability((prev) => Math.min(100, prev + 25));
      addLog('SYSTEM', 'Purga de plasma concluída. Reator resfriado.', 'INFO');
      playSuccess();
    }, 3000);
  };

  // Determine glow color based on stability and state
  const getGlowColor = () => {
    if (coreStability < 40) return 'rgba(255, 0, 127, 0.7)'; // Magenta / Red
    if (coreStability < 75) return 'rgba(234, 179, 8, 0.7)'; // Yellow
    if (isOvercharged) return 'rgba(157, 78, 221, 0.8)'; // Purple / Overcharged
    return 'rgba(0, 240, 255, 0.7)'; // Cyber Blue
  };

  return (
    <div id="quantum-core" className="relative p-6 rounded-2xl bg-cyber-gray/40 backdrop-blur-md border border-cyan-500/20 shadow-lg flex flex-col justify-between h-full overflow-hidden">
      {/* Laser decoration grids */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40"></div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h3 className="font-display text-sm tracking-wider uppercase text-cyan-400">
              Reator de Fusão Quântica
            </h3>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest ${
            coreStability < 40 ? 'bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/30' :
            coreStability < 75 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}>
            STB: {coreStability}%
          </span>
        </div>

        {/* Dynamic Core Visualizer */}
        <div className="flex justify-center items-center py-6 relative">
          {/* Animated Energy Rings */}
          <motion.div
            className="w-40 h-40 rounded-full border border-dashed flex items-center justify-center relative"
            style={{ 
              borderColor: getGlowColor(),
              boxShadow: `0 0 30px ${getGlowColor()}`
            }}
            animate={{ rotate: isOvercharged ? 360 : -360 }}
            transition={{
              repeat: Infinity,
              duration: isOvercharged ? 2 : coreStability < 50 ? 4 : 8,
              ease: "linear"
            }}
          >
            {/* Core Center Orb */}
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center relative bg-cyber-dark"
              style={{
                border: `2px solid ${getGlowColor()}`,
                boxShadow: `inset 0 0 20px ${getGlowColor()}`
              }}
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: isOvercharged ? 0.4 : coreStability < 50 ? 0.8 : 1.5,
                ease: "easeInOut"
              }}
            >
              <Zap className="w-8 h-8 text-white drop-shadow" style={{ color: getGlowColor() }} />
            </motion.div>

            {/* Orbiting particles */}
            <div className="absolute top-2 left-1/2 -ml-1 w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
            <div className="absolute bottom-2 left-1/2 -ml-1 w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
            <div className="absolute left-2 top-1/2 -mt-1 w-2.5 h-2.5 rounded-full bg-pink-400"></div>
            <div className="absolute right-2 top-1/2 -mt-1 w-2.5 h-2.5 rounded-full bg-pink-400"></div>
          </motion.div>

          {/* Status Overlay */}
          <div className="absolute text-center bg-cyber-dark/80 px-3 py-1 rounded-md border border-cyan-500/10 backdrop-blur-sm pointer-events-none">
            <span className="font-mono text-xs tracking-wider uppercase text-slate-400 block">Frequência</span>
            <span className="font-mono text-sm font-bold text-cyan-300">{frequency} THz</span>
          </div>
        </div>

        {/* Telemetry Metrics Slider */}
        <div className="space-y-4 my-4 font-mono text-xs">
          <div>
            <div className="flex justify-between mb-1 text-slate-400">
              <span>Sincronia Harmônica</span>
              <span className="text-cyan-400">{frequency} THz</span>
            </div>
            <input
              type="range"
              min="100"
              max="990"
              step="10"
              value={frequency}
              onChange={(e) => {
                setFrequency(Number(e.target.value));
                playTechClick();
              }}
              className="w-full accent-cyan-400 bg-cyber-dark/60 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1 text-slate-400">
              <span>Grade de Contenção Magnética</span>
              <span className="text-pink-400">{containment}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="0.5"
              value={containment}
              onChange={(e) => {
                setContainment(Number(e.target.value));
                playTechClick();
              }}
              className="w-full accent-pink-500 bg-cyber-dark/60 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          onClick={handleOvercharge}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-display text-[11px] tracking-wider uppercase border transition-all ${
            isOvercharged
              ? 'bg-purple-600/30 border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
              : 'bg-cyber-dark/80 border-purple-500/30 text-purple-400 hover:border-purple-400/60'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          {isOvercharged ? 'SOBRECARREGADO' : 'SOBRECARGA'}
        </button>

        <button
          onClick={handleVentPlasma}
          disabled={isVenting}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-display text-[11px] tracking-wider uppercase border transition-all ${
            isVenting
              ? 'bg-rose-600/30 border-rose-500 text-rose-300 animate-pulse'
              : 'bg-cyber-dark/80 border-rose-500/30 text-rose-400 hover:border-rose-400/60'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isVenting ? 'animate-spin' : ''}`} />
          {isVenting ? 'PURGANDO...' : 'PURGAR PLASMA'}
        </button>
      </div>
    </div>
  );
}
