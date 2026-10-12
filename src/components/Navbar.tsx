/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Menu, X, ChevronDown, Box, Gamepad2, Swords, Compass, 
  Calculator, Shapes, ArrowLeftRight, Layers, Clock, Dices, ArrowRight 
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { TOOLS, getPrimaryGames, getGamePath } from '../data/gamesAndTools';
import { PokeballIcon, PalSphereIcon } from './GameIcons';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

const GAME_NAV_ICONS: Record<string, React.ReactNode> = {
  minecraft: <Box className="w-4 h-4 text-emerald-400" />,
  roblox: <Gamepad2 className="w-4 h-4 text-rose-400" />,
  fortnite: <Swords className="w-4 h-4 text-amber-400" />,
  pokemongo: <PokeballIcon className="w-4 h-4 text-rose-400" />,
  palworld: <PalSphereIcon className="w-4 h-4 text-cyan-400" />,
  genshin: <Compass className="w-4 h-4 text-cyan-400" />
};

export default function Navbar({ currentPath, onNavigate, onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileGamesOpen, setMobileGamesOpen] = useState(true);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const gamesRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const gamesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const categoriesTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleGamesMouseEnter = () => {
    if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    setCategoriesOpen(false);
    setGamesOpen(true);
  };

  const handleGamesMouseLeave = () => {
    if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
    gamesTimerRef.current = setTimeout(() => {
      setGamesOpen(false);
    }, 150);
  };

  const handleCategoriesMouseEnter = () => {
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
    setGamesOpen(false);
    setCategoriesOpen(true);
  };

  const handleCategoriesMouseLeave = () => {
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    categoriesTimerRef.current = setTimeout(() => {
      setCategoriesOpen(false);
    }, 150);
  };

  // Close menus on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (gamesRef.current && !gamesRef.current.contains(target)) {
        setGamesOpen(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(target)) {
        setCategoriesOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setGamesOpen(false);
        setCategoriesOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
      if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    };
  }, []);

  const handleLinkClick = (path: string) => {
    if (gamesTimerRef.current) clearTimeout(gamesTimerRef.current);
    if (categoriesTimerRef.current) clearTimeout(categoriesTimerRef.current);
    onNavigate(path);
    setMobileMenuOpen(false);
    setGamesOpen(false);
    setCategoriesOpen(false);
  };

  // Curated Games list derived from centralized source of truth
  const gamesList = getPrimaryGames().map(game => ({
    name: game.name,
    path: getGamePath(game.id),
    count: TOOLS.filter(t => t.gameId === game.id).length,
    icon: GAME_NAV_ICONS[game.id] || <Gamepad2 className="w-4 h-4 text-emerald-400" />
  }));

  // Categories list for dropdown
  const categoriesList = [
    {
      name: 'Calculators',
      path: '/tools?category=calculators',
      description: 'Game-specific calculations, stats, damage & XP',
      count: TOOLS.filter(t => t.categoryId === 'calculators').length,
      icon: <Calculator className="w-4 h-4 text-emerald-400" />
    },
    {
      name: 'Generators',
      path: '/tools?category=generators',
      description: 'Blueprints, circles, layouts & brackets',
      count: TOOLS.filter(t => t.categoryId === 'generators').length,
      icon: <Shapes className="w-4 h-4 text-cyan-400" />
    },
    {
      name: 'Converters',
      path: '/tools?category=converters',
      description: 'Coordinates, sensitivity & DPI/eDPI conversions',
      count: TOOLS.filter(t => t.categoryId === 'converters').length,
      icon: <ArrowLeftRight className="w-4 h-4 text-violet-400" />
    },
    {
      name: 'Planners',
      path: '/tools?category=planners',
      description: 'Breeding, builds, resources & progression',
      count: TOOLS.filter(t => t.categoryId === 'planners').length,
      icon: <Layers className="w-4 h-4 text-amber-400" />
    },
    {
      name: 'Trackers',
      path: '/tools?category=trackers',
      description: 'Session, progression & game tracking utilities',
      count: TOOLS.filter(t => t.categoryId === 'trackers').length,
      icon: <Clock className="w-4 h-4 text-rose-400" />
    },
    {
      name: 'Gaming Utilities',
      path: '/tools?category=gaming-utilities',
      description: "Useful tools that don't fit a single category",
      count: TOOLS.filter(t => t.categoryId === 'gaming-utilities').length,
      icon: <Dices className="w-4 h-4 text-teal-400" />
    }
  ];

  const isGamesActive = currentPath.startsWith('/games') || 
    currentPath.startsWith('/minecraft') || 
    currentPath.startsWith('/roblox') || 
    currentPath.startsWith('/fortnite') || 
    currentPath.startsWith('/pokemongo') || 
    currentPath.startsWith('/palworld');

  const isCategoriesActive = currentPath.startsWith('/categories') || currentPath.includes('category=');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080c14]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. Brand Logo */}
          <div className="flex items-center gap-8 flex-shrink-0">
            <button
              onClick={() => handleLinkClick('/')}
              className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-lg p-0.5"
            >
              <BrandLogo size="md" />
              <div>
                <span className="text-base font-extrabold tracking-tight text-white flex items-center">
                  GamingTools<span className="text-emerald-400 font-mono ml-0.5">Hub</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono block -mt-0.5 tracking-wide">
                  Gaming Utilities
                </span>
              </div>
            </button>

            {/* 2. Scalable Main Navigation (Desktop) */}
            <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
              {/* Games Dropdown */}
              <div 
                className="relative" 
                ref={gamesRef}
                onMouseEnter={handleGamesMouseEnter}
                onMouseLeave={handleGamesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setGamesOpen(prev => !prev);
                    setCategoriesOpen(false);
                  }}
                  aria-expanded={gamesOpen}
                  aria-haspopup="true"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 ${
                    gamesOpen || isGamesActive
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <span>Games</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${gamesOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
                </button>

                {/* Games Menu */}
                {gamesOpen && (
                  <div 
                    className="absolute top-full left-0 pt-1.5 w-64 z-50 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="bg-[#0e1422] border border-slate-800 rounded-xl shadow-2xl py-1.5">
                      <div className="px-3.5 py-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold border-b border-slate-800/80">
                        Popular Game Suites
                      </div>

                      <div className="p-1 space-y-0.5">
                        {gamesList.map(game => (
                          <button
                            key={game.name}
                            onClick={() => handleLinkClick(game.path)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800/70 flex items-center justify-between text-xs transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded bg-[#090d16] border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-slate-700">
                                {game.icon}
                              </div>
                              <span className="text-slate-200 group-hover:text-emerald-400 font-medium">
                                {game.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400">
                              {game.count}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-1 mt-1 border-t border-slate-800/80 p-1.5">
                        <button
                          onClick={() => handleLinkClick('/games')}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-slate-800/50 flex items-center justify-between transition-colors"
                        >
                          <span>More Games</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Categories Dropdown */}
              <div 
                className="relative" 
                ref={categoriesRef}
                onMouseEnter={handleCategoriesMouseEnter}
                onMouseLeave={handleCategoriesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => {
                    setCategoriesOpen(prev => !prev);
                    setGamesOpen(false);
                  }}
                  aria-expanded={categoriesOpen}
                  aria-haspopup="true"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 ${
                    categoriesOpen || isCategoriesActive
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${categoriesOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                </button>

                {/* Categories Menu */}
                {categoriesOpen && (
                  <div 
                    className="absolute top-full left-0 pt-1.5 w-72 z-50 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="bg-[#0e1422] border border-slate-800 rounded-xl shadow-2xl py-1.5">
                      <div className="px-3.5 py-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-500 font-semibold border-b border-slate-800/80">
                        Functional Categories
                      </div>

                      <div className="p-1 space-y-0.5">
                        {categoriesList.map(cat => (
                          <button
                            key={cat.name}
                            onClick={() => handleLinkClick(cat.path)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800/70 flex items-center justify-between text-xs transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded bg-[#090d16] border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-slate-700">
                                {cat.icon}
                              </div>
                              <div>
                                <div className="text-slate-200 group-hover:text-cyan-400 font-medium">
                                  {cat.name}
                                </div>
                                <div className="text-[10px] text-slate-500 line-clamp-1">
                                  {cat.description}
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 ml-2">
                              {cat.count}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="pt-1 mt-1 border-t border-slate-800/80 p-1.5">
                        <button
                          onClick={() => handleLinkClick('/categories')}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50 flex items-center justify-between transition-colors"
                        >
                          <span>All Categories Overview</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* All Tools Link */}
              <button
                onClick={() => handleLinkClick('/tools')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 ${
                  currentPath === '/tools'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                }`}
              >
                All Tools
              </button>
            </nav>
          </div>

          {/* 3. Search Bar (Highly Visible on Desktop) & Mobile Toggle */}
          <div className="flex items-center gap-2.5 flex-1 max-w-xs sm:max-w-sm justify-end">
            <button
              onClick={onOpenSearch}
              className="w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-between px-3 py-2 rounded-xl bg-[#0e1422] hover:bg-[#12192a] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-all shadow-inner focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 group"
              title="Search gaming tools (Ctrl+K / ⌘K)"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform" />
                <span className="truncate text-slate-400 group-hover:text-slate-300">Search gaming tools...</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-700/80 rounded flex-shrink-0 ml-1.5">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 flex-shrink-0"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Professional Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d15] px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0e1422] border border-slate-800 text-slate-400 text-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search gaming tools...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-700 rounded">
              ⌘K
            </kbd>
          </button>

          {/* All Tools Primary Mobile Button */}
          <button
            onClick={() => handleLinkClick('/tools')}
            className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
              currentPath === '/tools'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-200 hover:text-white'
            }`}
          >
            <span>All Tools Directory</span>
            <span className="text-[10px] font-mono bg-[#080c14] px-2 py-0.5 rounded text-emerald-400">
              {TOOLS.length} Tools
            </span>
          </button>

          {/* Games Accordion */}
          <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-[#0d131f]">
            <button
              onClick={() => setMobileGamesOpen(!mobileGamesOpen)}
              className="w-full p-3 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300"
            >
              <span>Games</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileGamesOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileGamesOpen && (
              <div className="px-2 pb-2 space-y-1 border-t border-slate-800/60 pt-1.5">
                {gamesList.map(item => (
                  <button
                    key={item.name}
                    onClick={() => handleLinkClick(item.path)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{item.count}</span>
                  </button>
                ))}
                <button
                  onClick={() => handleLinkClick('/games')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center justify-between border-t border-slate-800/40 mt-1 pt-1.5"
                >
                  <span>More Games →</span>
                </button>
              </div>
            )}
          </div>

          {/* Categories Accordion */}
          <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-[#0d131f]">
            <button
              onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
              className="w-full p-3 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300"
            >
              <span>Categories</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileCategoriesOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileCategoriesOpen && (
              <div className="px-2 pb-2 space-y-1 border-t border-slate-800/60 pt-1.5">
                {categoriesList.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => handleLinkClick(cat.path)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800/60 hover:text-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{cat.count}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
