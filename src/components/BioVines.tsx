import React from "react";
import { ThemeId } from "../utils/theme";

interface BioVinesProps {
  visible?: boolean;
  density?: "low" | "medium" | "high";
  opacity?: number;
  themeId?: ThemeId;
}

export default function BioVines({
  visible = true,
  density = "medium",
  opacity = 28,
  themeId = "green-black",
}: BioVinesProps) {
  if (!visible) return null;

  // Theme-aware color variables
  const vinePalette = (() => {
    switch (themeId) {
      case "black-purple":
        return {
          stemDark: "#3B0764",
          stemMid: "#7E22CE",
          glow: "#C084FC",
          leafBase: "#2E1065",
          leafStroke: "#A855F7",
          flower: "#F472B6",
          flowerInner: "#FDF4FF"
        };
      case "blue-black":
        return {
          stemDark: "#082F49",
          stemMid: "#0284C7",
          glow: "#00F0FF",
          leafBase: "#0C4A6E",
          leafStroke: "#38BDF8",
          flower: "#38BDF8",
          flowerInner: "#FFFFFF"
        };
      case "white-orange":
        return {
          stemDark: "#7C2D12",
          stemMid: "#EA580C",
          glow: "#F97316",
          leafBase: "#9A3412",
          leafStroke: "#FB923C",
          flower: "#F59E0B",
          flowerInner: "#FEF3C7"
        };
      case "gold-night":
        return {
          stemDark: "#451A03",
          stemMid: "#D97706",
          glow: "#F59E0B",
          leafBase: "#78350F",
          leafStroke: "#14B8A6",
          flower: "#14B8A6",
          flowerInner: "#FEF08A"
        };
      case "green-black":
      default:
        return {
          stemDark: "#064E3B",
          stemMid: "#059669",
          glow: "#00FF55",
          leafBase: "#065F46",
          leafStroke: "#10B981",
          flower: "#F59E0B",
          flowerInner: "#FEF08A"
        };
    }
  })();

  // Theme-aware filter for bioluminescent organic colors
  const vineFilter = (() => {
    switch (themeId) {
      case "black-purple":
        return "hue-rotate(130deg) saturate(1.4)";
      case "blue-black":
        return "hue-rotate(50deg) saturate(1.35) brightness(1.1)";
      case "white-orange":
        return "hue-rotate(250deg) saturate(1.6) brightness(1.05)";
      case "gold-night":
        return "hue-rotate(270deg) saturate(1.5) brightness(1.15)";
      case "green-black":
      default:
        return "none";
    }
  })();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-all duration-700"
      style={{ 
        opacity: opacity / 100,
        filter: vineFilter
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes vineSwayLeft {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(1.2deg) translateY(3px); }
        }
        @keyframes vineSwayRight {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          50% { transform: rotate(-1.4deg) translateY(2.5px); }
        }
        @keyframes bioPulse {
          0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 3px rgba(0, 255, 85, 0.4)); }
          50% { opacity: 0.95; filter: drop-shadow(0 0 8px rgba(0, 255, 85, 0.8)); }
        }
        @keyframes flowerGlow {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.15); filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.8)); }
        }
        .animate-vine-left {
          transform-origin: top left;
          animation: vineSwayLeft 7s ease-in-out infinite;
        }
        .animate-vine-right {
          transform-origin: top right;
          animation: vineSwayRight 8.5s ease-in-out infinite;
        }
        .animate-bio-pulse {
          animation: bioPulse 3.5s ease-in-out infinite;
        }
        .animate-flower-glow {
          animation: flowerGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* TOP-LEFT VINE CLUSTER (Trepadeira da Copa Superior Esquerda) */}
      <div className="absolute top-0 left-0 w-72 sm:w-96 md:w-[440px] h-72 sm:h-96 md:h-[440px] animate-vine-left opacity-90">
        <svg
          viewBox="0 0 440 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        >
          {/* Main Thick Stem / Caule Principal */}
          <path
            d="M-20 -10 C60 40, 110 30, 170 80 C230 130, 220 200, 280 250 C320 285, 360 295, 390 340 C405 365, 410 400, 420 430"
            stroke="#064E3B"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M-20 -10 C60 40, 110 30, 170 80 C230 130, 220 200, 280 250 C320 285, 360 295, 390 340 C405 365, 410 400, 420 430"
            stroke="#059669"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Inner bioluminescent vine core */}
          <path
            d="M-20 -10 C60 40, 110 30, 170 80 C230 130, 220 200, 280 250 C320 285, 360 295, 390 340"
            stroke="#00FF55"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            className="animate-bio-pulse"
          />

          {/* Secondary branching stems & curling tendrils */}
          <path
            d="M90 35 C110 90, 80 140, 120 180 C145 205, 175 195, 190 225 C200 245, 185 270, 195 295"
            stroke="#047857"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M210 115 C260 90, 290 120, 335 110 C365 105, 385 130, 410 125"
            stroke="#047857"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Delicate tendril curls (gavinhas enroladas) */}
          <path
            d="M170 80 C185 70, 205 75, 200 95 C195 110, 180 105, 185 95 C188 88, 198 90, 195 98"
            stroke="#10B981"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M280 250 C305 240, 325 255, 315 275 C305 290, 290 280, 298 270 C303 263, 314 268, 310 276"
            stroke="#00FF55"
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M120 180 C100 210, 85 220, 70 245 C60 260, 68 280, 50 295"
            stroke="#059669"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Leaves Cluster 1 - Base (Folhas da Mangueira e Trepadeira) */}
          <g transform="translate(60, 30) rotate(25)">
            {/* Elongated leaf */}
            <path
              d="M0 0 C25 -15, 65 -15, 95 0 C65 15, 25 15, 0 0 Z"
              fill="#065F46"
              stroke="#047857"
              strokeWidth="1.5"
            />
            <path d="M0 0 L85 0" stroke="#10B981" strokeWidth="1.2" />
            <path d="M25 0 L40 -8 M45 0 L60 -7 M25 0 L40 8 M45 0 L60 7" stroke="#10B981" strokeWidth="0.8" opacity="0.8" />
          </g>

          <g transform="translate(105, 45) rotate(-35)">
            <path
              d="M0 0 C20 -18, 55 -20, 80 0 C55 20, 20 18, 0 0 Z"
              fill="#047857"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <path d="M0 0 L70 0" stroke="#34D399" strokeWidth="1" />
          </g>

          {/* Leaves Cluster 2 - Mid stem */}
          <g transform="translate(160, 75) rotate(40)">
            <path
              d="M0 0 C28 -16, 70 -16, 105 0 C70 16, 28 16, 0 0 Z"
              fill="#064E3B"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <path d="M0 0 L95 0" stroke="#00FF55" strokeWidth="1.2" />
            <path d="M30 0 L45 -8 M55 0 L70 -8 M30 0 L45 8 M55 0 L70 8" stroke="#34D399" strokeWidth="0.8" />
          </g>

          <g transform="translate(175, 95) rotate(-65)">
            <path
              d="M0 0 C22 -14, 50 -14, 75 0 C50 14, 22 14, 0 0 Z"
              fill="#059669"
              stroke="#00FF55"
              strokeWidth="1.5"
            />
            <path d="M0 0 L65 0" stroke="#00FF55" strokeWidth="1" />
          </g>

          {/* Leaves Cluster 3 - Lower branch */}
          <g transform="translate(225, 140) rotate(15)">
            <path
              d="M0 0 C30 -18, 75 -18, 110 0 C75 18, 30 18, 0 0 Z"
              fill="#047857"
              stroke="#34D399"
              strokeWidth="1.5"
            />
            <path d="M0 0 L98 0" stroke="#00FF55" strokeWidth="1.2" />
          </g>

          <g transform="translate(270, 190) rotate(70)">
            <path
              d="M0 0 C22 -12, 55 -12, 80 0 C55 12, 22 12, 0 0 Z"
              fill="#065F46"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <path d="M0 0 L70 0" stroke="#34D399" strokeWidth="1" />
          </g>

          <g transform="translate(285, 255) rotate(-20)">
            <path
              d="M0 0 C25 -14, 60 -14, 85 0 C60 14, 25 14, 0 0 Z"
              fill="#059669"
              stroke="#00FF55"
              strokeWidth="1.5"
            />
            <path d="M0 0 L75 0" stroke="#A7F3D0" strokeWidth="1" />
          </g>

          <g transform="translate(340, 280) rotate(45)">
            <path
              d="M0 0 C20 -10, 48 -10, 70 0 C48 10, 20 10, 0 0 Z"
              fill="#047857"
              stroke="#10B981"
              strokeWidth="1.2"
            />
          </g>

          <g transform="translate(380, 335) rotate(-45)">
            <path
              d="M0 0 C18 -10, 40 -10, 60 0 C40 10, 18 10, 0 0 Z"
              fill="#065F46"
              stroke="#00FF55"
              strokeWidth="1.2"
            />
          </g>

          {/* Tropical Blossom Buds / Mangueira Flowers & Glowing Spores */}
          <circle cx="170" cy="80" r="5" fill="#F59E0B" className="animate-flower-glow" />
          <circle cx="170" cy="80" r="2.5" fill="#FEF08A" />
          
          <circle cx="280" cy="248" r="6" fill="#F59E0B" className="animate-flower-glow" />
          <circle cx="280" cy="248" r="3" fill="#FEF08A" />

          <circle cx="120" cy="180" r="4.5" fill="#00FF55" className="animate-bio-pulse" />
          <circle cx="335" cy="110" r="4" fill="#FBBF24" className="animate-flower-glow" />
          <circle cx="410" cy="125" r="3.5" fill="#00FF55" className="animate-bio-pulse" />
        </svg>
      </div>

      {/* TOP-RIGHT VINE CLUSTER (Trepadeira da Copa Superior Direita) */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 md:w-[440px] h-72 sm:h-96 md:h-[440px] animate-vine-right opacity-90">
        <svg
          viewBox="0 0 440 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
        >
          {/* Main Thick Stem / Caule Direito */}
          <path
            d="M460 -10 C380 40, 330 30, 270 80 C210 130, 220 200, 160 250 C120 285, 80 295, 50 340 C35 365, 30 400, 20 430"
            stroke="#064E3B"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M460 -10 C380 40, 330 30, 270 80 C210 130, 220 200, 160 250 C120 285, 80 295, 50 340 C35 365, 30 400, 20 430"
            stroke="#059669"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M460 -10 C380 40, 330 30, 270 80 C210 130, 220 200, 160 250 C120 285, 80 295, 50 340"
            stroke="#00FF55"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            className="animate-bio-pulse"
          />

          {/* Secondary branches */}
          <path
            d="M350 35 C330 90, 360 140, 320 180 C295 205, 265 195, 250 225 C240 245, 255 270, 245 295"
            stroke="#047857"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M230 115 C180 90, 150 120, 105 110 C75 105, 55 130, 30 125"
            stroke="#047857"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Right side leaves */}
          <g transform="translate(380, 30) rotate(-25)">
            <path
              d="M0 0 C-25 -15, -65 -15, -95 0 C-65 15, -25 15, 0 0 Z"
              fill="#065F46"
              stroke="#047857"
              strokeWidth="1.5"
            />
            <path d="M0 0 L-85 0" stroke="#10B981" strokeWidth="1.2" />
          </g>

          <g transform="translate(335, 45) rotate(35)">
            <path
              d="M0 0 C-20 -18, -55 -20, -80 0 C-55 20, -20 18, 0 0 Z"
              fill="#047857"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <path d="M0 0 L-70 0" stroke="#34D399" strokeWidth="1" />
          </g>

          <g transform="translate(280, 75) rotate(-40)">
            <path
              d="M0 0 C-28 -16, -70 -16, -105 0 C-70 16, -28 16, 0 0 Z"
              fill="#064E3B"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <path d="M0 0 L-95 0" stroke="#00FF55" strokeWidth="1.2" />
          </g>

          <g transform="translate(265, 95) rotate(65)">
            <path
              d="M0 0 C-22 -14, -50 -14, -75 0 C-50 14, -22 14, 0 0 Z"
              fill="#059669"
              stroke="#00FF55"
              strokeWidth="1.5"
            />
          </g>

          <g transform="translate(215, 140) rotate(-15)">
            <path
              d="M0 0 C-30 -18, -75 -18, -110 0 C-75 18, -30 18, 0 0 Z"
              fill="#047857"
              stroke="#34D399"
              strokeWidth="1.5"
            />
            <path d="M0 0 L-98 0" stroke="#00FF55" strokeWidth="1.2" />
          </g>

          <g transform="translate(155, 255) rotate(20)">
            <path
              d="M0 0 C-25 -14, -60 -14, -85 0 C-60 14, -25 14, 0 0 Z"
              fill="#059669"
              stroke="#00FF55"
              strokeWidth="1.5"
            />
            <path d="M0 0 L-75 0" stroke="#A7F3D0" strokeWidth="1" />
          </g>

          <g transform="translate(100, 280) rotate(-45)">
            <path
              d="M0 0 C-20 -10, -48 -10, -70 0 C-48 10, -20 10, 0 0 Z"
              fill="#047857"
              stroke="#10B981"
              strokeWidth="1.2"
            />
          </g>

          {/* Right buds & flowers */}
          <circle cx="270" cy="80" r="5" fill="#F59E0B" className="animate-flower-glow" />
          <circle cx="270" cy="80" r="2.5" fill="#FEF08A" />
          
          <circle cx="160" cy="248" r="6" fill="#F59E0B" className="animate-flower-glow" />
          <circle cx="160" cy="248" r="3" fill="#FEF08A" />

          <circle cx="320" cy="180" r="4.5" fill="#00FF55" className="animate-bio-pulse" />
          <circle cx="105" cy="110" r="4" fill="#FBBF24" className="animate-flower-glow" />
        </svg>
      </div>

      {/* LATERAL HANGING TENDRILS (Trepadeiras Laterais Decorativas) */}
      {density !== "low" && (
        <>
          {/* Left Side Tendril Garland */}
          <div className="hidden lg:block absolute top-[35%] left-0 w-24 h-[420px] opacity-75">
            <svg viewBox="0 0 96 420" fill="none" className="w-full h-full">
              <path
                d="M-5 0 C25 60, 10 120, 30 180 C50 240, 20 300, 35 360 C42 390, 30 410, 25 420"
                stroke="#047857"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M-5 0 C25 60, 10 120, 30 180 C50 240, 20 300, 35 360"
                stroke="#00FF55"
                strokeWidth="1"
                strokeDasharray="3 7"
                className="animate-bio-pulse"
              />
              {/* Leaves branching inward */}
              <g transform="translate(18, 90) rotate(30)">
                <path d="M0 0 C15 -8, 35 -8, 50 0 C35 8, 15 8, 0 0 Z" fill="#065F46" stroke="#10B981" strokeWidth="1" />
              </g>
              <g transform="translate(25, 170) rotate(45)">
                <path d="M0 0 C16 -10, 38 -10, 55 0 C38 10, 16 10, 0 0 Z" fill="#059669" stroke="#00FF55" strokeWidth="1" />
              </g>
              <g transform="translate(30, 250) rotate(20)">
                <path d="M0 0 C14 -7, 32 -7, 45 0 C32 7, 14 7, 0 0 Z" fill="#047857" stroke="#34D399" strokeWidth="1" />
              </g>
              <g transform="translate(26, 330) rotate(40)">
                <path d="M0 0 C15 -8, 35 -8, 50 0 C35 8, 15 8, 0 0 Z" fill="#065F46" stroke="#10B981" strokeWidth="1" />
              </g>
              <circle cx="30" cy="180" r="3.5" fill="#FBBF24" className="animate-flower-glow" />
              <circle cx="35" cy="360" r="3" fill="#00FF55" className="animate-bio-pulse" />
            </svg>
          </div>

          {/* Right Side Tendril Garland */}
          <div className="hidden lg:block absolute top-[35%] right-0 w-24 h-[420px] opacity-75">
            <svg viewBox="0 0 96 420" fill="none" className="w-full h-full">
              <path
                d="M101 0 C71 60, 86 120, 66 180 C46 240, 76 300, 61 360 C54 390, 66 410, 71 420"
                stroke="#047857"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M101 0 C71 60, 86 120, 66 180 C46 240, 76 300, 61 360"
                stroke="#00FF55"
                strokeWidth="1"
                strokeDasharray="3 7"
                className="animate-bio-pulse"
              />
              <g transform="translate(78, 90) rotate(-30)">
                <path d="M0 0 C-15 -8, -35 -8, -50 0 C-35 8, -15 8, 0 0 Z" fill="#065F46" stroke="#10B981" strokeWidth="1" />
              </g>
              <g transform="translate(71, 170) rotate(-45)">
                <path d="M0 0 C-16 -10, -38 -10, -55 0 C-38 10, -16 10, 0 0 Z" fill="#059669" stroke="#00FF55" strokeWidth="1" />
              </g>
              <g transform="translate(66, 250) rotate(-20)">
                <path d="M0 0 C-14 -7, -32 -7, -45 0 C-32 7, -14 7, 0 0 Z" fill="#047857" stroke="#34D399" strokeWidth="1" />
              </g>
              <g transform="translate(70, 330) rotate(-40)">
                <path d="M0 0 C-15 -8, -35 -8, -50 0 C-35 8, -15 8, 0 0 Z" fill="#065F46" stroke="#10B981" strokeWidth="1" />
              </g>
              <circle cx="66" cy="180" r="3.5" fill="#FBBF24" className="animate-flower-glow" />
              <circle cx="61" cy="360" r="3" fill="#00FF55" className="animate-bio-pulse" />
            </svg>
          </div>
        </>
      )}

      {/* BOTTOM SUBTLE VINES (Along the bottom viewport edge) */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none opacity-40 flex justify-between overflow-hidden">
        <svg viewBox="0 0 500 60" fill="none" className="w-80 h-full">
          <path d="M-10 60 C80 20, 160 40, 240 10 C320 -10, 400 30, 510 15" stroke="#064E3B" strokeWidth="3" />
          <path d="M50 45 C70 30, 95 35, 110 50" stroke="#059669" strokeWidth="1.5" />
          <circle cx="240" cy="10" r="2.5" fill="#00FF55" />
        </svg>
        <svg viewBox="0 0 500 60" fill="none" className="w-80 h-full scale-x-[-1]">
          <path d="M-10 60 C80 20, 160 40, 240 10 C320 -10, 400 30, 510 15" stroke="#064E3B" strokeWidth="3" />
          <circle cx="240" cy="10" r="2.5" fill="#FBBF24" />
        </svg>
      </div>
    </div>
  );
}
