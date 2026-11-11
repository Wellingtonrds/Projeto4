import React from 'react';

export type ThemeId = 'black-purple' | 'blue-black' | 'green-black' | 'white-orange' | 'gold-night';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  isLight: boolean;
  logoName: string;
  // Primary CSS color codes
  primary: string;
  primaryHover: string;
  primaryGlow: string;
  bgPage: string;
  bgHeader: string;
  cardBg: string;
  cardBorder: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentEmoji: string;
  palettePreview: string[];
}

export const APP_THEMES: Record<ThemeId, ThemeConfig> = {
  'black-purple': {
    id: 'black-purple',
    name: 'Preto & Roxo',
    tagline: 'Ramos Noturnos e Violeta Bioluminescente',
    isLight: false,
    logoName: 'Ramos',
    primary: '#A855F7',
    primaryHover: '#C084FC',
    primaryGlow: 'rgba(168, 85, 247, 0.45)',
    bgPage: '#09070F',
    bgHeader: 'rgba(14, 10, 24, 0.92)',
    cardBg: '#130E22',
    cardBorder: 'rgba(168, 85, 247, 0.25)',
    textHeading: '#F3E8FF',
    textBody: '#E9D5FF',
    textMuted: '#A855F7',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeText: '#D8B4FE',
    badgeBorder: 'rgba(168, 85, 247, 0.35)',
    accentEmoji: '🌿',
    palettePreview: ['#09070F', '#130E22', '#A855F7', '#C084FC']
  },
  'blue-black': {
    id: 'blue-black',
    name: 'Azul & Preto',
    tagline: 'Floco de Neve e Ciano Glacial',
    isLight: false,
    logoName: 'Floco de Neve',
    primary: '#00F0FF',
    primaryHover: '#38BDF8',
    primaryGlow: 'rgba(0, 240, 255, 0.45)',
    bgPage: '#040812',
    bgHeader: 'rgba(6, 13, 26, 0.92)',
    cardBg: '#0A1428',
    cardBorder: 'rgba(0, 240, 255, 0.25)',
    textHeading: '#F0F9FF',
    textBody: '#BAE6FD',
    textMuted: '#38BDF8',
    badgeBg: 'rgba(0, 240, 255, 0.12)',
    badgeText: '#7DD3FC',
    badgeBorder: 'rgba(0, 240, 255, 0.35)',
    accentEmoji: '❄️',
    palettePreview: ['#040812', '#0A1428', '#00F0FF', '#38BDF8']
  },
  'green-black': {
    id: 'green-black',
    name: 'Verde & Preto',
    tagline: 'Árvore da Taiga e Esmeralda Cibernética',
    isLight: false,
    logoName: 'Árvore',
    primary: '#00FF55',
    primaryHover: '#10B981',
    primaryGlow: 'rgba(0, 255, 85, 0.45)',
    bgPage: '#080A08',
    bgHeader: 'rgba(10, 15, 10, 0.92)',
    cardBg: '#0F1610',
    cardBorder: 'rgba(0, 255, 85, 0.25)',
    textHeading: '#F0FDF4',
    textBody: '#BBF7D0',
    textMuted: '#4ADE80',
    badgeBg: 'rgba(0, 255, 85, 0.12)',
    badgeText: '#86EFAC',
    badgeBorder: 'rgba(0, 255, 85, 0.35)',
    accentEmoji: '🌲',
    palettePreview: ['#080A08', '#0F1610', '#00FF55', '#10B981']
  },
  'white-orange': {
    id: 'white-orange',
    name: 'Branca & Laranja',
    tagline: 'Raposa da Neve e Âmbar Solar',
    isLight: true,
    logoName: 'Raposa',
    primary: '#EA580C',
    primaryHover: '#F97316',
    primaryGlow: 'rgba(234, 88, 12, 0.35)',
    bgPage: '#F8FAFC',
    bgHeader: 'rgba(255, 255, 255, 0.95)',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(234, 88, 12, 0.22)',
    textHeading: '#0F172A',
    textBody: '#334155',
    textMuted: '#64748B',
    badgeBg: 'rgba(234, 88, 12, 0.10)',
    badgeText: '#C2410C',
    badgeBorder: 'rgba(234, 88, 12, 0.30)',
    accentEmoji: '🦊',
    palettePreview: ['#F8FAFC', '#FFFFFF', '#EA580C', '#F97316']
  },
  'gold-night': {
    id: 'gold-night',
    name: 'Dourado & Noite',
    tagline: 'Aurora Boreal e Estrela Polar',
    isLight: false,
    logoName: 'Estrela Polar',
    primary: '#F59E0B',
    primaryHover: '#FBBF24',
    primaryGlow: 'rgba(245, 158, 11, 0.45)',
    bgPage: '#070A14',
    bgHeader: 'rgba(10, 16, 31, 0.92)',
    cardBg: '#0F182E',
    cardBorder: 'rgba(245, 158, 11, 0.25)',
    textHeading: '#FFFBEB',
    textBody: '#FDE68A',
    textMuted: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.14)',
    badgeText: '#FCD34D',
    badgeBorder: 'rgba(245, 158, 11, 0.35)',
    accentEmoji: '✨',
    palettePreview: ['#070A14', '#0F182E', '#F59E0B', '#14B8A6']
  }
};

