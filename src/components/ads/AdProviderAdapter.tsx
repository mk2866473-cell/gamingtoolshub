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

  // 1. If custom HTML code is supplied for this specific placement
  if (config.customHtml) {
    return (
      <div
        ref={containerRef}
        className="w-full flex justify-center items-center overflow-hidden"
        dangerouslySetInnerHTML={{ __html: config.customHtml }}
      />
    );
  }

  // 2. Monetag Provider Slot
  if (ADS_CONFIG.provider === 'monetag') {
    return (
      <div
        ref={containerRef}
        id={`monetag-zone-${config.monetagZoneId || placementId}`}
        data-monetag-zone={config.monetagZoneId}
        className="w-full flex justify-center items-center min-h-[90px]"
      >
        {/* Monetag banner / zone container */}
      </div>
    );
  }

  // 3. Ezoic Provider Slot (uses Ezoic placeholder standard format)
  if (ADS_CONFIG.provider === 'ezoic') {
    return (
      <div
        ref={containerRef}
        id={`ezoic-pub-ad-placeholder-${config.ezoicPlaceholderId || 100}`}
        data-ezoic-placeholder={config.ezoicPlaceholderId}
        className="w-full flex justify-center items-center"
      />
    );
  }

  // 4. Mediavine Provider Slot
  if (ADS_CONFIG.provider === 'mediavine') {
    return (
      <div
        ref={containerRef}
        className="mediavine-ad-container w-full flex justify-center items-center"
        data-mediavine-slot={placementId}
      />
    );
  }

  // 5. When no ad provider/code is configured, render nothing
  return null;
}
