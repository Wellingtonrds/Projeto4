import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Radio, Target, Zap, ShieldAlert } from 'lucide-react';
import { playTechClick, playBeep, playScannerSound, playWarpCharge, playSuccess, playError } from '../utils/audio';

interface StarSector {
  name: string;
  sector: string;
  x: number; // 0-100
  y: number; // 0-100
  type: 'PLANET' | 'STATION' | 'ANOMALY' | 'STAR';
  description: string;
  hazards: 'NONE' | 'MEDIUM' | 'EXTREME';
}

const SECTORS: StarSector[] = [
  { name: 'SOL-III (Terra)', sector: 'SEC-01', x: 50, y: 50, type: 'PLANET', description: 'Berço da humanidade. Setor calmo e seguro.', hazards: 'NONE' },
  { name: 'Sistemas Alpha Centauri', sector: 'SEC-05', x: 65, y: 35, type: 'STAR', description: 'Sistemas estelares triplos com intensa atividade solar.', hazards: 'NONE' },
  { name: 'Nébula de Órion', sector: 'SEC-12', x: 25, y: 70, type: 'ANOMALY', description: 'Nuvem molecular densa. Escudos altamente recomendados.', hazards: 'MEDIUM' },
  { name: 'Kepler-186f', sector: 'SEC-28', x: 80, y: 80, type: 'PLANET', description: 'Zona habitável de exoplanetas ricos em silicato.', hazards: 'NONE' },
  { name: 'Estação Espacial Aegis', sector: 'SEC-42', x: 30, y: 25, type: 'STATION', description: 'Entreposto comercial da Federação das Nações Estelares.', hazards: 'NONE' },
  { name: 'Buraco Negro Sgr A*', sector: 'SEC-99', x: 15, y: 15, type: 'ANOMALY', description: 'Singularidade supermassiva no centro galáctico.', hazards: 'EXTREME' },
];

interface StarMapProps {
  currentSector: string;
  setCurrentSector: (sector: string) => void;
  warpDriveReady: boolean;
  addLog: (source: 'SYSTEM' | 'TACTICAL' | 'NAVIGATION' | 'COMMS', message: string, type: 'INFO' | 'WARN' | 'ALERT') => void;
  setCoreStability: React.Dispatch<React.SetStateAction<number>>;
  setAlertLevel: (level: 'NORMAL' | 'WARNING' | 'CRITICAL') => void;
}