/**
 * Dedicated Vector Logo for each theme
 */
export function ThemeLogo({ themeId, className = "w-6 h-6" }: { themeId: ThemeId; className?: string }) {
  switch (themeId) {
    case 'black-purple':
      // Ramos com folhas e nós botânicos
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 34 C12 26, 18 20, 24 14 C28 10, 32 8, 34 6"
            stroke="#A855F7"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* Folha 1 */}
          <path
            d="M16 23 C14 17, 18 14, 21 16 C22 19, 19 22, 16 23 Z"
            fill="#C084FC"
            stroke="#A855F7"
            strokeWidth="1.2"
          />
          {/* Folha 2 */}
          <path
            d="M23 15 C24 9, 29 8, 30 11 C30 14, 26 15, 23 15 Z"
            fill="#E9D5FF"
            stroke="#C084FC"
            strokeWidth="1.2"
          />
          {/* Folha 3 (oposta) */}
          <path
            d="M13 28 C9 27, 7 22, 10 20 C13 20, 14 25, 13 28 Z"
            fill="#9333EA"
            stroke="#C084FC"
            strokeWidth="1.2"
          />
          {/* Brotos bioluminescentes */}
          <circle cx="34" cy="6" r="2.5" fill="#E9D5FF" />
          <circle cx="21" cy="16" r="1.5" fill="#FFFFFF" />
          <circle cx="10" cy="20" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'blue-black':
      // Floco de Neve Cristalino
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Eixo Vertical */}
          <line x1="20" y1="4" x2="20" y2="36" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Eixo Horizontal */}
          <line x1="4" y1="20" x2="36" y2="20" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Diagonais */}
          <line x1="8.7" y1="8.7" x2="31.3" y2="31.3" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          <line x1="31.3" y1="8.7" x2="8.7" y2="31.3" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          
          {/* Cristais radiais */}
          <path d="M16 10 L20 14 L24 10" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M16 30 L20 26 L24 30" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M10 16 L14 20 L10 24" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M30 16 L26 20 L30 24" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Núcleo de Gelo */}
          <circle cx="20" cy="20" r="3.2" fill="#FFFFFF" stroke="#00F0FF" strokeWidth="1.5" />
        </svg>
      );

    case 'green-black':
      // Árvore Pinheiro da Taiga
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Copa Camada Superior */}
          <polygon points="20,5 12,17 28,17" fill="#00FF55" stroke="#10B981" strokeWidth="1.2" />
          {/* Copa Camada Média */}
          <polygon points="20,13 9,25 31,25" fill="#059669" stroke="#00FF55" strokeWidth="1.2" />
          {/* Copa Camada Inferior */}
          <polygon points="20,20 6,32 34,32" fill="#047857" stroke="#00FF55" strokeWidth="1.2" />
          {/* Tronco */}
          <rect x="17.5" y="32" width="5" height="5" rx="1" fill="#78350F" />
          {/* Estrela/Brilho no topo */}
          <circle cx="20" cy="5" r="1.8" fill="#FFFFFF" />
        </svg>
      );

    case 'white-orange':
      // Raposa da Neve (Geométrica / Estilizada)
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Orelha Esquerda */}
          <polygon points="12,7 6,21 16,19" fill="#EA580C" stroke="#C2410C" strokeWidth="1.2" />
          <polygon points="11,10 8,19 14,18" fill="#F8FAFC" />
          {/* Orelha Direita */}
          <polygon points="28,7 34,21 24,19" fill="#EA580C" stroke="#C2410C" strokeWidth="1.2" />
          <polygon points="29,10 32,19 26,18" fill="#F8FAFC" />
          {/* Cabeça / Bochechas Laranja */}
          <polygon points="20,13 6,21 20,35" fill="#F97316" />
          <polygon points="20,13 34,21 20,35" fill="#EA580C" />
          {/* Focinho Branco */}
          <polygon points="20,21 12,27 20,35" fill="#FFFFFF" />
          <polygon points="20,21 28,27 20,35" fill="#F8FAFC" />
          {/* Olhos espertos */}
          <line x1="14" y1="21" x2="17" y2="22" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="26" y1="21" x2="23" y2="22" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          {/* Nariz */}
          <circle cx="20" cy="34" r="1.6" fill="#0F172A" />
        </svg>
      );

    case 'gold-night':
      // Estrela Polar / Aurora Compass
      return (
        <svg viewBox="0 0 40 40" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Raios Principais */}
          <path d="M20 3 L23 16 L37 20 L23 24 L20 37 L17 24 L3 20 L17 16 Z" fill="#F59E0B" stroke="#FBBF24" strokeWidth="1.5" />
          {/* Raios Secundários Diagonais */}
          <path d="M20 11 L23 17 L29 20 L23 23 L20 29 L17 23 L11 20 L17 17 Z" fill="#14B8A6" opacity="0.8" />
          {/* Diamante Central */}
          <polygon points="20,16 24,20 20,24 16,20" fill="#FFFFFF" />
          {/* Partículas de brilho */}
          <circle cx="33" cy="8" r="1.5" fill="#FBBF24" />
          <circle cx="7" cy="32" r="1.5" fill="#14B8A6" />
        </svg>
      );
  }
}
