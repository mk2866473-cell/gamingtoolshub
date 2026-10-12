/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import AdSlot from './AdSlot';
import { isPlacementEnabled } from '../../config/adsConfig';

interface AdLayoutProps {
  currentPath?: string;
  className?: string;
}

/**
 * AdLayout
 * 
 * Reusable layout containers that encapsulate safe spacing, margins, and borders
 * for each designated placement across the site.
 * 
 * Each helper checks whether the placement is enabled before rendering any wrapping markup,
 * ensuring zero leftover margins or empty DOM nodes when ads are disabled.
 */
export const AdLayout = {
  /**
   * Header Banner Layout
   * Positioned below main navigation with clean margins.
   */
  Header: ({ currentPath, className = '' }: AdLayoutProps) => {
    if (!isPlacementEnabled('header-banner', currentPath)) return null;

    return (
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 ${className}`}>
        <AdSlot placement="header-banner" currentPath={currentPath} />
      </div>
    );
  },

  /**
   * Calculator Results Ad Layout
   * Positioned safely below interactive calculation output, separate from user controls.
   */
  Results: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('calculator-results')) return null;

    return (
      <div className={`mt-8 pt-6 border-t border-slate-800/80 ${className}`}>
        <AdSlot placement="calculator-results" />
      </div>
    );
  },

  /**
   * Desktop Sidebar Ad Layout
   * Sits in sidebar on wide desktop layouts, stacks gracefully on mobile.
   */
  Sidebar: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('desktop-sidebar')) return null;

    return (
      <div className={`lg:sticky lg:top-24 space-y-4 ${className}`}>
        <AdSlot placement="desktop-sidebar" />
      </div>
    );
  },

  /**
   * Content Bottom Ad Layout
   * Positioned after guides/FAQs and before related tools.
   */
  Content: ({ className = '' }: { className?: string }) => {
    if (!isPlacementEnabled('content-bottom')) return null;

    return (
      <div className={`my-8 w-full max-w-4xl mx-auto ${className}`}>
        <AdSlot placement="content-bottom" />
      </div>
    );
  },

  /**
   * Mobile Anchor Ad Layout
   * Configurable sticky bottom container for mobile devices only.
   */
  MobileAnchor: ({ currentPath }: { currentPath?: string }) => {
    if (!isPlacementEnabled('mobile-anchor', currentPath)) return null;

    return <AdSlot placement="mobile-anchor" currentPath={currentPath} />;
  },
};

export default AdLayout;
