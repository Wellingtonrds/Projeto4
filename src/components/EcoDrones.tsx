import React, { useState } from "react";
import { playScannerSound, playTechClick } from "../utils/audio";

interface EcoDronesProps {
  visible?: boolean;
  onDroneInspect?: (name: string, status: string) => void;
}

export default function EcoDrones({
  visible = true,
  onDroneInspect,
}: EcoDronesProps) {
  const [activeToast, setActiveToast] = useState<{
    drone: string;
    telemetry: string;
    level: string;
  } | null>(null);

  const [toastTimeout, setToastTimeout] = useState<any>(null);

  if (!visible) return null;

  const handleDroneClick = (
    name: string,
    telemetry: string,
    level: string = "NORMAL"
  ) => {
    try {
      playScannerSound();
    } catch (_) {}

    if (onDroneInspect) {
      onDroneInspect(name, telemetry);
    }

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    setActiveToast({ drone: name, telemetry, level });
    const timer = setTimeout(() => {
      setActiveToast(null);
    }, 4500);
    setToastTimeout(timer);
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-25 overflow-hidden select-none"
      aria-hidden="true"
    >
      <style>{`
        @keyframes droneHoverAlfa {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-12px) translateX(8px) rotate(1.5deg); }
          50% { transform: translateY(-4px) translateX(-6px) rotate(-1deg); }
          75% { transform: translateY(-16px) translateX(4px) rotate(1deg); }
        }
        @keyframes droneHoverBeta {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-14px) translateX(-10px) rotate(-2deg); }
          66% { transform: translateY(-6px) translateX(8px) rotate(1.5deg); }
        }
        @keyframes droneHoverMicro {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes rotorSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scanLaserSweep {
          0%, 100% { opacity: 0.15; transform: scaleX(0.85) rotate(-3deg); }
          50% { opacity: 0.45; transform: scaleX(1.15) rotate(3deg); filter: drop-shadow(0 0 10px rgba(0, 255, 85, 0.6)); }
        }
        @keyframes ledBlinkFast {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes ionThrustPulse {
          0%, 100% { opacity: 0.5; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1.3); filter: drop-shadow(0 0 6px rgba(0, 255, 85, 0.9)); }
        }
        .drone-alfa {
          animation: droneHoverAlfa 9s ease-in-out infinite;
        }
        .drone-beta {
          animation: droneHoverBeta 11s ease-in-out infinite 1.5s;
        }
        .drone-micro {
          animation: droneHoverMicro 6.5s ease-in-out infinite 0.7s;
        }
        .rotor-fast {
          animation: rotorSpin 0.18s linear infinite;
        }
        .rotor-fast-rev {
          animation: rotorSpin 0.18s linear infinite reverse;
        }
        .scan-laser {
          animation: scanLaserSweep 4s ease-in-out infinite;
          transform-origin: top center;
        }
        .led-blink {
          animation: ledBlinkFast 1.2s ease-in-out infinite;
        }
        .ion-thrust {
          animation: ionThrustPulse 0.4s ease-in-out infinite;
          transform-origin: top center;
        }
      `}</style>

      {/* DRONE 1: DRONE MANGUEIRA ALFA (MG-01) - Patrulha Aérea do Dossel */}
      <div
        className="pointer-events-auto absolute top-16 left-4 sm:left-14 md:left-24 drone-alfa cursor-pointer group"
        onClick={() =>
          handleDroneClick(
            "Drone Mangueira MG-01 (Patrulha Alfa)",
            "Dossel Florestal Monitorado • Copa da Mangueira: Saudável • Oxigênio 99.8% • Umidade 86%"
          )
        }
        title="Toque para inspecionar Drone Mangueira MG-01"
      >
        <div className="relative flex flex-col items-center">
          {/* Holographic Radar / Downward Scan Beam */}
          <div className="absolute top-10 w-44 h-48 scan-laser pointer-events-none">
            <svg viewBox="0 0 160 180" className="w-full h-full fill-none">
              <defs>
                <linearGradient id="scanGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00FF55" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#10B981" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="80,0 15,180 145,180" fill="url(#scanGrad1)" />
              {/* Scanning horizontal slice line */}
              <line x1="30" y1="90" x2="130" y2="90" stroke="#00FF55" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <line x1="20" y1="140" x2="140" y2="140" stroke="#00FF55" strokeWidth="1.2" opacity="0.5" />
            </svg>
          </div>

          {/* Drone SVG Body */}
          <div className="relative w-28 h-14 sm:w-32 sm:h-16 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 160 70" className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {/* Outer Carbon Frame Arms */}
              <line x1="25" y1="28" x2="65" y2="35" stroke="#18181b" strokeWidth="5" strokeLinecap="round" />
              <line x1="25" y1="28" x2="65" y2="35" stroke="#00FF55" strokeWidth="1.5" strokeLinecap="round" />
              
              <line x1="135" y1="28" x2="95" y2="35" stroke="#18181b" strokeWidth="5" strokeLinecap="round" />
              <line x1="135" y1="28" x2="95" y2="35" stroke="#00FF55" strokeWidth="1.5" strokeLinecap="round" />

              {/* Rotors Left */}
              <circle cx="25" cy="24" r="14" stroke="#27272a" strokeWidth="1.5" fill="none" opacity="0.4" />
              <line x1="11" y1="24" x2="39" y2="24" stroke="#00FF55" strokeWidth="1.5" className="rotor-fast" style={{ transformOrigin: "25px 24px" }} />
              <circle cx="25" cy="24" r="3" fill="#00FF55" />

              {/* Rotors Right */}
              <circle cx="135" cy="24" r="14" stroke="#27272a" strokeWidth="1.5" fill="none" opacity="0.4" />
              <line x1="121" y1="24" x2="149" y2="24" stroke="#00FF55" strokeWidth="1.5" className="rotor-fast-rev" style={{ transformOrigin: "135px 24px" }} />
              <circle cx="135" cy="24" r="3" fill="#00FF55" />

              {/* Ion Thrusters Flame Below */}
              <polygon points="65,45 68,54 71,45" fill="#00FF55" className="ion-thrust" />
              <polygon points="89,45 92,54 95,45" fill="#00FF55" className="ion-thrust" />

              {/* Central Sleek Drone Fuselage (Fuselagem Biomimética) */}
              <path
                d="M50 35 C50 25, 60 18, 80 18 C100 18, 110 25, 110 35 C110 42, 98 48, 80 48 C62 48, 50 42, 50 35 Z"
                fill="#09090b"
                stroke="#27272a"
                strokeWidth="2"
              />
              {/* Cyber Green Accent Stripe */}
              <path
                d="M56 32 C65 24, 95 24, 104 32"
                stroke="#00FF55"
                strokeWidth="1.5"
                fill="none"
              />

              {/* Center Optical Sensor / Lente de Varredura */}
              <circle cx="80" cy="35" r="7" fill="#047857" stroke="#00FF55" strokeWidth="1.5" />
              <circle cx="80" cy="35" r="3.5" fill="#00FF55" className="animate-pulse" />
              <circle cx="81.5" cy="33.5" r="1.5" fill="#ffffff" />

              {/* Navigation Warning LEDs */}
              <circle cx="60" cy="38" r="1.8" fill="#EF4444" className="led-blink" />
              <circle cx="100" cy="38" r="1.8" fill="#06B6D4" className="led-blink" />
            </svg>
          </div>

          {/* Micro Telemetry Pill */}
          <div className="mt-1 flex items-center gap-1.5 bg-black/85 border border-[#00FF55]/40 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold text-zinc-300 shadow-[0_2px_8px_rgba(0,0,0,0.8)] backdrop-blur-sm group-hover:border-[#00FF55] group-hover:text-white transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF55] animate-ping" />
            <span className="text-[#00FF55] tracking-widest uppercase">MG-01</span>
            <span className="hidden sm:inline text-zinc-500">•</span>
            <span className="hidden sm:inline text-zinc-400">PATRULHA</span>
          </div>
        </div>
      </div>

      {/* DRONE 2: DRONE MANGUEIRA BETA (MG-02) - Sonda de Monitoramento Acústico & Ar */}
      <div
        className="pointer-events-auto absolute top-20 right-4 sm:right-12 md:right-28 drone-beta cursor-pointer group"
        onClick={() =>
          handleDroneClick(
            "Drone Mangueira MG-02 (Sonda Biocibernética)",
            "Acústica do Ambiente: Ativa • Reconhecimento de Voz Sintonizado • Conexão com Trepadeiras: 100%"
          )
        }
        title="Toque para inspecionar Drone Mangueira MG-02"
      >
        <div className="relative flex flex-col items-center">
          {/* Drone SVG Body */}
          <div className="relative w-24 h-12 sm:w-28 sm:h-14 group-hover:scale-110 transition-transform duration-300">
            <svg viewBox="0 0 140 60" className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {/* Slanted Aerodynamic Wings */}
              <polygon points="20,15 50,30 20,40" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
              <line x1="22" y1="27" x2="48" y2="27" stroke="#10B981" strokeWidth="1" />

              <polygon points="120,15 90,30 120,40" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
              <line x1="118" y1="27" x2="92" y2="27" stroke="#10B981" strokeWidth="1" />

              {/* Top Rotor Fan */}
              <line x1="50" y1="12" x2="90" y2="12" stroke="#00FF55" strokeWidth="1.5" className="rotor-fast" style={{ transformOrigin: "70px 12px" }} />
              <circle cx="70" cy="12" r="3" fill="#00FF55" />

              {/* Central Sphere / Sensor Core */}
              <circle cx="70" cy="30" r="16" fill="#09090b" stroke="#00FF55" strokeWidth="1.5" />
              <circle cx="70" cy="30" r="11" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
              
              {/* Radar ring inside */}
              <circle cx="70" cy="30" r="6" fill="#00FF55" className="animate-pulse" />
              <line x1="58" y1="30" x2="82" y2="30" stroke="#00FF55" strokeWidth="0.8" />
              <line x1="70" y1="18" x2="70" y2="42" stroke="#00FF55" strokeWidth="0.8" />

              {/* Dual Antenna probes */}
              <line x1="62" y1="16" x2="56" y2="6" stroke="#00FF55" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="56" cy="5" r="1.5" fill="#34D399" />
              <line x1="78" y1="16" x2="84" y2="6" stroke="#00FF55" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="84" cy="5" r="1.5" fill="#34D399" />
            </svg>
          </div>

          {/* Micro Telemetry Pill */}
          <div className="mt-1 flex items-center gap-1.5 bg-black/85 border border-cyan-500/40 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold text-zinc-300 shadow-[0_2px_8px_rgba(0,0,0,0.8)] backdrop-blur-sm group-hover:border-cyan-400 group-hover:text-white transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400 tracking-widest uppercase">MG-02</span>
            <span className="hidden sm:inline text-zinc-500">•</span>
            <span className="hidden sm:inline text-zinc-400">SONDA</span>
          </div>
        </div>
      </div>

      {/* DRONE 3: MICRO-DRONE POLINIZADOR E SENTINELA (MG-03) - Próximo às Trepadeiras */}
      <div
        className="pointer-events-auto hidden md:block absolute bottom-28 left-8 drone-micro cursor-pointer group"
        onClick={() =>
          handleDroneClick(
            "Micro-Drone Mangueira MG-03 (Sentinela Botânico)",
            "Polinização Sintética Ativa • Preservação das Trepadeiras e Mangueiras • Biodiversidade Micelial: 100%"
          )
        }
        title="Toque para inspecionar Micro-Drone MG-03"
      >
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-10 group-hover:scale-125 transition-transform duration-300">
            <svg viewBox="0 0 80 50" className="w-full h-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {/* Drone Body */}
              <circle cx="40" cy="25" r="10" fill="#09090b" stroke="#10B981" strokeWidth="1.5" />
              <circle cx="40" cy="25" r="5" fill="#F59E0B" className="animate-pulse" />
              
              {/* Tiny insectoid wings / micro thrusters */}
              <ellipse cx="28" cy="18" rx="8" ry="3" fill="#00FF55" opacity="0.7" className="rotor-fast" style={{ transformOrigin: "32px 20px" }} />
              <ellipse cx="52" cy="18" rx="8" ry="3" fill="#00FF55" opacity="0.7" className="rotor-fast-rev" style={{ transformOrigin: "48px 20px" }} />
              <ellipse cx="28" cy="32" rx="8" ry="3" fill="#00FF55" opacity="0.7" className="rotor-fast" style={{ transformOrigin: "32px 30px" }} />
              <ellipse cx="52" cy="32" rx="8" ry="3" fill="#00FF55" opacity="0.7" className="rotor-fast-rev" style={{ transformOrigin: "48px 30px" }} />
            </svg>
          </div>

          <div className="flex items-center gap-1 bg-black/80 border border-emerald-500/30 px-1.5 py-0.5 rounded-full text-[7px] font-mono text-emerald-400">
            <span>MG-03 SENTINELA</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE TOAST HUD MODAL (quando o usuário clica em qualquer drone) */}
      {activeToast && (
        <div className="pointer-events-auto fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92vw] sm:w-auto animate-fade-in">
          <div className="bg-zinc-950/95 border-2 border-[#00FF55] p-3.5 sm:p-4 rounded-2xl shadow-[0_0_25px_rgba(0,255,85,0.35)] backdrop-blur-md flex items-start gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-black border border-[#00FF55]/60 flex items-center justify-center shrink-0 text-[#00FF55]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF55] animate-ping" />
            </div>
            <div className="space-y-1 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase text-[#00FF55] tracking-wider">
                  {activeToast.drone}
                </span>
                <span className="text-[8px] font-mono bg-[#00FF55]/15 text-[#00FF55] px-1.5 py-0.2 rounded font-bold uppercase border border-[#00FF55]/30">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-200 leading-snug">
                {activeToast.telemetry}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveToast(null)}
              className="text-zinc-500 hover:text-white text-xs font-mono font-bold p-1 shrink-0 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
