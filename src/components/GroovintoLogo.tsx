import React from 'react';
import generatedLogoImg from '../assets/images/groovinto_official_logo_1790003834966.jpg';

export interface GroovintoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'vector' | 'image' | 'badge';
}

export const GroovintoLogo: React.FC<GroovintoLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  variant = 'vector',
}) => {
  // Height presets for different layout placements
  const sizeStyles = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  if (variant === 'image') {
    return (
      <div className={`inline-flex items-center ${className}`} id="groovinto-logo-img-wrapper">
        <img
          src={generatedLogoImg}
          alt="GROOVINTO - Guide. Gain. Grow"
          className={`${sizeStyles[size]} w-auto object-contain rounded select-none`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  const logoSvg = (
    <svg
      viewBox="0 0 340 84"
      className={`${sizeStyles[size]} w-auto max-w-full select-none shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GROOVINTO - Guide. Gain. Grow"
    >
      <defs>
        {/* Sclera 3D spherical shading */}
        <radialGradient id="gvSclera" cx="35%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f8f6f2" />
          <stop offset="82%" stopColor="#e8e2d8" />
          <stop offset="100%" stopColor="#c2b8aa" />
        </radialGradient>

        {/* Eyeball outer edge shadow */}
        <radialGradient id="gvEyeRim" cx="50%" cy="50%" r="50%">
          <stop offset="80%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </radialGradient>

        {/* Iris rich amber/orange radial gradient */}
        <radialGradient id="gvIris" cx="40%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="30%" stopColor="#ff7a00" />
          <stop offset="65%" stopColor="#ea580c" />
          <stop offset="88%" stopColor="#9a3412" />
          <stop offset="100%" stopColor="#381102" />
        </radialGradient>

        {/* Crisp subtle shadow for letter pop on dark UI */}
        <filter id="gvTextPop" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Main GROOVINTO Typography Row */}
      <g filter="url(#gvTextPop)">
        {/* "GR" in bold chunky orange */}
        <text
          x="2"
          y="50"
          fill="#FF5500"
          fontFamily="'Montserrat', 'Arial Black', 'Impact', sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="-1.2"
        >
          GR
        </text>

        {/* Eyeball 1 (Replacing first 'O') */}
        <g transform="translate(94, 33)">
          {/* Spherical Eyeball Base */}
          <circle cx="0" cy="0" r="20" fill="url(#gvSclera)" />
          <circle cx="0" cy="0" r="20" fill="url(#gvEyeRim)" />

          {/* Micro red veins */}
          <path
            d="M -18 -4 Q -12 -6 -9 -2 M -17 5 Q -12 3 -7 6 M 10 -15 Q 13 -10 16 -8"
            stroke="#ef4444"
            strokeWidth="0.75"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* Limbal ring */}
          <circle cx="0" cy="0" r="11" fill="none" stroke="#2a0f02" strokeWidth="1" opacity="0.9" />

          {/* Amber/Orange Iris */}
          <circle cx="0" cy="0" r="10.5" fill="url(#gvIris)" />

          {/* Iris fibers */}
          <g stroke="#ffedd5" strokeWidth="0.55" opacity="0.4">
            <line x1="0" y1="-9.5" x2="0" y2="-5" />
            <line x1="6.7" y1="-6.7" x2="3.5" y2="-3.5" />
            <line x1="9.5" y1="0" x2="5" y2="0" />
            <line x1="6.7" y1="6.7" x2="3.5" y2="3.5" />
            <line x1="0" y1="9.5" x2="0" y2="5" />
            <line x1="-6.7" y1="6.7" x2="-3.5" y2="3.5" />
            <line x1="-9.5" y1="0" x2="-5" y2="0" />
            <line x1="-6.7" y1="-6.7" x2="-3.5" y2="-3.5" />
          </g>

          {/* Pupil */}
          <circle cx="0" cy="0" r="4.8" fill="#09090b" />

          {/* Specular 3D catchlights */}
          <ellipse cx="-3.2" cy="-3.8" rx="2.8" ry="1.8" transform="rotate(-30, -3.2, -3.8)" fill="#ffffff" opacity="0.95" />
          <circle cx="3" cy="3" r="1" fill="#ffffff" opacity="0.75" />
        </g>

        {/* Eyeball 2 (Replacing second 'O') */}
        <g transform="translate(138, 33)">
          {/* Spherical Eyeball Base */}
          <circle cx="0" cy="0" r="20" fill="url(#gvSclera)" />
          <circle cx="0" cy="0" r="20" fill="url(#gvEyeRim)" />

          {/* Micro red veins */}
          <path
            d="M -17 -3 Q -12 -5 -8 -1 M 10 -15 Q 13 -9 16 -7 M 9 14 Q 13 10 16 7"
            stroke="#ef4444"
            strokeWidth="0.75"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* Limbal ring */}
          <circle cx="0" cy="0" r="11" fill="none" stroke="#2a0f02" strokeWidth="1" opacity="0.9" />

          {/* Amber/Orange Iris */}
          <circle cx="0" cy="0" r="10.5" fill="url(#gvIris)" />

          {/* Iris fibers */}
          <g stroke="#ffedd5" strokeWidth="0.55" opacity="0.4">
            <line x1="0" y1="-9.5" x2="0" y2="-5" />
            <line x1="6.7" y1="-6.7" x2="3.5" y2="-3.5" />
            <line x1="9.5" y1="0" x2="5" y2="0" />
            <line x1="6.7" y1="6.7" x2="3.5" y2="3.5" />
            <line x1="0" y1="9.5" x2="0" y2="5" />
            <line x1="-6.7" y1="6.7" x2="-3.5" y2="3.5" />
            <line x1="-9.5" y1="0" x2="-5" y2="0" />
            <line x1="-6.7" y1="-6.7" x2="-3.5" y2="-3.5" />
          </g>

          {/* Pupil */}
          <circle cx="0" cy="0" r="4.8" fill="#09090b" />

          {/* Specular 3D catchlights */}
          <ellipse cx="-3.2" cy="-3.8" rx="2.8" ry="1.8" transform="rotate(-30, -3.2, -3.8)" fill="#ffffff" opacity="0.95" />
          <circle cx="3" cy="3" r="1" fill="#ffffff" opacity="0.75" />
        </g>

        {/* "VINTO" in matching bold chunky orange */}
        <text
          x="164"
          y="50"
          fill="#FF5500"
          fontFamily="'Montserrat', 'Arial Black', 'Impact', sans-serif"
          fontWeight="900"
          fontSize="48"
          letterSpacing="-1.2"
        >
          VINTO
        </text>
      </g>

      {/* Subtitle Tagline: "Guide. Gain. Grow" */}
      {showTagline && (
        <text
          x="165"
          y="77"
          textAnchor="middle"
          fill="#00B050"
          fontFamily="'Montserrat', 'Inter', system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="15"
          letterSpacing="2.8"
        >
          Guide. Gain. Grow
        </text>
      )}
    </svg>
  );

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#FF5500]/40 transition-all ${className}`}
        id="groovinto-logo-badge"
      >
        {logoSvg}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`} id="groovinto-logo-wrapper">
      {logoSvg}
    </div>
  );
};
