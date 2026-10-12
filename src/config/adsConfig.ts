/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * GAMINGTOOLS HUB — CENTRAL ADVERTISING CONFIGURATION
 * ============================================================================
 * 
 * This file is the single source of truth for all advertising on GamingTools Hub.
 * It is completely ad-network-independent and decoupled from calculator logic.
 * 
 * SAFETY RULES IMPLEMENTED:
 * 1. ALL AD PLACEMENTS ARE DISABLED BY DEFAULT (enabled: false).
 * 2. When disabled, ad components return null, reserving zero space and executing zero scripts.
 * 3. No third-party network scripts are loaded until explicitly configured.
 * 4. Never displays fake ads, fake images, or misleading dummy text.
 * 5. Designed for seamless switching between Monetag, Ezoic, Mediavine, or custom providers.
 */

export type AdPlacementId =
  | 'header-banner'
  | 'calculator-results'
  | 'desktop-sidebar'
  | 'content-bottom'
  | 'mobile-anchor';

export type AdProvider = 'none' | 'monetag' | 'ezoic' | 'mediavine' | 'custom';

export interface AdPlacementConfig {
  /** Master toggle for this individual placement */
  enabled: boolean;
  /** Unique placement identifier */
  id: AdPlacementId;
  /** Human-readable name */
  name: string;
  /** Standard IAB / Provider target dimensions */
  dimensions: string;
  /** Mobile fallback dimensions */
  mobileDimensions: string;
  /** Purpose and placement notes */
  description: string;
  /** Minimum height reserved when enabled to prevent Cumulative Layout Shift (CLS) */
  minHeight: string;
  /** Custom HTML/script code or zone ID for this specific placement */
  customHtml?: string;
  /** Monetag specific Zone ID or Tag ID if using Monetag */
  monetagZoneId?: string;
  /** Ezoic placeholder ID if using Ezoic (e.g., 101, 102) */
  ezoicPlaceholderId?: number;
}

export interface MonetagProviderConfig {
  /** Your Monetag script tag URL (e.g., //alwingulla.com/88/tag.min.js or provided JS) */
  scriptUrl?: string;
  /** Monetag publisher ID or site token */
  siteId?: string;
  /** Optional custom in-page ad tag snippet */
  inPageSnippet?: string;
}

export interface EzoicProviderConfig {
  /** Ezoic property ID or integration script tag */
  publisherId?: string;
}

export interface MediavineProviderConfig {
  /** Mediavine site script / ID */
  siteId?: string;
}

export interface SiteAdsConfig {
  /**
   * GLOBAL MASTER SWITCH
   * When FALSE, NO ads render anywhere on the site, and NO ad scripts load.
   * DEFAULT: false (All placements disabled by default).
   */
  enabled: boolean;

  /**
   * Active ad provider
   * Options: 'none' | 'monetag' | 'ezoic' | 'mediavine' | 'custom'
   * DEFAULT: 'none'
   */
  provider: AdProvider;

  /**
   * Standard compliance label rendered above display units (IAB / Better Ads Standard)
   */
  disclosureLabel: string;

  /**
   * Routes where ads must NEVER be shown (e.g. legal and policy pages)
   */
  disallowedRoutes: string[];

  /**
   * Individual Placement Configurations
   * ALL DISABLED BY DEFAULT.
   */
  placements: Record<AdPlacementId, AdPlacementConfig>;

  /**
   * Provider specific configuration blocks
   */
  monetag: MonetagProviderConfig;
  ezoic: EzoicProviderConfig;
  mediavine: MediavineProviderConfig;
}

