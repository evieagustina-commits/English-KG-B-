import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../utils/soundService';

interface WordIllustrationProps {
  wordId: string;
  isSolved?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const WordIllustration: React.FC<WordIllustrationProps> = ({
  wordId,
  isSolved = false,
  size = 'lg',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    setTapCount((prev) => prev + 1);
    sound.playPop();
    if (onClick) onClick();
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-44 h-44 sm:w-52 sm:h-52',
    xl: 'w-60 h-60 sm:w-72 sm:h-72'
  };

  // Render dedicated SVG graphics per word
  const renderGraphic = () => {
    switch (wordId) {
      case 'cat':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Tail */}
            <motion.path
              d="M 125 110 C 145 100 150 70 140 60 C 130 50 120 70 122 90"
              fill="none"
              stroke="#F97316"
              strokeWidth="10"
              strokeLinecap="round"
              animate={isSolved ? { rotate: [0, 15, -15, 0] } : { rotate: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ originX: '125px', originY: '110px' }}
            />
            {/* Body */}
            <ellipse cx="80" cy="105" rx="46" ry="38" fill="#F97316" />
            <ellipse cx="80" cy="110" rx="30" ry="24" fill="#FED7AA" />
            {/* Ears */}
            <polygon points="45,45 65,70 35,70" fill="#EA580C" />
            <polygon points="48,50 60,68 39,68" fill="#FECDD3" />
            <polygon points="115,45 125,70 95,70" fill="#EA580C" />
            <polygon points="112,50 121,68 100,68" fill="#FECDD3" />
            {/* Head */}
            <circle cx="80" cy="72" r="36" fill="#F97316" />
            {/* Eyes */}
            <ellipse cx="68" cy="68" rx="6" ry="8" fill="#1E293B" />
            <ellipse cx="92" cy="68" rx="6" ry="8" fill="#1E293B" />
            <circle cx="70" cy="66" r="2.5" fill="#FFFFFF" />
            <circle cx="94" cy="66" r="2.5" fill="#FFFFFF" />
            {/* Nose & Mouth */}
            <polygon points="80,77 75,72 85,72" fill="#F43F5E" />
            <path d="M 75 79 Q 80 84 85 79" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Whiskers */}
            <line x1="42" y1="72" x2="62" y2="74" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="80" x2="62" y2="78" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="98" y1="74" x2="118" y2="72" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            <line x1="98" y1="78" x2="118" y2="80" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            {/* Paws */}
            <circle cx="62" cy="138" r="10" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
            <circle cx="98" cy="138" r="10" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          </svg>
        );

