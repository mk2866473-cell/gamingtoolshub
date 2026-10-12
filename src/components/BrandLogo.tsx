/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gamepad2, Terminal } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({ className = '', size = 'md' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div
      className={`relative flex items-center justify-center bg-[#0d131f] border border-slate-700/80 shadow-sm transition-all duration-200 group-hover:border-emerald-500/70 group-hover:bg-[#101827] ${sizeClasses[size]} ${className}`}
    >
      {/* Corner precision mark */}
      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-emerald-400" />
      <Gamepad2 className={`${iconSizes[size]} text-emerald-400`} />
    </div>
  );
}
