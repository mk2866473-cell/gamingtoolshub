/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gamepad2, ArrowRight, Box, Crosshair, Swords, Compass } from 'lucide-react';
import { GAMES, TOOLS, getGamePath } from '../data/gamesAndTools';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';
import { PokeballIcon, PalSphereIcon } from '../components/GameIcons';

interface GamesPageProps {
  selectedGameSlug?: string | null;
  onNavigate: (path: string) => void;
}

export default function GamesPage({ selectedGameSlug, onNavigate }: GamesPageProps) {
  const activeGame = GAMES.find(g => g.slug === selectedGameSlug || g.id === selectedGameSlug);
  const breadcrumbs = [
    { name: 'Games', path: '/games' },
    ...(activeGame ? [{ name: activeGame.name, path: getGamePath(activeGame.id) }] : [])
  ];

  return (
    <>
      <SEOHead
        title={activeGame ? `${activeGame.name} Calculators & Tools` : 'Browse Gaming Tools by Game'}
        description={activeGame ? activeGame.description : 'Find calculators, generators, and tools sorted by game: Minecraft, FPS esports, RPGs, and party games.'}
        canonicalPath={activeGame ? `/games?game=${activeGame.slug}` : '/games'}
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-8">
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeGame ? `${activeGame.name} Calculators & Tools` : 'Browse Calculators by Game'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {activeGame ? activeGame.description : 'Select your favorite game to find tailored calculators and utilities.'}
              </p>
            </div>
            {activeGame && (
              <button
                onClick={() => onNavigate('/games')}
                className="text-xs text-emerald-400 hover:text-emerald-300 self-start sm:self-auto"
              >
                ← View All Games
              </button>
            )}
          </div>
        </div>

        {/* Game selection cards if no game selected */}
        {!activeGame && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GAMES.map((game) => {
              const count = TOOLS.filter(t => t.gameId === game.id).length;
              return (
                <div
                  key={game.id}
                  onClick={() => onNavigate(getGamePath(game.id))}
                  className="group bg-[#0e1422] hover:bg-[#12192a] border border-slate-800/90 hover:border-emerald-500/50 rounded-xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#090d16] border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/40">
                        {game.id === 'pokemongo' ? (
                          <PokeballIcon className="w-5 h-5 text-rose-400" />
                        ) : game.id === 'palworld' ? (
                          <PalSphereIcon className="w-5 h-5 text-cyan-400" />
                        ) : game.id === 'minecraft' ? (
                          <Box className="w-5 h-5 text-emerald-400" />
                        ) : game.id === 'fortnite' ? (
                          <Swords className="w-5 h-5 text-amber-400" />
                        ) : game.id === 'roblox' ? (
                          <Gamepad2 className="w-5 h-5 text-rose-400" />
                        ) : game.id === 'genshin' ? (
                          <Compass className="w-5 h-5 text-cyan-400" />
                        ) : game.id === 'fps' ? (
                          <Crosshair className="w-5 h-5 text-violet-400" />
                        ) : (
                          <Gamepad2 className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-400 bg-[#090d16] px-2 py-0.5 rounded border border-slate-800">
                        {count} {count === 1 ? 'Tool' : 'Tools'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400">
                    <span>View Tools</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tools belonging to active game (or all tools) */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">
            {activeGame ? `${activeGame.name} Utilities (${TOOLS.filter(t => t.gameId === activeGame.id).length})` : 'All Available Game Tools'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.filter(t => !activeGame || t.gameId === activeGame.id).map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
