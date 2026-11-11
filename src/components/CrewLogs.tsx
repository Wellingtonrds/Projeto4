import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { LogEntry, AlertLevel } from '../types';
import { playTechClick, playSuccess, playError, playBeep } from '../utils/audio';

interface CrewLogsProps {
  logs: LogEntry[];
  addLog: (source: 'SYSTEM' | 'TACTICAL' | 'NAVIGATION' | 'COMMS', message: string, type: 'INFO' | 'WARN' | 'ALERT') => void;
  setAlertLevel: (level: AlertLevel) => void;
  setCoreStability: React.Dispatch<React.SetStateAction<number>>;
  setPowerGrid: React.Dispatch<React.SetStateAction<any>>;
}

export default function CrewLogs({
  logs,
  addLog,
  setAlertLevel,
  setCoreStability,
  setPowerGrid,
}: CrewLogsProps) {
  const [terminalInput, setTerminalInput] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll logs to bottom whenever they update
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    setTerminalInput('');
    playTechClick();

    addLog('COMMS', `> ${terminalInput}`, 'INFO');

    // Simple terminal parsing
    setTimeout(() => {
      if (cmd === '/help' || cmd === 'help') {
        addLog('SYSTEM', 'COMANDOS DISPONÍVEIS: \n - /alerta [normal|warning|critical] \n - /nuclear [reset|estabilidade] \n - /carga [max] \n - /scan (Escanear setor atual) \n - /clear (Limpar console)', 'INFO');
        playSuccess();
      } else if (cmd.startsWith('/alerta ')) {
        const level = cmd.substring(8).toUpperCase();
        if (level === 'NORMAL' || level === 'WARNING' || level === 'CRITICAL') {
          setAlertLevel(level as AlertLevel);
          addLog('SYSTEM', `Nível de alerta do sistema modificado para ${level}.`, 'INFO');
          playBeep(level === 'CRITICAL' ? 440 : 800, 0.4, 'sawtooth');
        } else {
          addLog('SYSTEM', 'Erro: Nível de alerta desconhecido. Escolha entre normal, warning ou critical.', 'WARN');
          playError();
        }
      } else if (cmd === '/nuclear reset') {
        setCoreStability(100);
        addLog('SYSTEM', 'Estabilidade do Núcleo Quântico reiniciada para 100%. Grid estabilizado.', 'INFO');
        playSuccess();
      } else if (cmd === '/nuclear estabilidade') {
        addLog('SYSTEM', `Informação de diagnóstico: Integridade atual do núcleo estabilizada.`, 'INFO');
        playBeep(600, 0.2);
      } else if (cmd === '/carga max') {
        setPowerGrid({ shields: 30, engines: 30, weapons: 30, lifeSupport: 10 });
        addLog('SYSTEM', 'Grade de energia reconfigurada com equilíbrio máximo ideal.', 'INFO');
        playSuccess();
      } else if (cmd === '/scan') {
        addLog('TACTICAL', 'Escaneando arredores astronômicos... Nenhum inimigo detectado. Radiação cósmica estável.', 'INFO');
        playSuccess();
      } else if (cmd === '/clear') {
        // Can't easily clear the prop logs, so we just log a message
        addLog('SYSTEM', 'Histórico de console redefinido.', 'INFO');
      } else {
        addLog('SYSTEM', `Comando desconhecido: "${cmd}". Digite /help para ver os comandos válidos.`, 'WARN');
        playError();
      }
    }, 300);
  };

  return (
    <div id="crew-logs" className="relative p-6 rounded-2xl bg-cyber-gray/40 backdrop-blur-md border border-cyan-500/20 shadow-lg flex flex-col justify-between h-full overflow-hidden">
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40"></div>

      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-cyan-500/10 pb-2">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="font-display text-sm tracking-wider uppercase text-cyan-400">
                Console de Comando Crew-AI
              </h3>
            </div>
            <span className="text-[9px] font-mono text-cyan-400/60 tracking-wider">
              ONLINE - CANAL TACTICAL-01
            </span>
          </div>

          {/* Scrolling Logs Feed */}
          <div className="space-y-2.5 h-[230px] overflow-y-auto pr-2 font-mono text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-cyan-500/10">
            {logs.map((log) => {
              const isAlert = log.type === 'ALERT';
              const isWarn = log.type === 'WARN';
              
              return (
                <div
                  key={log.id}
                  className={`p-2 rounded border transition-colors ${
                    isAlert
                      ? 'bg-red-500/10 border-red-500/30 text-rose-300'
                      : isWarn
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-cyber-dark/50 border-cyan-500/5 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1 text-[9px] text-slate-500">
                    <span className="font-bold">[{log.source}]</span>
                    <span>{log.timestamp}</span>
                  </div>
                  <div className="whitespace-pre-line">{log.message}</div>
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* Terminal Input Form */}
        <form onSubmit={handleCommandSubmit} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Digite comando... (/help para ajuda)"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="w-full bg-cyber-dark/95 text-cyan-300 font-mono text-xs placeholder-cyan-500/40 py-2.5 pl-4 pr-10 rounded-xl border border-cyan-500/20 focus:border-cyan-400/60 focus:outline-none transition-all focus:shadow-[0_0_10px_rgba(0,240,255,0.15)]"
            />
            <TerminalIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/40" />
          </div>
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400 transition-all shadow-[0_0_10px_rgba(6,182,212,0.15)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
