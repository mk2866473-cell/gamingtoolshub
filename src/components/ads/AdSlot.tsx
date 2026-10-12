/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ADS_CONFIG, AdPlacementId, isPlacementEnabled } from '../../config/adsConfig';
import AdProviderAdapter from './AdProviderAdapter';
import { X } from 'lucide-react';

export interface AdSlotProps {
  /** Unique placement ID from ADS_CONFIG */
  placement: AdPlacementId;
  /** Current URL path to enforce policy checks (e.g. privacy/terms) */
  currentPath?: string;
  /** Optional custom CSS classes */
  className?: string;
  /** Optional custom label override */
  label?: string;
  /** Optional custom React children (e.g. direct sponsor component) */
  children?: React.ReactNode;
}

/**
 * Reusable, network-independent ad container.
 * 
 * Complies with:
 * - Better Ads Standards & IAB specifications
 * - Zero content obstruction
 * - Safe isolation from calculator buttons & inputs
 * - Completely disabled by default (returns null when disabled)
 */
export default function AdSlot({
  placement,
  currentPath,
  className = '',
  label,
  children,
}: AdSlotProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  // If placement is disabled (default), return null immediately.
  // This ensures 0 layout shift and 0 third-party network traffic.
  if (!isPlacementEnabled(placement, currentPath)) {
    return null;
  }

  // Dismissed state (for mobile anchor)
  if (isDismissed) {
    return null;
  }

  const config = ADS_CONFIG.placements[placement];
  if (!config) return null;

  // Special presentation for Mobile Anchor Ad (only rendered when enabled)
  if (placement === 'mobile-anchor') {
    return (
      <aside
        id={placement}
        data-ad-placement={placement}
        aria-label="Mobile Advertisement"
        role="complementary"
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#080d18]/95 backdrop-blur-md border-t border-slate-800 shadow-2xl pb-safe flex flex-col items-center px-2 py-1.5 animate-in fade-in slide-in-from-bottom duration-300"
      >
        <div className="w-full flex items-center justify-between px-2 pb-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
            {label || ADS_CONFIG.disclosureLabel}
          </span>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Close advertisement"
            className="p-1 text-slate-400 hover:text-white rounded bg-slate-800/80 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="w-full flex justify-center items-center min-h-[50px]">
          {children || <AdProviderAdapter placementId={placement} config={config} />}
        </div>
      </aside>
    );
  }

  // Standard in-page display ad containers
  return (
    <aside
      id={placement}
      data-ad-placement={placement}
      data-ad-slot={placement}
      aria-label="Advertisement"
      role="complementary"
      className={`w-full select-none ${className}`}
    >
      {/* Standard IAB disclosure label */}
      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5 text-center">
        {label || ADS_CONFIG.disclosureLabel}
      </div>

      {/* Primary ad container with reserved minHeight to eliminate CLS */}
      <div className="w-full overflow-hidden flex justify-center items-center">
        {children ? (
          <div className="w-full flex justify-center items-center">
            {children}
          </div>
        ) : (
          <AdProviderAdapter placementId={placement} config={config} />
        )}
      </div>
    </aside>
  );
}
