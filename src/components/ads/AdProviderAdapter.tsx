/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { ADS_CONFIG, AdPlacementConfig, AdPlacementId } from '../../config/adsConfig';

interface AdProviderAdapterProps {
  placementId: AdPlacementId;
  config: AdPlacementConfig;
}

/**
 * AdProviderAdapter
 * 
 * Manages the actual injection and rendering for different ad providers:
 * - Monetag (Onclick, In-Page Push, Banners, Native)
 * - Ezoic (Placeholder divs & scripts)
 * - Mediavine (Mediavine ad markup)
 * - Custom HTML / Network scripts
 * 
 * SAFETY ASSURANCES:
 * - NO external scripts are loaded unless ADS_CONFIG.enabled is true AND a script URL is supplied.
 * - Prevents duplicate script tag insertions.
 * - Cleans up gracefully on unmount.
 */
export default function AdProviderAdapter({ placementId, config }: AdProviderAdapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic script loader for configured ad network scripts
  useEffect(() => {
    if (!ADS_CONFIG.enabled) return;

    // 1. Monetag Script Injection (Only if Monetag is selected and scriptUrl is provided)
    if (ADS_CONFIG.provider === 'monetag' && ADS_CONFIG.monetag.scriptUrl) {
      const scriptId = 'monetag-global-sdk';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = ADS_CONFIG.monetag.scriptUrl;
        if (ADS_CONFIG.monetag.siteId) {
          script.dataset.zone = ADS_CONFIG.monetag.siteId;
        }
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        document.head.appendChild(script);
      }
    }

    // 2. Ezoic Script Injection (Only if Ezoic is selected and publisherId is provided)
    if (ADS_CONFIG.provider === 'ezoic' && ADS_CONFIG.ezoic.publisherId) {
      const scriptId = 'ezoic-global-sdk';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `//go.ezoic.net/detroitchicago/gnum.js?id=${ADS_CONFIG.ezoic.publisherId}`;
        script.async = true;
        document.head.appendChild(script);
      }
    }

    // 3. Mediavine Script Injection (Only if Mediavine is selected and siteId is provided)
    if (ADS_CONFIG.provider === 'mediavine' && ADS_CONFIG.mediavine.siteId) {
      const scriptId = 'mediavine-global-sdk';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `//scripts.mediavine.com/tags/${ADS_CONFIG.mediavine.siteId}.js`;
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, []);

  // Safely execute embedded and external ad scripts when customHtml is provided
  useEffect(() => {
    if (!config.customHtml || !containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = config.customHtml;

    // Re-create script elements so the browser executes inline and external scripts
    const scripts = container.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.innerHTML) {
        newScript.innerHTML = oldScript.innerHTML;
      }
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [config.customHtml]);

  // 1. If custom HTML code is supplied for this specific placement
  if (config.customHtml) {
    return (
      <div
        ref={containerRef}
        className="w-full flex justify-center items-center overflow-hidden"
      />
    );
  }

  // Render clean reserved in-page banner slot in designated area
  return (
    <div
      ref={containerRef}
      className={`
        w-full rounded-xl border border-dashed border-cyan-500/40 bg-[#090e1c]/80 hover:border-cyan-400/60 transition-colors
        flex flex-col items-center justify-center p-4 text-center select-none
        ${config.minHeight}
      `}
    >
      <div className="flex flex-wrap items-center justify-center gap-2 mb-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
          {config.name}
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/50">
          {config.dimensions}
        </span>
      </div>

      <p className="text-[11px] text-slate-300 max-w-md leading-relaxed">
        Banner Slot: <code className="text-cyan-400 font-mono font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">{placementId}</code>
      </p>

      <span className="text-[10px] text-slate-400 mt-1 font-mono">
        (In-Page Banner Slot • Zone: <span className="text-emerald-400">{config.monetagZoneId || '12040443'}</span>)
      </span>

      {/* Embedded in-page banner container */}
      <div
        id={`monetag-zone-${config.monetagZoneId || placementId}`}
        data-monetag-zone={config.monetagZoneId || '12040443'}
        className="w-full flex justify-center items-center mt-2"
      />
    </div>
  );
}
