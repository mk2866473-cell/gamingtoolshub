/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Professional Pokéball Vector Logo
 */
export function PokeballIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Shell */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
      
      {/* Upper Red Dome fill */}
      <path 
        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12" 
        fill="#EF4444" 
        fillOpacity="0.25"
      />
      
      {/* Center Dividing Band */}
      <line x1="2" y1="12" x2="8.5" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="15.5" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      
      {/* Outer Button Ring */}
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.75" fill="#0b0f17" />
      
      {/* Inner Button Core */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Professional Pal Sphere Vector Logo
 */
export function PalSphereIcon({ className = 'w-5 h-5', size = 20 }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Sphere */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
      
      {/* Pal Sphere Energetic Core Tint */}
      <circle cx="12" cy="12" r="9" fill="#06B6D4" fillOpacity="0.2" />
      
      {/* Upper Latitude Ring Bracket */}
      <path 
        d="M3.5 8C6 6.5 18 6.5 20.5 8" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      
      {/* Lower Latitude Ring Bracket */}
      <path 
        d="M3.5 16C6 17.5 18 17.5 20.5 16" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      
      {/* Center Core Capture Aperture */}
      <rect 
        x="9.5" 
        y="9.5" 
        width="5" 
        height="5" 
        rx="1.5" 
        transform="rotate(45 12 12)" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="#0b0f17" 
      />
      <circle cx="12" cy="12" r="1" fill="#38BDF8" />
    </svg>
  );
}