export const ADS_CONFIG: SiteAdsConfig = {
  // 1. MASTER TOGGLE - Enabled so you can visually see all ad layout spots on your website
  enabled: true,

  // 2. ACTIVE PROVIDER ('none' renders clear visual placeholder boxes until you add ad code)
  provider: 'none',

  // 3. IAB DISCLOSURE LABEL
  disclosureLabel: 'ADVERTISEMENT',

  // 4. DISALLOWED ROUTES (Privacy, terms, and disclaimer are ad-free for policy compliance)
  disallowedRoutes: ['/privacy', '/terms', '/disclaimer'],

  // 5. INDIVIDUAL PLACEMENT DEFINITIONS - Enabled so you can see where each ad will be placed
  placements: {
    'header-banner': {
      enabled: true,
      id: 'header-banner',
      name: 'Header Banner',
      dimensions: '728 × 90 / 970 × 90',
      mobileDimensions: '320 × 50 / 300 × 50',
      description: 'Horizontal banner below main navigation with clean top/bottom margins. Never mimics nav elements.',
      minHeight: 'min-h-[90px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 101,
      customHtml: '', // <-- PASTE YOUR HEADER AD CODE HERE
    },
    'calculator-results': {
      enabled: true,
      id: 'calculator-results',
      name: 'Calculator Results Banner',
      dimensions: '728 × 90 / 336 × 280',
      mobileDimensions: '300 × 250',
      description: 'Positioned safely below calculator results, separated from input fields and calculate buttons.',
      minHeight: 'min-h-[100px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 102,
      customHtml: '', // <-- PASTE YOUR RESULTS AD CODE HERE
    },
    'desktop-sidebar': {
      enabled: true,
      id: 'desktop-sidebar',
      name: 'Desktop Sidebar Unit',
      dimensions: '300 × 250 / 300 × 600',
      mobileDimensions: '300 × 250',
      description: 'Sidebar skyscraper on desktop layouts. Automatically stacks below calculator on mobile/tablet.',
      minHeight: 'min-h-[250px] lg:min-h-[600px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 103,
      customHtml: '', // <-- PASTE YOUR SIDEBAR AD CODE HERE
    },
    'content-bottom': {
      enabled: true,
      id: 'content-bottom',
      name: 'Content Bottom Banner',
      dimensions: '728 × 90 / 970 × 250',
      mobileDimensions: '300 × 250 / 320 × 50',
      description: 'Positioned after guides, formulas, and FAQs and before Related Tools. Does not interrupt instructions.',
      minHeight: 'min-h-[90px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 104,
      customHtml: '', // <-- PASTE YOUR CONTENT AD CODE HERE
    },
    'mobile-anchor': {
      enabled: false, // Mobile anchor stays disabled until you want sticky bottom on phone
      id: 'mobile-anchor',
      name: 'Mobile Anchor Banner',
      dimensions: '320 × 50 / 300 × 50',
      mobileDimensions: '320 × 50',
      description: 'Sticky bottom banner on mobile screens only. Disabled by default, never obstructs calculator controls.',
      minHeight: 'min-h-[50px]',
      monetagZoneId: '',
      ezoicPlaceholderId: 105,
      customHtml: '',
    },
  },

  // 6. MONETAG CONFIGURATION ADAPTER
  // When you obtain your Monetag code, insert your script URL or Zone IDs here.
  monetag: {
    scriptUrl: '',     // e.g. "//alwingulla.com/88/tag.min.js"
    siteId: '',        // e.g. "1234567"
    inPageSnippet: '', // Optional global snippet
  },

  // 7. EZOIC CONFIGURATION ADAPTER
  ezoic: {
    publisherId: '',   // e.g. "123456"
  },

  // 8. MEDIAVINE CONFIGURATION ADAPTER
  mediavine: {
    siteId: '',        // e.g. "my-gaming-tools"
  },
};

/**
 * Helper to check whether a specific ad placement is permitted to render
 */
export function isPlacementEnabled(
  placementId: AdPlacementId,
  currentPath?: string
): boolean {
  // 1. Check global master switch
  if (!ADS_CONFIG.enabled) return false;

  // 2. Check individual placement toggle
  const placement = ADS_CONFIG.placements[placementId];
  if (!placement || !placement.enabled) return false;

  // 3. Check disallowed route compliance
  if (currentPath) {
    const cleanPath = currentPath.split('?')[0].toLowerCase();
    const isDisallowed = ADS_CONFIG.disallowedRoutes.some(
      route => cleanPath === route || cleanPath.startsWith(`${route}/`)
    );
    if (isDisallowed) return false;
  }

  return true;
}

/**
 * Check if ads in general are permitted on a given path
 */
export function isAdAllowedOnPath(currentPath: string): boolean {
  if (!ADS_CONFIG.enabled) return false;
  const cleanPath = currentPath.split('?')[0].toLowerCase();
  return !ADS_CONFIG.disallowedRoutes.some(
    route => cleanPath === route || cleanPath.startsWith(`${route}/`)
  );
}
