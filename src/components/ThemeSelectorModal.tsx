import React from 'react';
import { Check, Sparkles, X, Palette } from 'lucide-react';
import { ThemeId, ThemeConfig, APP_THEMES, ThemeLogo } from '../utils/theme';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export default function ThemeSelectorModal({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}: ThemeSelectorModalProps) {
  if (!isOpen) return null;

  const themesList = Object.values(APP_THEMES);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div 
        className="w-full max-w-xl rounded-2xl p-5 sm:p-6 shadow-2xl border transition-all duration-300 relative overflow-hidden"
        style={{
          backgroundColor: APP_THEMES[currentTheme].isLight ? '#FFFFFF' : '#0B0F19',
          borderColor: APP_THEMES[currentTheme].primary,
          boxShadow: `0 0 35px ${APP_THEMES[currentTheme].primaryGlow}`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-500/20 mb-4">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: APP_THEMES[currentTheme].badgeBg }}
            >
              <Palette className="w-4 h-4" style={{ color: APP_THEMES[currentTheme].primary }} />
            </div>
            <div>
              <h3 
                className="font-display font-black text-base sm:text-lg uppercase tracking-wider leading-none"
                style={{ color: APP_THEMES[currentTheme].isLight ? '#0F172A' : '#FFFFFF' }}
              >
                Escolher Design da Central
              </h3>
              <p 
                className="text-[10px] font-mono mt-1"
                style={{ color: APP_THEMES[currentTheme].isLight ? '#64748B' : '#94A3B8' }}
              >
                Personalize a paleta visual, ícones e atmosfera do Assistente Wit
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-zinc-700/50 hover:bg-zinc-800/40 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Fechar seletor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Themes List Grid */}
        <div className="space-y-2.5 max-h-[62vh] overflow-y-auto pr-1">
          {themesList.map((t) => {
            const isSelected = t.id === currentTheme;
            return (
              <div
                key={t.id}
                onClick={() => onSelectTheme(t.id)}
                className={`group p-3 sm:p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'shadow-md scale-[1.01]'
                    : 'hover:border-zinc-500/50 hover:scale-[1.005]'
                }`}
                style={{
                  backgroundColor: isSelected
                    ? (t.isLight ? '#FFF7ED' : 'rgba(255,255,255,0.06)')
                    : (APP_THEMES[currentTheme].isLight ? '#F8FAFC' : '#070A12'),
                  borderColor: isSelected ? t.primary : (APP_THEMES[currentTheme].isLight ? '#E2E8F0' : 'rgba(255,255,255,0.1)'),
                }}
              >
                {/* Left: Theme Logo & Info */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 shadow-sm"
                    style={{
                      backgroundColor: t.isLight ? '#FFFFFF' : t.bgPage,
                      borderColor: t.primary,
                      boxShadow: `0 0 12px ${t.primaryGlow}`,
                    }}
                  >
                    <ThemeLogo themeId={t.id} className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-display font-bold text-xs sm:text-sm tracking-wide"
                        style={{ color: APP_THEMES[currentTheme].isLight ? '#0F172A' : '#FFFFFF' }}
                      >
                        {t.name}
                      </span>
                      <span 
                        className="text-[9px] font-mono px-2 py-0.5 rounded-full border font-bold"
                        style={{
                          backgroundColor: t.badgeBg,
                          color: t.badgeText,
                          borderColor: t.badgeBorder,
                        }}
                      >
                        Logo: {t.logoName}
                      </span>
                    </div>
                    <p 
                      className="text-[10px] font-mono mt-0.5"
                      style={{ color: APP_THEMES[currentTheme].isLight ? '#64748B' : '#94A3B8' }}
                    >
                      {t.tagline}
                    </p>
                  </div>
                </div>

                {/* Right: Palette preview dots & Checkmark */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center -space-x-1">
                    {t.palettePreview.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border-2 border-zinc-900 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? 'text-white' : 'opacity-20 group-hover:opacity-60'
                    }`}
                    style={{ backgroundColor: isSelected ? t.primary : 'transparent' }}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <span className="w-2 h-2 rounded-full bg-zinc-500" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div 
          className="mt-4 pt-3 border-t border-zinc-500/20 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono"
          style={{ color: APP_THEMES[currentTheme].isLight ? '#64748B' : '#94A3B8' }}
        >
          <span>Nome padrão ativo: <strong style={{ color: APP_THEMES[currentTheme].primary }}>Assistente Wit</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg font-bold text-xs font-mono uppercase transition-all cursor-pointer shadow-sm text-white"
            style={{
              backgroundColor: APP_THEMES[currentTheme].primary,
            }}
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
}
