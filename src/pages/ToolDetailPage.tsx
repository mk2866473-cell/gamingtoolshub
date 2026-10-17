/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Star, Users, Clock, ArrowRight, BookOpen, Lightbulb, 
  HelpCircle, ChevronDown, ChevronUp, Share2, Check, Cpu, Binary,
  Calculator, CheckCircle2, Compass, Layers, ExternalLink, Zap
} from 'lucide-react';
import { ToolItem, getGameById, getCategoryById, TOOLS, getGamePath } from '../data/gamesAndTools';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import ToolCard from '../components/ToolCard';
import AdLayout from '../components/ads/AdLayout';
import { 
  getToolWorkedExamples, 
  getToolDeepDive, 
  getEnhancedToolFaqs, 
  getEnhancedToolSeoTitle 
} from '../utils/toolSeoContent';

// Tools components
import MinecraftCircleGenerator from '../components/tools/MinecraftCircleGenerator';
import MinecraftSphereGenerator from '../components/tools/MinecraftSphereGenerator';
import MinecraftDomeGenerator from '../components/tools/MinecraftDomeGenerator';
import MinecraftNetherPortalCalculator from '../components/tools/MinecraftNetherPortalCalculator';
import MinecraftCoordinateConverter from '../components/tools/MinecraftCoordinateConverter';
import MinecraftDistanceCalculator from '../components/tools/MinecraftDistanceCalculator';
import MinecraftXpCalculator from '../components/tools/MinecraftXpCalculator';
import MinecraftEnchantmentCalculator from '../components/tools/MinecraftEnchantmentCalculator';
import MinecraftAnvilCostCalculator from '../components/tools/MinecraftAnvilCostCalculator';
import MinecraftStackCalculator from '../components/tools/MinecraftStackCalculator';
import MinecraftBeaconCalculator from '../components/tools/MinecraftBeaconCalculator';
import MinecraftDamageCalculator from '../components/tools/MinecraftDamageCalculator';
import MinecraftRedstoneTickCalculator from '../components/tools/MinecraftRedstoneTickCalculator';
import MinecraftFurnaceFuelCalculator from '../components/tools/MinecraftFurnaceFuelCalculator';
import MinecraftOvalGenerator from '../components/tools/MinecraftOvalGenerator';
// Roblox tools
import RobuxTaxCalculator from '../components/tools/RobuxTaxCalculator';
import RobuxCalculator from '../components/tools/RobuxCalculator';
import RobloxDevExCalculator from '../components/tools/RobloxDevExCalculator';
import BloxFruitsCalculator from '../components/tools/BloxFruitsCalculator';
import BloxFruitsXpCalculator from '../components/tools/BloxFruitsXpCalculator';
import BloxFruitsStatCalculator from '../components/tools/BloxFruitsStatCalculator';
import BloxFruitsDamageCalculator from '../components/tools/BloxFruitsDamageCalculator';
import RobloxGamepassRevenueCalculator from '../components/tools/RobloxGamepassRevenueCalculator';
import RobloxDeveloperEarningsCalculator from '../components/tools/RobloxDeveloperEarningsCalculator';
import RobloxPremiumPayoutCalculator from '../components/tools/RobloxPremiumPayoutCalculator';
// Fortnite tools
import FortniteXpCalculator from '../components/tools/FortniteXpCalculator';
import FortniteBattlePassCalculator from '../components/tools/FortniteBattlePassCalculator';
import FortniteLevelCalculator from '../components/tools/FortniteLevelCalculator';
import FortniteXpRequiredCalculator from '../components/tools/FortniteXpRequiredCalculator';
import FortniteSensitivityConverter from '../components/tools/FortniteSensitivityConverter';
import FortniteEdpiCalculator from '../components/tools/FortniteEdpiCalculator';
import FortniteDamageCalculator from '../components/tools/FortniteDamageCalculator';
import FortniteFallDamageCalculator from '../components/tools/FortniteFallDamageCalculator';
import FortniteDistanceCalculator from '../components/tools/FortniteDistanceCalculator';
import FortniteSessionTimer from '../components/tools/FortniteSessionTimer';
// Pokémon GO tools
import PokemonGoCpCalculator from '../components/tools/PokemonGoCpCalculator';
import PokemonGoIvCalculator from '../components/tools/PokemonGoIvCalculator';
import PokemonGoEvolutionCpCalculator from '../components/tools/PokemonGoEvolutionCpCalculator';
import PokemonGoLevelCalculator from '../components/tools/PokemonGoLevelCalculator';
import PokemonGoStardustCalculator from '../components/tools/PokemonGoStardustCalculator';
import PokemonGoCandyCalculator from '../components/tools/PokemonGoCandyCalculator';
import PokemonGoPowerUpCostCalculator from '../components/tools/PokemonGoPowerUpCostCalculator';
import PokemonGoRaidDamageCalculator from '../components/tools/PokemonGoRaidDamageCalculator';
import PokemonGoPvpCalculator from '../components/tools/PokemonGoPvpCalculator';
import PokemonGoCatchCpCalculator from '../components/tools/PokemonGoCatchCpCalculator';
// Palworld tools
import PalworldBreedingCalculator from '../components/tools/PalworldBreedingCalculator';
import PalworldReverseBreedingCalculator from '../components/tools/PalworldReverseBreedingCalculator';
import PalworldBreedingPathFinder from '../components/tools/PalworldBreedingPathFinder';
import PalworldIvCalculator from '../components/tools/PalworldIvCalculator';
import PalworldDamageCalculator from '../components/tools/PalworldDamageCalculator';
import PalworldCaptureCalculator from '../components/tools/PalworldCaptureCalculator';
import PalworldWorkSpeedCalculator from '../components/tools/PalworldWorkSpeedCalculator';
import PalworldBaseTeamCalculator from '../components/tools/PalworldBaseTeamCalculator';
import PalworldCraftingCalculator from '../components/tools/PalworldCraftingCalculator';
import PalworldMaterialCalculator from '../components/tools/PalworldMaterialCalculator';
import PalworldCondensationCalculator from '../components/tools/PalworldCondensationCalculator';
import PalworldTechPointCalculator from '../components/tools/PalworldTechPointCalculator';
import TeamGenerator from '../components/tools/TeamGenerator';
import GamingDecisionWheel from '../components/tools/GamingDecisionWheel';
import ModularGamingTool from '../components/tools/ModularGamingTool';