      case 'dog':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Wagging Tail */}
            <motion.path
              d="M 120 110 Q 145 90 142 70"
              fill="none"
              stroke="#B45309"
              strokeWidth="9"
              strokeLinecap="round"
              animate={isSolved ? { rotate: [0, 25, -25, 0] } : { rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ originX: '120px', originY: '110px' }}
            />
            {/* Body */}
            <ellipse cx="80" cy="108" rx="46" ry="36" fill="#D97706" />
            <ellipse cx="80" cy="115" rx="30" ry="22" fill="#FEF3C7" />
            {/* Head */}
            <circle cx="80" cy="68" r="34" fill="#D97706" />
            {/* Floppy Ears */}
            <motion.ellipse
              cx="46"
              cy="70"
              rx="12"
              ry="24"
              fill="#92400E"
              animate={isSolved ? { rotate: [0, -15, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.ellipse
              cx="114"
              cy="70"
              rx="12"
              ry="24"
              fill="#92400E"
              animate={isSolved ? { rotate: [0, 15, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            {/* Eyes */}
            <circle cx="68" cy="62" r="6" fill="#1E293B" />
            <circle cx="92" cy="62" r="6" fill="#1E293B" />
            <circle cx="70" cy="60" r="2" fill="#FFFFFF" />
            <circle cx="94" cy="60" r="2" fill="#FFFFFF" />
            {/* Snout */}
            <ellipse cx="80" cy="74" rx="16" ry="12" fill="#FEF3C7" />
            <ellipse cx="80" cy="71" rx="7" ry="5" fill="#1E293B" />
            {/* Happy Tongue */}
            <path d="M 76 81 Q 80 92 84 81" fill="#F43F5E" />
          </svg>
        );

      case 'sun':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Rotating Sun Rays */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              style={{ originX: '80px', originY: '80px' }}
            >
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <rect
                  key={deg}
                  x="75"
                  y="12"
                  width="10"
                  height="22"
                  rx="5"
                  fill="#F59E0B"
                  transform={`rotate(${deg} 80 80)`}
                />
              ))}
            </motion.g>
            {/* Glowing Sun Face */}
            <circle cx="80" cy="80" r="48" fill="#FBBF24" stroke="#F59E0B" strokeWidth="4" />
            {/* Rosy Cheeks */}
            <circle cx="58" cy="88" r="8" fill="#FDA4AF" opacity="0.8" />
            <circle cx="102" cy="88" r="8" fill="#FDA4AF" opacity="0.8" />
            {/* Eyes */}
            <circle cx="64" cy="74" r="5" fill="#78350F" />
            <circle cx="96" cy="74" r="5" fill="#78350F" />
            <circle cx="66" cy="72" r="1.8" fill="#FFFFFF" />
            <circle cx="98" cy="72" r="1.8" fill="#FFFFFF" />
            {/* Big Smile */}
            <path d="M 68 86 Q 80 102 92 86" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          </svg>
        );

      case 'bug':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Antennae */}
            <path d="M 70 42 Q 60 20 48 24" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="48" cy="24" r="4" fill="#E11D48" />
            <path d="M 90 42 Q 100 20 112 24" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="112" cy="24" r="4" fill="#E11D48" />
            {/* Legs */}
            <line x1="45" y1="80" x2="25" y2="72" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <line x1="45" y1="100" x2="22" y2="105" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <line x1="45" y1="120" x2="26" y2="135" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <line x1="115" y1="80" x2="135" y2="72" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <line x1="115" y1="100" x2="138" y2="105" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <line x1="115" y1="120" x2="134" y2="135" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            {/* Head */}
            <circle cx="80" cy="50" r="22" fill="#1E293B" />
            {/* Eyes */}
            <circle cx="72" cy="46" r="4" fill="#FFFFFF" />
            <circle cx="88" cy="46" r="4" fill="#FFFFFF" />
            <circle cx="73" cy="46" r="2" fill="#1E293B" />
            <circle cx="89" cy="46" r="2" fill="#1E293B" />
            {/* Ladybug Shell */}
            <ellipse cx="80" cy="100" rx="44" ry="42" fill="#E11D48" />
            <line x1="80" y1="58" x2="80" y2="142" stroke="#1E293B" strokeWidth="3" />
            {/* Spots */}
            <circle cx="60" cy="85" r="7" fill="#1E293B" />
            <circle cx="100" cy="85" r="7" fill="#1E293B" />
            <circle cx="56" cy="115" r="6" fill="#1E293B" />
            <circle cx="104" cy="115" r="6" fill="#1E293B" />
            <circle cx="72" cy="130" r="4" fill="#1E293B" />
            <circle cx="88" cy="130" r="4" fill="#1E293B" />
          </svg>
        );

      case 'pig':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Curly Tail */}
            <path d="M 128 105 Q 148 100 142 90 Q 136 80 148 76" fill="none" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
            {/* Body */}
            <ellipse cx="80" cy="100" rx="48" ry="38" fill="#F472B6" />
            {/* Ears */}
            <polygon points="45,45 60,70 35,68" fill="#EC4899" />
            <polygon points="115,45 125,68 100,70" fill="#EC4899" />
            {/* Head */}
            <circle cx="80" cy="72" r="34" fill="#F472B6" />
            {/* Eyes */}
            <circle cx="68" cy="64" r="5" fill="#1E293B" />
            <circle cx="92" cy="64" r="5" fill="#1E293B" />
            <circle cx="70" cy="62" r="1.8" fill="#FFFFFF" />
            <circle cx="94" cy="62" r="1.8" fill="#FFFFFF" />
            {/* Big Snout */}
            <ellipse cx="80" cy="78" rx="16" ry="12" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2" />
            <circle cx="75" cy="78" r="3" fill="#BE185D" />
            <circle cx="85" cy="78" r="3" fill="#BE185D" />
            {/* Little Legs */}
            <rect x="55" y="132" width="14" height="16" rx="4" fill="#EC4899" />
            <rect x="91" y="132" width="14" height="16" rx="4" fill="#EC4899" />
          </svg>
        );

      case 'jet':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Jet Exhaust Flames */}
            <motion.path
              d="M 25 80 L 10 74 L 18 80 L 10 86 Z"
              fill="#F59E0B"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
            {/* Wings */}
            <polygon points="80,80 45,28 65,28 105,80" fill="#0284C7" />
            <polygon points="80,80 45,132 65,132 105,80" fill="#0284C7" />
            {/* Tail Wing */}
            <polygon points="35,80 25,50 45,50 55,80" fill="#0369A1" />
            {/* Jet Body */}
            <ellipse cx="85" cy="80" rx="55" ry="18" fill="#38BDF8" />
            <polygon points="140,80 120,72 120,88" fill="#0284C7" />
            {/* Cockpit Window */}
            <ellipse cx="105" cy="76" rx="14" ry="7" fill="#F0F9FF" stroke="#0284C7" strokeWidth="2" />
          </svg>
        );

      case 'cup':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Handle */}
            <path d="M 108 70 C 138 70 138 115 108 115" fill="none" stroke="#06B6D4" strokeWidth="10" strokeLinecap="round" />
            {/* Cup Body */}
            <path d="M 45 55 L 52 125 C 53 135 65 140 80 140 C 95 140 107 135 108 125 L 115 55 Z" fill="#22D3EE" stroke="#0891B2" strokeWidth="4" />
            {/* Heart Decor */}
            <path d="M 80 92 C 78 86 70 86 70 92 C 70 98 80 106 80 106 C 80 106 90 98 90 92 C 90 86 82 86 80 92 Z" fill="#F43F5E" />
            {/* Steam Trails */}
            <motion.path
              d="M 65 42 Q 60 30 68 20"
              fill="none"
              stroke="#A5F3FC"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ y: [-4, 0, -4], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <motion.path
              d="M 80 40 Q 88 28 82 18"
              fill="none"
              stroke="#A5F3FC"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ y: [-4, 0, -4], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.3 }}
            />
            <motion.path
              d="M 95 42 Q 90 30 98 20"
              fill="none"
              stroke="#A5F3FC"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ y: [-4, 0, -4], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.6 }}
            />
          </svg>
        );

      case 'bed':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Headboard */}
            <rect x="25" y="45" width="14" height="85" rx="6" fill="#854D0E" />
            {/* Footboard */}
            <rect x="125" y="75" width="14" height="55" rx="6" fill="#854D0E" />
            {/* Mattress */}
            <rect x="35" y="85" width="94" height="30" rx="8" fill="#60A5FA" />
            {/* Blanket */}
            <rect x="65" y="85" width="64" height="30" rx="4" fill="#3B82F6" />
            {/* Pillow */}
            <ellipse cx="52" cy="85" rx="14" ry="9" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          </svg>
        );

      case 'bus':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Bus Body */}
            <rect x="24" y="48" width="112" height="64" rx="14" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
            {/* Windows */}
            <rect x="34" y="56" width="20" height="20" rx="4" fill="#BAE6FD" />
            <rect x="60" y="56" width="20" height="20" rx="4" fill="#BAE6FD" />
            <rect x="86" y="56" width="20" height="20" rx="4" fill="#BAE6FD" />
            <rect x="112" y="56" width="18" height="26" rx="4" fill="#BAE6FD" />
            {/* Side Stripe */}
            <line x1="24" y1="88" x2="136" y2="88" stroke="#1E293B" strokeWidth="4" />
            {/* Wheels */}
            <circle cx="50" cy="116" r="14" fill="#1E293B" />
            <circle cx="50" cy="116" r="6" fill="#E2E8F0" />
            <circle cx="110" cy="116" r="14" fill="#1E293B" />
            <circle cx="110" cy="116" r="6" fill="#E2E8F0" />
          </svg>
        );

      case 'fox':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Fluffy Tail */}
            <path d="M 115 110 C 145 105 152 75 135 60 C 125 50 115 70 118 90" fill="#EA580C" />
            <path d="M 135 60 C 130 52 124 55 125 65 Z" fill="#FFFFFF" />
            {/* Body */}
            <ellipse cx="80" cy="105" rx="42" ry="34" fill="#EA580C" />
            <ellipse cx="80" cy="112" rx="26" ry="20" fill="#FFF7ED" />
            {/* Big Fox Ears */}
            <polygon points="40,35 65,65 32,65" fill="#C2410C" />
            <polygon points="44,42 60,62 36,62" fill="#1E293B" />
            <polygon points="120,35 128,65 95,65" fill="#C2410C" />
            <polygon points="116,42 124,62 100,62" fill="#1E293B" />
            {/* Head */}
            <polygon points="80,100 42,65 118,65" fill="#EA580C" />
            {/* White Cheeks */}
            <polygon points="80,95 44,66 65,78" fill="#FFF7ED" />
            <polygon points="80,95 116,66 95,78" fill="#FFF7ED" />
            {/* Eyes */}
            <ellipse cx="65" cy="65" rx="4.5" ry="6" fill="#1E293B" />
            <ellipse cx="95" cy="65" rx="4.5" ry="6" fill="#1E293B" />
            <circle cx="66" cy="63" r="1.5" fill="#FFFFFF" />
            <circle cx="96" cy="63" r="1.5" fill="#FFFFFF" />
            {/* Snout Nose */}
            <circle cx="80" cy="98" r="5" fill="#1E293B" />
          </svg>
        );

      case 'hat':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Crown */}
            <path d="M 50 100 L 56 46 C 56 40 104 40 104 46 L 110 100 Z" fill="#E11D48" />
            {/* Ribbon */}
            <path d="M 50 94 L 110 94 L 110 100 L 50 100 Z" fill="#FBBF24" />
            {/* Brim */}
            <ellipse cx="80" cy="104" rx="55" ry="16" fill="#BE123C" />
            {/* Star flower decor */}
            <circle cx="96" cy="90" r="6" fill="#FFFFFF" />
            <circle cx="96" cy="90" r="3" fill="#F59E0B" />
          </svg>
        );

      case 'pan':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Handle */}
            <rect x="100" y="86" width="46" height="12" rx="6" fill="#334155" />
            {/* Pan Body */}
            <ellipse cx="70" cy="92" rx="44" ry="22" fill="#0F172A" />
            <ellipse cx="70" cy="90" rx="38" ry="18" fill="#475569" />
            {/* Yummy Pancake / Egg */}
            <ellipse cx="70" cy="90" rx="24" ry="11" fill="#FEF08A" />
            <circle cx="70" cy="90" r="5" fill="#F59E0B" />
          </svg>
        );

      case 'fan':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Stand */}
            <rect x="76" y="90" width="8" height="45" fill="#64748B" />
            <ellipse cx="80" cy="138" rx="28" ry="8" fill="#475569" />
            {/* Outer Cage */}
            <circle cx="80" cy="65" r="42" fill="#E0F2FE" stroke="#0284C7" strokeWidth="4" />
            {/* Spinning Blades */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              style={{ originX: '80px', originY: '65px' }}
            >
              <ellipse cx="80" cy="45" rx="9" ry="18" fill="#0284C7" opacity="0.85" />
              <ellipse cx="80" cy="85" rx="9" ry="18" fill="#0284C7" opacity="0.85" />
              <ellipse cx="60" cy="65" rx="18" ry="9" fill="#0284C7" opacity="0.85" />
              <ellipse cx="100" cy="65" rx="18" ry="9" fill="#0284C7" opacity="0.85" />
              <circle cx="80" cy="65" r="7" fill="#0369A1" />
            </motion.g>
          </svg>
        );

      case 'hen':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Body */}
            <ellipse cx="75" cy="95" rx="40" ry="32" fill="#D97706" />
            {/* Wing */}
            <ellipse cx="70" cy="95" rx="22" ry="16" fill="#B45309" />
            {/* Tail feathers */}
            <polygon points="35,90 20,70 30,95" fill="#92400E" />
            <polygon points="35,95 18,85 30,105" fill="#92400E" />
            {/* Head */}
            <circle cx="105" cy="70" r="20" fill="#D97706" />
            {/* Red Comb */}
            <circle cx="102" cy="50" r="6" fill="#DC2626" />
            <circle cx="110" cy="52" r="6" fill="#DC2626" />
            <circle cx="95" cy="52" r="5" fill="#DC2626" />
            {/* Wattle */}
            <circle cx="112" cy="80" r="5" fill="#DC2626" />
            {/* Beak */}
            <polygon points="120,68 135,73 120,78" fill="#FBBF24" />
            {/* Eye */}
            <circle cx="110" cy="66" r="3" fill="#1E293B" />
            <circle cx="111" cy="65" r="1" fill="#FFFFFF" />
            {/* Legs */}
            <line x1="68" y1="125" x2="68" y2="142" stroke="#F59E0B" strokeWidth="3" />
            <line x1="84" y1="125" x2="84" y2="142" stroke="#F59E0B" strokeWidth="3" />
          </svg>
        );

      case 'pen':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            <g transform="rotate(-35 80 80)">
              {/* Pen Cap Clip */}
              <rect x="74" y="25" width="12" height="75" rx="4" fill="#7C3AED" />
              <rect x="70" y="35" width="4" height="40" rx="2" fill="#C4B5FD" />
              {/* Nib */}
              <polygon points="74,100 86,100 80,125" fill="#D8B4FE" stroke="#6D28D9" strokeWidth="2" />
              <line x1="80" y1="100" x2="80" y2="120" stroke="#4C1D95" strokeWidth="2" />
            </g>
            {/* Sparkle of ink */}
            <circle cx="120" cy="120" r="5" fill="#7C3AED" />
          </svg>
        );

      case 'tub':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Tub legs */}
            <circle cx="45" cy="132" r="7" fill="#64748B" />
            <circle cx="115" cy="132" r="7" fill="#64748B" />
            {/* Bathtub Base */}
            <path d="M 28 85 L 34 116 C 36 128 50 132 80 132 C 110 132 124 128 126 116 L 132 85 Z" fill="#F8FAFC" stroke="#0284C7" strokeWidth="4" />
            <ellipse cx="80" cy="85" rx="52" ry="12" fill="#E0F2FE" stroke="#0284C7" strokeWidth="4" />
            {/* Water & Bubbles */}
            <circle cx="60" cy="72" r="8" fill="#BAE6FD" opacity="0.8" />
            <circle cx="75" cy="65" r="10" fill="#BAE6FD" opacity="0.8" />
            <circle cx="90" cy="70" r="7" fill="#BAE6FD" opacity="0.8" />
            {/* Cute Yellow Rubber Duck */}
            <ellipse cx="102" cy="78" rx="10" ry="7" fill="#FBBF24" />
            <circle cx="107" cy="73" r="5" fill="#FBBF24" />
            <polygon points="112,73 118,75 112,77" fill="#F97316" />
          </svg>
        );

      case 'box':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
            {/* Box Body */}
            <rect x="36" y="65" width="88" height="65" rx="6" fill="#F59E0B" stroke="#D97706" strokeWidth="3" />
            {/* Box Lid */}
            <rect x="30" y="55" width="100" height="16" rx="4" fill="#D97706" />
            {/* Ribbon Vertical */}
            <rect x="74" y="55" width="12" height="75" fill="#EF4444" />
            {/* Ribbon Bow */}
            <ellipse cx="68" cy="46" rx="12" ry="8" fill="#EF4444" transform="rotate(-20 68 46)" />
            <ellipse cx="92" cy="46" rx="12" ry="8" fill="#EF4444" transform="rotate(20 92 46)" />
            <circle cx="80" cy="48" r="5" fill="#DC2626" />
          </svg>
        );

      default:
        // Generic charming card with first letter icon
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white/70 rounded-3xl p-4">
            <span className="text-6xl drop-shadow-md">
              {wordId === 'bat' ? '🦇' :
               wordId === 'map' ? '🗺️' :
               wordId === 'cap' ? '🧢' :
               wordId === 'net' ? '🥅' :
               wordId === 'wig' ? '💇' :
               wordId === 'pin' ? '📌' :
               wordId === 'bin' ? '🗑️' :
               wordId === 'lip' ? '👄' :
               wordId === 'zip' ? '🤐' :
               wordId === 'log' ? '🪵' :
               wordId === 'mop' ? '🧹' :
               wordId === 'pot' ? '🍲' :
               wordId === 'mug' ? '☕' :
               wordId === 'nut' ? '🥜' :
               wordId === 'van' ? '🚐' : '🌟'}
            </span>
          </div>
        );
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleTap}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center p-3 rounded-3xl transition-transform cursor-pointer focus:outline-none ${sizeClasses[size]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      animate={
        isSolved
          ? {
              scale: [1, 1.12, 1],
              rotate: [0, -3, 3, 0],
              transition: { duration: 0.6 }
            }
          : {}
      }
      aria-label={`Illustration of ${wordId}`}
    >
      <div className="w-full h-full flex items-center justify-center">
        {renderGraphic()}
      </div>

      {/* Interactive celebratory halo when solved */}
      {isSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{ repeat: 2, repeatType: 'reverse', duration: 0.7 }}
          className="absolute inset-0 rounded-full border-4 border-amber-400 pointer-events-none"
        />
      )}
    </motion.button>
  );
};