export default function StarMap({
  currentSector,
  setCurrentSector,
  warpDriveReady,
  addLog,
  setCoreStability,
  setAlertLevel,
}: StarMapProps) {
  const [selectedSector, setSelectedSector] = useState<StarSector>(SECTORS[0]);
  const [isJumping, setIsJumping] = useState(false);
  const [radarAngle, setRadarAngle] = useState(0);

  // Rotate radar sweep
  useState(() => {
    const interval = setInterval(() => {
      setRadarAngle((prev) => (prev + 3) % 360);
    }, 30);
    return () => clearInterval(interval);
  });

  const handleSelectSector = (sec: StarSector) => {
    setSelectedSector(sec);
    playScannerSound();
    addLog('NAVIGATION', `Coordenadas travadas: ${sec.name} (${sec.sector})`, 'INFO');
  };

  const handleWarpJump = () => {
    if (selectedSector.sector === currentSector) {
      playError();
      addLog('NAVIGATION', 'Erro de Dobra: Já estamos no destino selecionado.', 'WARN');
      return;
    }
    
    if (!warpDriveReady) {
      playError();
      addLog('NAVIGATION', 'Dobra impossível: Energia de dobra insuficiente na grade!', 'ALERT');
      return;
    }

    setIsJumping(true);
    addLog('NAVIGATION', `Iniciando carregamento das bobinas de dobra... Destino: ${selectedSector.name}`, 'INFO');
    playWarpCharge();

    setTimeout(() => {
      // Transition to new sector
      setCurrentSector(selectedSector.sector);
      setIsJumping(false);
      playSuccess();
      
      // Affect stability slightly depending on distance / gravity
      const stabilityImpact = selectedSector.hazards === 'EXTREME' ? 30 : selectedSector.hazards === 'MEDIUM' ? 15 : 5;
      setCoreStability((prev) => Math.max(10, prev - stabilityImpact));

      addLog('NAVIGATION', `Salto de dobra concluído com sucesso! Chegamos a ${selectedSector.name}.`, 'INFO');

      if (selectedSector.hazards === 'EXTREME') {
        setAlertLevel('CRITICAL');
        addLog('TACTICAL', 'ALERTA MÁXIMO: Radiação gravitacional perigosa detectada perto do buraco negro!', 'ALERT');
      } else if (selectedSector.hazards === 'MEDIUM') {
        setAlertLevel('WARNING');
        addLog('TACTICAL', 'Alerta: Escudos sob pressão moderada devido à nébula cósmica.', 'WARN');
      } else {
        setAlertLevel('NORMAL');
      }
    }, 2000);
  };

  return (
    <div id="star-map" className="relative p-6 rounded-2xl bg-cyber-gray/40 backdrop-blur-md border border-cyan-500/20 shadow-lg flex flex-col justify-between h-full overflow-hidden">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40"></div>

      {/* Jumping Overlay Animation */}
      <AnimatePresence>
        {isJumping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center scanline"
          >
            <div className="text-center space-y-4">
              <motion.div
                className="w-16 h-16 rounded-full border-t-4 border-b-4 border-cyan-400 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
              />
              <div className="font-display text-lg text-cyan-400 tracking-widest animate-pulse uppercase">
                DOBRA ESTELAR ATIVA
              </div>
              <div className="font-mono text-xs text-cyan-300/60 max-w-xs px-4">
                Distorcendo tecido espaço-temporal. Estabilidade do núcleo em risco.
              </div>
            </div>
            
            {/* Speed line vectors */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${50 + Math.random() * 150}px`,
                    height: '1px',
                    opacity: 0.3 + Math.random() * 0.5,
                    animation: `hologram-flicker ${0.2 + Math.random() * 0.4}s infinite`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display text-sm tracking-wider uppercase text-cyan-400">
              Navegação Galáctica e Radar
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            LOCAL: {SECTORS.find((s) => s.sector === currentSector)?.name.split(' ')[0] || currentSector}
          </span>
        </div>

        {/* Map Grid Container */}
        <div className="relative aspect-square w-full bg-cyber-dark/80 rounded-2xl border border-cyan-500/10 overflow-hidden group">
          {/* Radar Sweep Circle Background */}
          <div className="absolute inset-4 rounded-full border border-cyan-500/5 flex items-center justify-center">
            <div className="w-4/5 h-4/5 rounded-full border border-cyan-500/10 flex items-center justify-center">
              <div className="w-3/5 h-3/5 rounded-full border border-cyan-500/10 flex items-center justify-center">
                <div className="w-2/5 h-2/5 rounded-full border border-cyan-500/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 grid-bg pointer-events-none opacity-40"></div>

          {/* Radar Sweep Line */}
          <div
            className="absolute inset-0 origin-center pointer-events-none bg-gradient-to-r from-cyan-400/20 via-transparent to-transparent"
            style={{
              transform: `rotate(${radarAngle}deg)`,
              clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)',
            }}
          />

          {/* Sector Nodes */}
          {SECTORS.map((sec) => {
            const isCurrent = sec.sector === currentSector;
            const isSelected = sec.sector === selectedSector.sector;
            
            return (
              <button
                key={sec.sector}
                onClick={() => handleSelectSector(sec)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${sec.x}%`, top: `${sec.y}%` }}
              >
                {/* Visual pulse for selection/current */}
                {(isCurrent || isSelected) && (
                  <span className={`absolute -inset-3 rounded-full animate-ping opacity-70 ${isCurrent ? 'bg-emerald-400/30' : 'bg-cyan-400/30'}`}></span>
                )}
                
                {/* Node dot */}
                <div
                  className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-all ${
                    isCurrent
                      ? 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]'
                      : isSelected
                      ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                      : 'bg-cyber-gray/80 border-cyan-500/40 hover:border-cyan-400'
                  }`}
                >
                  {sec.type === 'ANOMALY' ? (
                    <Radio className="w-2.5 h-2.5 text-white" />
                  ) : sec.type === 'PLANET' ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  ) : (
                    <div className="w-1.5 h-1.5 rotate-45 bg-white"></div>
                  )}
                </div>

                {/* Micro Label */}
                <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-cyber-dark/90 px-1.5 py-0.5 rounded text-[9px] font-mono tracking-tight text-slate-300 border border-cyan-500/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {sec.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Sector Telemetry Info */}
      <div className="mt-4 p-4 rounded-xl bg-cyber-dark/80 border border-cyan-500/10 font-mono text-xs space-y-2">
        <div className="flex justify-between border-b border-cyan-500/10 pb-1.5">
          <span className="text-slate-400">COORDENADAS SELECIONADAS:</span>
          <span className="text-cyan-400 font-bold">{selectedSector.sector}</span>
        </div>
        <div className="text-slate-300 font-sans text-[11px] leading-relaxed">
          <strong>{selectedSector.name}</strong> - {selectedSector.description}
        </div>
        
        <div className="flex justify-between items-center text-[10px] pt-1">
          <span className="text-slate-400">NÍVEL DE AMEAÇA:</span>
          <span className={`font-bold ${
            selectedSector.hazards === 'EXTREME' ? 'text-rose-500 animate-pulse' :
            selectedSector.hazards === 'MEDIUM' ? 'text-amber-500' :
            'text-emerald-400'
          }`}>
            {selectedSector.hazards === 'EXTREME' ? '☢ CRÍTICO (BURACO NEGRO)' :
             selectedSector.hazards === 'MEDIUM' ? '▲ MODERADO' :
             '✔ SEGURO'}
          </span>
        </div>

        {/* Warp Jump Action */}
        <button
          onClick={handleWarpJump}
          disabled={isJumping}
          className={`w-full mt-3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-display text-xs tracking-wider uppercase border transition-all ${
            warpDriveReady
              ? 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400 text-cyan-300 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-cyber-dark/50 border-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Zap className="w-4 h-4" />
          {selectedSector.sector === currentSector ? 'JÁ INSTALADO NESTAS COORDENADAS' : 'INICIAR DOBRA ESTELAR'}
        </button>
      </div>
    </div>
  );
}