interface ToolDetailPageProps {
  tool: ToolItem;
  onNavigate: (path: string) => void;
}

export default function ToolDetailPage({ tool, onNavigate }: ToolDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const game = getGameById(tool.gameId);
  const category = getCategoryById(tool.categoryId);

  // Dynamic component map
  const renderToolComponent = () => {
    switch (tool.id) {
      case 'minecraft-circle-generator':
        return <MinecraftCircleGenerator />;
      case 'minecraft-sphere-generator':
        return <MinecraftSphereGenerator />;
      case 'minecraft-dome-generator':
        return <MinecraftDomeGenerator />;
      case 'minecraft-nether-portal-calculator':
        return <MinecraftNetherPortalCalculator />;
      case 'minecraft-coordinate-converter':
        return <MinecraftCoordinateConverter />;
      case 'minecraft-distance-calculator':
        return <MinecraftDistanceCalculator />;
      case 'minecraft-xp-calculator':
        return <MinecraftXpCalculator />;
      case 'minecraft-enchantment-calculator':
        return <MinecraftEnchantmentCalculator />;
      case 'minecraft-anvil-cost-calculator':
        return <MinecraftAnvilCostCalculator />;
      case 'minecraft-stack-calculator':
        return <MinecraftStackCalculator />;
      case 'minecraft-beacon-calculator':
        return <MinecraftBeaconCalculator />;
      case 'minecraft-damage-calculator':
        return <MinecraftDamageCalculator />;
      case 'minecraft-redstone-tick-calculator':
        return <MinecraftRedstoneTickCalculator />;
      case 'minecraft-furnace-fuel-calculator':
        return <MinecraftFurnaceFuelCalculator />;
      case 'minecraft-oval-generator':
        return <MinecraftOvalGenerator />;
      case 'robux-tax-calculator':
        return <RobuxTaxCalculator />;
      case 'robux-calculator':
        return <RobuxCalculator />;
      case 'roblox-devex-calculator':
        return <RobloxDevExCalculator />;
      case 'blox-fruits-calculator':
        return <BloxFruitsCalculator />;
      case 'blox-fruits-xp-calculator':
        return <BloxFruitsXpCalculator />;
      case 'blox-fruits-stat-calculator':
        return <BloxFruitsStatCalculator />;
      case 'blox-fruits-damage-calculator':
        return <BloxFruitsDamageCalculator />;
      case 'roblox-gamepass-revenue-calculator':
        return <RobloxGamepassRevenueCalculator />;
      case 'roblox-developer-earnings-calculator':
        return <RobloxDeveloperEarningsCalculator />;
      case 'roblox-premium-payout-calculator':
        return <RobloxPremiumPayoutCalculator />;
      case 'fortnite-xp-calculator':
        return <FortniteXpCalculator />;
      case 'fortnite-battle-pass-calculator':
        return <FortniteBattlePassCalculator />;
      case 'fortnite-level-calculator':
        return <FortniteLevelCalculator />;
      case 'fortnite-xp-required-calculator':
        return <FortniteXpRequiredCalculator />;
      case 'fortnite-sensitivity-converter':
        return <FortniteSensitivityConverter />;
      case 'fortnite-edpi-calculator':
        return <FortniteEdpiCalculator />;
      case 'fortnite-damage-calculator':
        return <FortniteDamageCalculator />;
      case 'fortnite-fall-damage-calculator':
        return <FortniteFallDamageCalculator />;
      case 'fortnite-distance-calculator':
        return <FortniteDistanceCalculator />;
      case 'fortnite-session-timer':
        return <FortniteSessionTimer />;
      case 'pokemon-go-cp-calculator':
        return <PokemonGoCpCalculator />;
      case 'pokemon-go-iv-calculator':
        return <PokemonGoIvCalculator />;
      case 'pokemon-go-evolution-cp-calculator':
        return <PokemonGoEvolutionCpCalculator />;
      case 'pokemon-go-level-calculator':
        return <PokemonGoLevelCalculator />;
      case 'pokemon-go-stardust-calculator':
        return <PokemonGoStardustCalculator />;
      case 'pokemon-go-candy-calculator':
        return <PokemonGoCandyCalculator />;
      case 'pokemon-go-power-up-cost-calculator':
        return <PokemonGoPowerUpCostCalculator />;
      case 'pokemon-go-raid-damage-calculator':
        return <PokemonGoRaidDamageCalculator />;
      case 'pokemon-go-pvp-calculator':
        return <PokemonGoPvpCalculator />;
      case 'pokemon-go-catch-cp-calculator':
        return <PokemonGoCatchCpCalculator />;
      case 'palworld-breeding-calculator':
        return <PalworldBreedingCalculator />;
      case 'palworld-reverse-breeding-calculator':
        return <PalworldReverseBreedingCalculator />;
      case 'palworld-breeding-path-finder':
        return <PalworldBreedingPathFinder />;
      case 'palworld-iv-calculator':
        return <PalworldIvCalculator />;
      case 'palworld-damage-calculator':
        return <PalworldDamageCalculator />;
      case 'palworld-capture-calculator':
        return <PalworldCaptureCalculator />;
      case 'palworld-work-speed-calculator':
        return <PalworldWorkSpeedCalculator />;
      case 'palworld-base-team-calculator':
        return <PalworldBaseTeamCalculator />;
      case 'palworld-crafting-calculator':
        return <PalworldCraftingCalculator />;
      case 'palworld-material-calculator':
        return <PalworldMaterialCalculator />;
      case 'palworld-condensation-calculator':
        return <PalworldCondensationCalculator />;
      case 'palworld-tech-point-calculator':
        return <PalworldTechPointCalculator />;
      case 'team-generator':
        return <TeamGenerator />;
      case 'gaming-decision-wheel':
        return <GamingDecisionWheel />;
      default:
        return <ModularGamingTool tool={tool} />;
    }
  };

  const gamePath = game ? getGamePath(game.id) : '/games';

  const breadcrumbs = [
    ...(game ? [{ name: game.name, path: gamePath }] : []),
    ...(category ? [{ name: category.name, path: `/categories?cat=${category.id}` }] : []),
    { name: tool.name, path: `/tools/${tool.slug}` }
  ];

  const relatedTools = useMemo(() => {
    const specific = tool.relatedToolIds
      .map(id => TOOLS.find(t => t.id === id))
      .filter((t): t is ToolItem => Boolean(t && t.id !== tool.id));
    const sameGame = TOOLS.filter(
      t => t.gameId === tool.gameId && t.id !== tool.id && !specific.some(s => s.id === t.id)
    );
    const sameCategory = TOOLS.filter(
      t => t.categoryId === tool.categoryId && t.id !== tool.id && !specific.some(s => s.id === t.id) && !sameGame.some(s => s.id === t.id)
    );
    return [...specific, ...sameGame, ...sameCategory].slice(0, 6);
  }, [tool]);

  // Sibling tools in the same game for the Game Hub linking module
  const gameTools = useMemo(() => {
    return TOOLS.filter(t => t.gameId === tool.gameId && t.id !== tool.id).slice(0, 6);
  }, [tool.gameId, tool.id]);

  // Enhanced SEO Content: Worked Examples, Mechanics Deep-Dive & Verified FAQs
  const workedExamples = useMemo(() => getToolWorkedExamples(tool), [tool]);
  const deepDive = useMemo(() => getToolDeepDive(tool), [tool]);
  const enhancedFaqs = useMemo(() => getEnhancedToolFaqs(tool), [tool]);
  const enhancedTitle = useMemo(() => getEnhancedToolSeoTitle(tool), [tool]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <>
      <SEOHead
        title={enhancedTitle}
        description={tool.metaDescription}
        canonicalPath={tool.canonicalPath}
        tool={tool}
        breadcrumbs={breadcrumbs}
      />

      <div className="space-y-10">
        {/* Breadcrumb & Header Metadata */}
        <div>
          <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {game && (
                  <button
                    onClick={() => onNavigate(gamePath)}
                    className="text-xs font-semibold text-slate-300 hover:text-emerald-400 font-mono transition-colors"
                  >
                    {game.name}
                  </button>
                )}
                {category && (
                  <>
                    <span className="text-slate-600">·</span>
                    <button
                      onClick={() => onNavigate(`/categories?cat=${category.id}`)}
                      className="text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {category.name}
                    </button>
                  </>
                )}
                {tool.badge && (
                  <>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-emerald-400">
                      {tool.badge}
                    </span>
                  </>
                )}
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-500 font-mono">Verified Engine</span>
              </div>

              {/* One Clear H1 for SEO */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {tool.h1}
              </h1>

              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Right Meta & Share button */}
            <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                  <strong>{tool.rating}</strong>
                </span>
                <span>•</span>
                <span>{tool.userCount}</span>
              </div>
              <button
                onClick={handleShare}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center gap-1.5 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {copiedLink ? 'Link Copied!' : 'Share Tool'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid with Desktop Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column: Calculator + Explanations + FAQs (8 cols on lg/xl) */}
          <div className="lg:col-span-8 space-y-8">
            {/* The Interactive Tool Container */}
            <div>
              {renderToolComponent()}

              {/* Placement 2: Calculator Results Ad Banner */}
              <AdLayout.Results />
            </div>

            {/* Step-by-Step How To Guide */}
            <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  How to Use the {tool.name}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {tool.howToGuide.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tool.howToGuide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-[#090d16] border border-slate-800/90 rounded-xl p-4 flex gap-3.5"
                  >
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-slate-200 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Formula & Algorithm Explained Section */}
            <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <Binary className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {tool.formulaExplained.title}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line">
                {tool.formulaExplained.details}
              </p>

              {tool.formulaExplained.mathSnippet && (
                <div className="bg-[#090d16] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <code>{tool.formulaExplained.mathSnippet}</code>
                </div>
              )}
            </section>

            {/* 3 to 5 Worked Real-World Examples & Scenarios */}
            {workedExamples && workedExamples.length > 0 && (
              <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Calculator className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Worked Examples & Real-World Scenarios ({workedExamples.length})
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
                    Verified Calculations
                  </span>
                </div>

                <div className="space-y-5">
                  {workedExamples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-[#090d16] border border-slate-800/90 rounded-xl p-5 space-y-3.5 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center font-mono">
                            {idx + 1}
                          </span>
                          {ex.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Scenario: </strong>
                        {ex.scenario}
                      </p>

                      {/* Input parameters */}
                      <div className="bg-[#0c121e] border border-slate-800/80 rounded-lg p-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-1.5">
                          Input Parameters
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(ex.inputValues).map(([k, v]) => (
                            <span
                              key={k}
                              className="text-xs font-mono bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded text-slate-300"
                            >
                              <span className="text-slate-500">{k}:</span> <strong className="text-white">{v}</strong>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Step-by-Step Calculation */}
                      <div className="text-xs font-mono text-cyan-300/90 bg-cyan-950/20 border border-cyan-800/30 rounded-lg p-3">
                        <span className="text-[10px] text-cyan-400 uppercase tracking-wider block mb-1 font-sans font-semibold">
                          Step-by-Step Calculation:
                        </span>
                        <code>{ex.calculation}</code>
                      </div>

                      {/* Practical Result & Takeaway */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3">
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-0.5">
                            In-Game Result
                          </span>
                          <span className="text-xs text-slate-200 font-semibold">
                            {ex.result}
                          </span>
                        </div>

                        <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3">
                          <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-0.5">
                            Pro Strategy
                          </span>
                          <span className="text-xs text-slate-300">
                            {ex.takeaway}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* In-Depth Engine Mechanics & Technical Guide */}
            {deepDive && (
              <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {deepDive.title}
                  </h2>
                </div>

                <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4 text-xs sm:text-sm text-indigo-200 leading-relaxed font-medium">
                  {deepDive.summary}
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {deepDive.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Technical Architecture Highlights
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {deepDive.keyPoints.map((pt, idx) => (
                      <div
                        key={idx}
                        className="bg-[#090d16] border border-slate-800 rounded-lg p-3 flex items-start gap-2.5 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Pro Gaming Tips */}
            {tool.proTips && tool.proTips.length > 0 && (
              <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Pro Tips & Optimization Strategies
                  </h2>
                </div>

                <ul className="space-y-2.5">
                  {tool.proTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="text-amber-400 mt-0.5 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Enhanced Frequently Asked Questions Accordion */}
            {enhancedFaqs && enhancedFaqs.length > 0 && (
              <section className="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Frequently Asked Questions ({enhancedFaqs.length})
                    </h2>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    Updated
                  </span>
                </div>

                <div className="space-y-3">
                  {enhancedFaqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-[#090d16] border border-slate-800 rounded-xl overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                        >
                          <span>{faq.question}</span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/80">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Dedicated Game Hub & Ecosystem Linking Module */}
            {game && (
              <section className="bg-gradient-to-r from-[#0d1627] to-[#0a101d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                      Official Game Knowledge Hub
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-emerald-400" />
                      More {game.name} Calculators & Tools
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                      Access the full suite of {game.name} utilities, builders, conversion charts, and calculators in our dedicated game center.
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate(gamePath)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20 self-start sm:self-auto flex-shrink-0"
                  >
                    <span>Visit {game.name} Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sibling tools quick links */}
                {gameTools.length > 0 && (
                  <div className="pt-3 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                      Popular {game.name} utilities:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {gameTools.map(t => (
                        <button
                          key={t.id}
                          onClick={() => onNavigate(`/tools/${t.slug}`)}
                          className="px-2.5 py-1 text-xs rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{t.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Desktop Sidebar Column (4 cols on lg/xl) */}
          {/* Sits alongside on wide desktop, stacks below main content on smaller screens */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="lg:sticky lg:top-24 space-y-3.5">
              {/* Ultra-Compact Tool Overview (Saves 160px vertical height so sidebar ad stays high above-the-fold) */}
              <div className="bg-[#0e1422] border border-slate-800 rounded-xl p-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-2">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Tool Overview
                  </span>
                  <button
                    onClick={handleShare}
                    className="text-[11px] font-medium text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 flex items-center gap-1 transition-colors"
                    title="Share this tool"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                    <span>{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#090d16] px-2.5 py-1 rounded-lg border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Game</span>
                    <button
                      onClick={() => onNavigate(gamePath)}
                      className="font-semibold text-emerald-400 hover:underline truncate block max-w-full text-left"
                    >
                      {game?.name || 'General'}
                    </button>
                  </div>

                  <div className="bg-[#090d16] px-2.5 py-1 rounded-lg border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 block">Platform</span>
                    <span className="font-mono text-slate-200 truncate block text-left">
                      {tool.badge || 'Universal'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Placement 3: Desktop Sidebar Ad Banner (Positioned BELOW Tool Overview) */}
              <AdLayout.Sidebar />
            </div>
          </aside>
        </div>

        {/* Placement 4: Content Bottom Banner Ad (Directly before Related Tools) */}
        <AdLayout.Content />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Related {game?.name || 'Gaming'} Tools & Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((relTool) => (
                <ToolCard
                  key={relTool.id}
                  tool={relTool}
                  onSelectTool={(slug) => onNavigate(`/tools/${slug}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
