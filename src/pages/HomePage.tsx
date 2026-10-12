/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Zap, ArrowRight, Search, ChevronDown, ChevronUp,
  Award, Shield, Swords, Layers, Box, Compass, Calculator,
  Shapes, ArrowLeftRight, Clock, Dices, Crosshair, Gamepad2, Check
} from 'lucide-react';
import { TOOLS, GAMES, CATEGORIES, ToolItem, getGamePath } from '../data/gamesAndTools';
import ToolCard from '../components/ToolCard';
import SEOHead from '../components/SEOHead';
import { PokeballIcon, PalSphereIcon } from '../components/GameIcons';
import AdLayout from '../components/ads/AdLayout';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export default function HomePage({ onNavigate, onOpenSearch }: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [heroSearch, setHeroSearch] = useState<string>('');

  // 1. Popular Curated Games (Ordered: Minecraft, Roblox, Fortnite, Pokémon GO, Palworld, Genshin Impact)
  const popularGames = useMemo(() => {
    return [
      {
        id: 'minecraft',
        name: 'Minecraft',
        subtitle: 'Java & Bedrock Parity',
        description: 'Voxel circle generators, 3D Nether portal linkers, XP levels, redstone timings, and villager discounts.',
        count: TOOLS.filter(t => t.gameId === 'minecraft').length,
        path: getGamePath('minecraft'),
        icon: <Box className="w-5 h-5 text-emerald-400" />,
        accent: 'border-emerald-500/30 group-hover:border-emerald-500/60'
      },
      {
        id: 'roblox',
        name: 'Roblox',
        subtitle: 'DevEx & Trading',
        description: 'Robux to USD DevEx converter ($0.0035 rate), official 30% tax models, and Blox Fruits trading value evaluators.',
        count: TOOLS.filter(t => t.gameId === 'roblox').length,
        path: getGamePath('roblox'),
        icon: <Gamepad2 className="w-5 h-5 text-rose-400" />,
        accent: 'border-rose-500/30 group-hover:border-rose-500/60'
      },
      {
        id: 'fortnite',
        name: 'Fortnite',
        subtitle: 'Chapter 5 & Zero Build',
        description: 'V-Bucks to real currency, weapon DPS & Zero Build TTK, Battle Pass XP curves, and storm phase survival timers.',
        count: TOOLS.filter(t => t.gameId === 'fortnite').length,
        path: getGamePath('fortnite'),
        icon: <Swords className="w-5 h-5 text-amber-400" />,
        accent: 'border-amber-500/30 group-hover:border-amber-500/60'
      },
      {
        id: 'pokemongo',
        name: 'Pokémon GO',
        subtitle: 'Season of Max Out',
        description: 'Official CPM Combat Power calculators, IV appraisal, PvP league rank builders, and Level 50 XL candy budgets.',
        count: TOOLS.filter(t => t.gameId === 'pokemongo').length,
        path: getGamePath('pokemongo'),
        icon: <PokeballIcon className="w-5 h-5 text-rose-400" />,
        accent: 'border-rose-500/30 group-hover:border-rose-500/60'
      },
      {
        id: 'palworld',
        name: 'Palworld',
        subtitle: 'v0.3.5 & Sakurajima',
        description: 'Official CombiRank breeding calculators, reverse breeding, 0–30% IV talent appraisal, and base team optimizers.',
        count: TOOLS.filter(t => t.gameId === 'palworld').length,
        path: getGamePath('palworld'),
        icon: <PalSphereIcon className="w-5 h-5 text-cyan-400" />,
        accent: 'border-cyan-500/30 group-hover:border-cyan-500/60'
      },
      {
        id: 'genshin',
        name: 'Genshin Impact',
        subtitle: 'Version 5.x Fontaine & Natlan',
        description: 'Wish soft pity probability counters, 200 resin cap timers, artifact Crit Value (CV) calculators, and ascension mora.',
        count: TOOLS.filter(t => t.gameId === 'genshin').length,
        path: getGamePath('genshin'),
        icon: <Compass className="w-5 h-5 text-cyan-400" />,
        accent: 'border-cyan-500/30 group-hover:border-cyan-500/60'
      }
    ];
  }, []);

  // 2. Curated Featured Tools (Exact 6 Strong Tools)
  const popularTools = useMemo(() => {
    const featuredIds = [
      'palworld-breeding-calculator',
      'minecraft-circle-generator',
      'pokemon-go-cp-calculator',
      'genshin-pity-calculator',
      'robux-to-usd-calculator',
      'fortnite-weapon-dps-calculator'
    ];
    return featuredIds
      .map(id => TOOLS.find(t => t.id === id || t.slug === id))
      .filter((t): t is ToolItem => Boolean(t));
  }, []);

  // 3. Recommended 6 Categories
  const categoryCards = useMemo(() => {
    return [
      {
        id: 'calculators',
        name: 'Calculators',
        description: 'Game-specific calculations, stats, damage, XP, CP and more.',
        count: TOOLS.filter(t => t.categoryId === 'calculators').length,
        icon: <Calculator className="w-5 h-5 text-emerald-400" />
      },
      {
        id: 'generators',
        name: 'Generators',
        description: 'Blueprints, circles, layouts, teams and other generators.',
        count: TOOLS.filter(t => t.categoryId === 'generators').length,
        icon: <Shapes className="w-5 h-5 text-cyan-400" />
      },
      {
        id: 'converters',
        name: 'Converters',
        description: 'Coordinates, sensitivity, DPI/eDPI and other conversions.',
        count: TOOLS.filter(t => t.categoryId === 'converters').length,
        icon: <ArrowLeftRight className="w-5 h-5 text-violet-400" />
      },
      {
        id: 'planners',
        name: 'Planners',
        description: 'Breeding, builds, resources, progression and planning tools.',
        count: TOOLS.filter(t => t.categoryId === 'planners').length,
        icon: <Layers className="w-5 h-5 text-amber-400" />
      },
      {
        id: 'trackers',
        name: 'Trackers',
        description: 'Session, progression and game-related tracking utilities.',
        count: TOOLS.filter(t => t.categoryId === 'trackers').length,
        icon: <Clock className="w-5 h-5 text-rose-400" />
      },
      {
        id: 'gaming-utilities',
        name: 'Gaming Utilities',
        description: "Useful tools that don't fit a single calculator category.",
        count: TOOLS.filter(t => t.categoryId === 'gaming-utilities').length,
        icon: <Dices className="w-5 h-5 text-teal-400" />
      }
    ];
  }, []);

  // 4. Recently Added Tools
  const recentlyAddedTools = useMemo(() => {
    const recentIds = [
      'palworld-passive-skills-stacker',
      'minecraft-villager-trade-calculator',
      'valorant-edpi-calculator',
      'genshin-artifact-cv-calculator',
      'pokemon-go-mega-energy-calculator',
      'minecraft-elytra-rocket-calculator'
    ];
    return recentIds
      .map(id => TOOLS.find(t => t.id === id || t.slug === id))
      .filter((t): t is ToolItem => Boolean(t));
  }, []);

  // Live matching results when user types in the main hero search bar
  const searchMatches = useMemo(() => {
    if (!heroSearch.trim()) return [];
    const q = heroSearch.toLowerCase().trim();
    return TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [heroSearch]);

  const homeFaqs = [
    {
      q: 'Do all calculators run locally in the browser?',
      a: 'Yes. All mathematical models, voxel generation algorithms, CombiRank breeding calculators, sensitivity conversions, and damage formulas execute client-side using native JavaScript and HTML5 Canvas. Your calculations are instant with zero server latency.'
    },
    {
      q: 'Are the formulas verified against current official game patches?',
      a: 'Yes. All utilities reflect verified theorycrafting formulas: Minecraft 1.21.x Tricky Trials, Palworld v0.3.5 / Sakurajima update, Pokémon GO Level 50 CPM tables, Genshin Impact 5.x banner soft pity curves, Fortnite Chapter 5 weapon dynamics, and official Roblox DevEx $0.0035 rates.'
    },
    {
      q: 'Are any downloads, plugins, or extensions required?',
      a: 'None. All calculations run directly in your web browser with zero downloads, plugins, or browser extensions needed.'
    },
    {
      q: 'Do I need an account, login, or Discord connection?',
      a: 'No accounts, sign-ins, or cookies are required. All tools and generators are 100% free and open for immediate use.'
    }
  ];

  return (
    <>
      <SEOHead
        title="GamingTools Hub – Precision Gaming Calculators & Digital Utilities"
        description="Precision gaming calculators and utilities for Minecraft, Palworld, Genshin Impact, FPS esports, Roblox, Fortnite, and Pokémon GO. 100% client-side with zero latency."
        canonicalPath="/"
      />

      <div className="space-y-16 sm:space-y-24">
        {/* ========================================================= */}
        {/* 1 & 2. HERO SECTION                                      */}
        {/* ========================================================= */}
        <section className="relative pt-4 sm:pt-10 pb-2 text-center">
          {/* Trust/Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-[#0d131f] border border-slate-800 text-[11px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-medium text-slate-300">Free • Browser-Based • Gaming Tools</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight sm:leading-tight mb-2.5">
            Gaming Calculators{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              & Tools
            </span>
          </h1>

          {/* Supporting Headline */}
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-slate-200 tracking-tight mb-3">
            Calculate. Optimize. Play Better.
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            Free browser-based calculators, generators, planners and gaming utilities for Minecraft, Pokémon GO, Palworld, Fortnite, Roblox and more.
          </p>

          {/* ========================================================= */}
          {/* 3. MAIN SEARCH                                           */}
          {/* ========================================================= */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex items-center gap-2 p-1.5 bg-[#0e1422] border border-slate-800 rounded-xl shadow-2xl focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
              <div className="flex items-center gap-2.5 flex-1 px-3 text-slate-400">
                <Search className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      if (searchMatches.length > 0) {
                        onNavigate(`/tools/${searchMatches[0].slug}`);
                        setHeroSearch('');
                      } else if (heroSearch.trim()) {
                        onNavigate('/tools');
                      }
                    }
                  }}
                  placeholder="Search gaming tools, calculators and generators..."
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              {heroSearch && (
                <button
                  onClick={() => setHeroSearch('')}
                  className="text-xs text-slate-500 hover:text-slate-300 pr-1.5"
                >
                  Clear
                </button>
              )}

              <button
                onClick={onOpenSearch}
                className="px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 flex-shrink-0"
                title="Open search modal (Ctrl+K / ⌘K)"
              >
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 rounded border border-slate-700">
                  ⌘K
                </kbd>
                <span>Search</span>
              </button>
            </div>

            {/* Live Search Instant Dropdown */}
            {heroSearch && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#0e1422] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-30 text-left">
                {searchMatches.length > 0 ? (
                  <div className="divide-y divide-slate-800/80">
                    {searchMatches.map(tool => (
                      <div
                        key={tool.id}
                        onClick={() => {
                          onNavigate(`/tools/${tool.slug}`);
                          setHeroSearch('');
                        }}
                        className="p-3.5 hover:bg-slate-800/60 cursor-pointer flex items-center justify-between transition-colors group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                            {tool.name}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {tool.shortDescription}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-3" />
                      </div>
                    ))}
                    <div className="p-2.5 bg-[#090d15] text-center">
                      <button
                        onClick={() => {
                          onNavigate('/tools');
                          setHeroSearch('');
                        }}
                        className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
                      >
                        Explore all tools in directory →
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No calculators found matching "{heroSearch}".
                  </div>
                )}
              </div>
            )}

            {/* Primary CTA & Popular Suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
              <button
                onClick={() => onNavigate('/tools')}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-950/40"
              >
                <span>Explore Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="hidden sm:inline-block w-px h-4 bg-slate-800 mx-1" />

              <span className="text-slate-500 text-xs font-medium">Popular:</span>
              {[
                { label: 'Palworld Breeding', path: '/tools/palworld-breeding-calculator' },
                { label: 'Circle Generator', path: '/tools/minecraft-circle-generator' },
                { label: 'Sensitivity 1:1', path: '/tools/universal-mouse-sensitivity-converter' },
                { label: 'Wish Pity', path: '/tools/genshin-pity-calculator' },
                { label: 'CP Calculator', path: '/tools/pokemon-go-cp-calculator' },
                { label: 'DevEx Robux', path: '/tools/robux-to-usd-calculator' }
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.path)}
                  className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800/80 text-slate-400 hover:text-emerald-400 hover:border-slate-700 transition-colors text-xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. POPULAR GAMES                                         */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Popular Games
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Curated theorycrafting hubs and calculator suites for top competitive titles
              </p>
            </div>
            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto group"
            >
              <span>View All Tools →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularGames.map(game => (
              <div
                key={game.id}
                onClick={() => onNavigate(game.path)}
                className={`group bg-[#0e1422] hover:bg-[#12192a] border ${game.accent} rounded-xl p-5 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#090d16] border border-slate-800 flex items-center justify-center">
                      {game.icon}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900/90 border border-slate-800/90 px-2 py-0.5 rounded">
                      {game.count} Tools
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {game.name}
                  </h3>
                  <div className="text-[11px] text-emerald-400/90 font-mono mb-2">
                    {game.subtitle}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                  <span>Open Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. FEATURED TOOLS                                        */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                  Curated Selection
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Featured Tools
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Handpicked, high-accuracy calculators and generators for key competitive games
              </p>
            </div>

            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto group"
            >
              <span>View All Tools →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                onNavigateToGame={(gameSlug) => onNavigate(`/games?game=${gameSlug}`)}
              />
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('/tools')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e1422] hover:bg-[#12192a] border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all group"
            >
              <span>View All Tools →</span>
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. BROWSE BY CATEGORY                                    */}
        {/* ========================================================= */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Browse by Category
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Explore utilities organized by functional purpose and theorycrafting discipline
              </p>
            </div>
            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto group transition-colors"
            >
              <span>View All Tools →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {categoryCards.map(category => (
              <div
                key={category.id}
                onClick={() => onNavigate(`/tools?category=${category.id}`)}
                className="group bg-[#0e1422] hover:bg-[#12192a] border border-slate-800/90 hover:border-emerald-500/50 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#090d16] border border-slate-800 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      {category.count} Tools
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                  <span className="inline-flex items-center gap-1.5 group-hover:underline">
                    View Tools
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. RECENTLY ADDED                                        */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Fresh Mechanics Updates
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Recently Added
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                New calculators calibrated for recent game balance expansions and patches
              </p>
            </div>

            <button
              onClick={() => onNavigate('/tools')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto group"
            >
              <span>View All Tools →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentlyAddedTools.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                onNavigateToGame={(gameSlug) => onNavigate(`/games?game=${gameSlug}`)}
              />
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('/tools')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e1422] hover:bg-[#12192a] border border-slate-800 hover:border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all group"
            >
              <span>View All Tools →</span>
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. SHORT "WHY GAMINGTOOLS HUB?" SECTION                  */}
        {/* ========================================================= */}
        <section className="bg-[#0e1422] border border-slate-800/90 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
              Product Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1.5 mb-3 tracking-tight">
              Why Gamers Choose GamingTools Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Maintained by competitive players and software engineers. Unlike cluttered gaming wikis with disruptive popups and heavy ad scripts, GamingTools Hub is engineered like a fast SaaS application for instant reference while you play.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-800/80">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#090d16] border border-slate-800 flex items-center justify-center text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">0ms Server Latency</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All math, voxel canvas generators, and simulation engines run client-side on your device without server delay.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#090d16] border border-slate-800 flex items-center justify-center text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Verified Theorycrafting</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Formulas are grounded in official game decompilations, verified patch notes, and empirical testing.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#090d16] border border-slate-800 flex items-center justify-center text-emerald-400">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">100% Free Access</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every calculator, planner, and blueprint generator is completely free to use with zero subscriptions, paywalls, or mandatory login walls.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#090d16] border border-slate-800 flex items-center justify-center text-cyan-400">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Second Monitor Ready</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Responsive layouts designed to snap cleanly on a 2nd monitor, tablet, or phone without breaking UI.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. FAQ                                                   */}
        {/* ========================================================= */}
        <section className="space-y-4 max-w-4xl mx-auto">
          <div className="border-b border-slate-800 pb-3 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Everything you need to know about formulas and calculation mechanics</p>
          </div>

          <div className="space-y-2">
            {homeFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-800/90 rounded-lg overflow-hidden bg-[#0d131f]"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10. HOMEPAGE BOTTOM AD BANNER                             */}
        {/* ========================================================= */}
        <section aria-label="Advertisement" className="max-w-4xl mx-auto pt-2 pb-6">
          <AdLayout.Content />
        </section>
      </div>
    </>
  );
}
