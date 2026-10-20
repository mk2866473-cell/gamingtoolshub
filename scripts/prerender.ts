/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { TOOLS, GAMES, CATEGORIES, getGameById, getCategoryById, getGamePath } from '../src/data/gamesAndTools';
import { 
  getToolWorkedExamples, 
  getToolDeepDive, 
  getEnhancedToolFaqs, 
  getEnhancedToolSeoTitle 
} from '../src/utils/toolSeoContent';

const DIST_DIR = path.resolve('dist');
const BASE_TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const DOMAIN = 'https://gamingtoolshub.com';

if (!fs.existsSync(BASE_TEMPLATE_PATH)) {
  console.error('Error: dist/index.html does not exist. Run vite build first!');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(BASE_TEMPLATE_PATH, 'utf-8');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function writeHtmlForRoute(routePath: string, htmlContent: string) {
  const cleanPath = routePath.replace(/^\//, '').replace(/\/$/, '');
  let targetFile: string;

  if (cleanPath === '') {
    targetFile = path.join(DIST_DIR, 'index.html');
  } else {
    const targetDir = path.join(DIST_DIR, cleanPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    targetFile = path.join(targetDir, 'index.html');
  }

  fs.writeFileSync(targetFile, htmlContent, 'utf-8');
}

/**
 * 1. Pre-render All Tool Pages
 */
let renderedCount = 0;

TOOLS.forEach(tool => {
  const enhancedTitle = getEnhancedToolSeoTitle(tool);
  const fullTitle = `${enhancedTitle} | GamingToolsHub`;
  const canonicalUrl = `${DOMAIN}/tools/${tool.slug}`;
  const game = getGameById(tool.gameId);
  const gameName = game?.name || 'Gaming';
  const gamePath = getGamePath(tool.gameId);
  const workedExamples = getToolWorkedExamples(tool);
  const deepDive = getToolDeepDive(tool);
  const enhancedFaqs = getEnhancedToolFaqs(tool);

  // Construct JSON-LD Structured Data
  const jsonLdSchemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      url: canonicalUrl,
      applicationCategory: 'GameApplication',
      operatingSystem: 'All Modern Browsers',
      description: tool.metaDescription,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: DOMAIN
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: gameName,
          item: `${DOMAIN}${gamePath}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: tool.name,
          item: canonicalUrl
        }
      ]
    }
  ];

  if (enhancedFaqs.length > 0) {
    jsonLdSchemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: enhancedFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLdSchemas, null, 2)}\n</script>`;

  // Build rich pre-rendered HTML body content
  const prerenderedBody = `
    <div class="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <div>
        <!-- Static Top Navigation Header -->
        <header class="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080c14]/95 backdrop-blur-md">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 gap-4">
              <a href="/" class="flex items-center gap-2.5 group">
                <span class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-black text-emerald-400 text-sm">G</span>
                <span class="font-extrabold text-base tracking-tight text-white">GamingTools<span class="text-emerald-400">Hub</span></span>
              </a>
              <nav class="hidden md:flex items-center gap-6 text-xs text-slate-300">
                <a href="/tools" class="hover:text-emerald-400">All Tools</a>
                <a href="/games/minecraft" class="hover:text-emerald-400">Minecraft</a>
                <a href="/games/roblox" class="hover:text-emerald-400">Roblox</a>
                <a href="/games/fortnite" class="hover:text-emerald-400">Fortnite</a>
                <a href="/games/pokemongo" class="hover:text-emerald-400">Pokémon GO</a>
                <a href="/games/palworld" class="hover:text-emerald-400">Palworld</a>
              </nav>
            </div>
          </div>
        </header>

        <!-- Main Tool Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div class="space-y-10">
            <!-- Breadcrumbs -->
            <nav aria-label="Breadcrumb" class="mb-4">
              <ol class="flex items-center flex-wrap gap-1.5 text-xs text-zinc-400">
                <li><a href="/" class="hover:text-emerald-400 transition-colors py-1">Home</a></li>
                <li class="text-zinc-600">/</li>
                <li><a href="${gamePath}" class="hover:text-emerald-400 transition-colors py-1">${escapeHtml(gameName)}</a></li>
                <li class="text-zinc-600">/</li>
                <li><span class="text-zinc-200 font-medium">${escapeHtml(tool.name)}</span></li>
              </ol>
            </nav>

            <!-- H1 & Description -->
            <div class="pb-4 border-b border-zinc-800">
              <div class="flex items-center gap-2 mb-2 text-xs font-mono">
                <a href="${gamePath}" class="text-slate-300 hover:text-emerald-400 font-semibold">${escapeHtml(gameName)}</a>
                <span class="text-slate-600">·</span>
                <span class="text-emerald-400">${escapeHtml(tool.badge || 'Universal')}</span>
                <span class="text-slate-600">·</span>
                <span class="text-slate-500">Verified Engine</span>
              </div>
              <h1 class="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">${escapeHtml(tool.h1 || enhancedTitle)}</h1>
              <p class="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">${escapeHtml(tool.description)}</p>
            </div>

            <!-- Interactive Tool Loading Placeholder (Hydrates instantly in browser) -->
            <div class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[350px] flex flex-col items-center justify-center text-center">
              <div class="w-10 h-10 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin mb-4"></div>
              <p class="text-sm font-semibold text-white">Loading ${escapeHtml(tool.name)} Engine...</p>
              <p class="text-xs text-slate-400 mt-1">Instant client-side calculation with zero server lag.</p>
            </div>

            <!-- How to Use Step-by-Step Guide -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 class="text-lg sm:text-xl font-bold text-white">How to Use the ${escapeHtml(tool.name)}</h2>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">${escapeHtml(tool.howToGuide.overview)}</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${tool.howToGuide.steps.map((step, idx) => `
                  <div class="bg-[#090d16] border border-slate-800/90 rounded-xl p-4 flex gap-3.5">
                    <span class="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">${idx + 1}</span>
                    <div>
                      <h3 class="text-xs font-bold text-slate-200 mb-1">${escapeHtml(step.title)}</h3>
                      <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(step.description)}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Formula & Algorithm Explained -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 class="text-lg sm:text-xl font-bold text-white">${escapeHtml(tool.formulaExplained.title)}</h2>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed whitespace-pre-line">${escapeHtml(tool.formulaExplained.details)}</p>
              ${tool.formulaExplained.mathSnippet ? `
                <div class="bg-[#090d16] border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 overflow-x-auto">
                  <code>${escapeHtml(tool.formulaExplained.mathSnippet)}</code>
                </div>
              ` : ''}
            </section>

            <!-- 3 to 5 Worked Real-World Examples & Scenarios -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 class="text-lg sm:text-xl font-bold text-white">Worked Real-World Examples & Scenarios (${workedExamples.length})</h2>
              <div class="space-y-5">
                ${workedExamples.map((ex, idx) => `
                  <div class="bg-[#090d16] border border-slate-800/90 rounded-xl p-5 space-y-3.5">
                    <h3 class="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <span class="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-center font-mono">${idx + 1}</span>
                      ${escapeHtml(ex.title)}
                    </h3>
                    <p class="text-xs text-slate-400 leading-relaxed"><strong class="text-slate-300">Scenario: </strong>${escapeHtml(ex.scenario)}</p>
                    <div class="text-xs font-mono text-cyan-300/90 bg-cyan-950/20 border border-cyan-800/30 rounded-lg p-3">
                      <span class="text-[10px] text-cyan-400 uppercase tracking-wider block mb-1 font-sans font-semibold">Calculation:</span>
                      <code>${escapeHtml(ex.calculation)}</code>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div class="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-3">
                        <span class="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-0.5">In-Game Result</span>
                        <span class="text-xs text-slate-200 font-semibold">${escapeHtml(ex.result)}</span>
                      </div>
                      <div class="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3">
                        <span class="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-0.5">Pro Strategy</span>
                        <span class="text-xs text-slate-300">${escapeHtml(ex.takeaway)}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Technical Mechanics Deep Dive -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
              <h2 class="text-lg sm:text-xl font-bold text-white">${escapeHtml(deepDive.title)}</h2>
              <div class="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4 text-xs sm:text-sm text-indigo-200 leading-relaxed font-medium">
                ${escapeHtml(deepDive.summary)}
              </div>
              <div class="space-y-3.5 text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                ${deepDive.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
              </div>
            </section>

            <!-- Frequently Asked Questions -->
            <section class="bg-[#0e1422] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 class="text-lg sm:text-xl font-bold text-white">Frequently Asked Questions (${enhancedFaqs.length})</h2>
              <div class="space-y-3">
                ${enhancedFaqs.map(faq => `
                  <div class="bg-[#090d16] border border-slate-800 rounded-xl p-4">
                    <h3 class="text-xs sm:text-sm font-semibold text-slate-200">${escapeHtml(faq.question)}</h3>
                    <div class="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">${escapeHtml(faq.answer)}</div>
                  </div>
                `).join('')}
              </div>
            </section>

            <!-- Game Knowledge Hub Linking Card -->
            <section class="bg-gradient-to-r from-[#0d1627] to-[#0a101d] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 class="text-lg sm:text-xl font-bold text-white">Explore all ${escapeHtml(gameName)} Calculators & Tools</h2>
              <p class="text-xs text-slate-400 max-w-xl">Access the full suite of ${escapeHtml(gameName)} utilities, builders, conversion charts, and calculators in our dedicated game center.</p>
              <a href="${gamePath}" class="inline-block px-4 py-2 bg-emerald-500 text-black font-semibold text-xs rounded-xl hover:bg-emerald-400 transition-all">Visit ${escapeHtml(gameName)} Hub →</a>
            </section>
          </div>
        </main>

        <!-- Static Footer -->
        <footer class="border-t border-slate-800/80 bg-[#060910] py-8 text-center text-xs text-slate-500">
          <p>© 2026 GamingToolsHub. Built for high-performance precision gaming calculations.</p>
        </footer>
      </div>
    </div>
  `;

  // Inject meta tags and prerendered body into base template
  let pageHtml = baseTemplate;

  // Replace Title
  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`);

  // Replace Meta Description
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${escapeHtml(tool.metaDescription)}" />`
  );

  // Replace Canonical Link
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OpenGraph Title & Description & URL
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${escapeHtml(tool.metaDescription)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Replace Twitter Title & Description
  pageHtml = pageHtml.replace(
    /<meta name="twitter:title" content=".*?" \/>/i,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta name="twitter:description" content=".*?" \/>/i,
    `<meta name="twitter:description" content="${escapeHtml(tool.metaDescription)}" />`
  );

  // Inject JSON-LD Schema before </head>
  pageHtml = pageHtml.replace('</head>', `${jsonLdScript}\n</head>`);

  // Inject Pre-rendered Content into <div id="root"></div>
  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${prerenderedBody}</div>`);

  writeHtmlForRoute(`/tools/${tool.slug}`, pageHtml);
  renderedCount++;
});

console.log(`Successfully pre-rendered ${renderedCount} tool pages with clean URLs and rich SEO content!`);

/**
 * 2. Pre-render Hub and Static Pages
 */
const staticHubPages = [
  {
    path: '/tools',
    title: 'All Gaming Calculators, Generators & Precision Utilities | GamingToolsHub',
    description: 'Browse 100+ precision gaming calculators, circle generators, XP estimators, and converters for Minecraft, Roblox, Fortnite, Pokémon GO, and Palworld.',
  },
  {
    path: '/games',
    title: 'Gaming Hubs & Tools by Game | GamingToolsHub',
    description: 'Explore comprehensive toolkits, math engines, and converters organized by game: Minecraft, Roblox, Fortnite, Pokémon GO, and Palworld.',
  },
  {
    path: '/categories',
    title: 'Gaming Tools by Category – Calculators, Generators & Planners | GamingToolsHub',
    description: 'Filter gaming tools by category: Calculators, Generators, Converters, Planners, and Trackers.',
  },
  {
    path: '/games/minecraft',
    title: 'Minecraft Calculators, Generators & Blueprint Tools | GamingToolsHub',
    description: 'Pixel-perfect circle generators, 3D sphere planners, nether portal 8:1 linkers, XP formulas, and anvil cost calculators for Minecraft.',
  },
  {
    path: '/minecraft',
    title: 'Minecraft Calculators, Generators & Blueprint Tools | GamingToolsHub',
    description: 'Pixel-perfect circle generators, 3D sphere planners, nether portal 8:1 linkers, XP formulas, and anvil cost calculators for Minecraft.',
  },
  {
    path: '/games/roblox',
    title: 'Roblox Calculators – Robux Tax, DevEx & Blox Fruits Tools | GamingToolsHub',
    description: '30% Robux tax calculators, official DevEx cashout estimators, developer earnings, and Blox Fruits trading calculators.',
  },
  {
    path: '/roblox',
    title: 'Roblox Calculators – Robux Tax, DevEx & Blox Fruits Tools | GamingToolsHub',
    description: '30% Robux tax calculators, official DevEx cashout estimators, developer earnings, and Blox Fruits trading calculators.',
  },
  {
    path: '/games/fortnite',
    title: 'Fortnite Battle Pass XP & Sensitivity Calculators | GamingToolsHub',
    description: 'Season level pacers, 80k XP Battle Pass target calculators, mouse sensitivity converters, and eDPI estimators for Fortnite.',
  },
  {
    path: '/fortnite',
    title: 'Fortnite Battle Pass XP & Sensitivity Calculators | GamingToolsHub',
    description: 'Season level pacers, 80k XP Battle Pass target calculators, mouse sensitivity converters, and eDPI estimators for Fortnite.',
  },
  {
    path: '/games/pokemongo',
    title: 'Pokémon GO CP, IV & Evolution Calculators | GamingToolsHub',
    description: 'Accurate CP multipliers, raid catch IV appraisals, Great League PvP stat product optimizers, and Stardust powerup cost planners.',
  },
  {
    path: '/pokemongo',
    title: 'Pokémon GO CP, IV & Evolution Calculators | GamingToolsHub',
    description: 'Accurate CP multipliers, raid catch IV appraisals, Great League PvP stat product optimizers, and Stardust powerup cost planners.',
  },
  {
    path: '/games/palworld',
    title: 'Palworld Breeding & Stat Calculators | GamingToolsHub',
    description: 'Breeding combination calculators, reverse lineage search, IV calculators, and condensation requirements for Palworld.',
  },
  {
    path: '/palworld',
    title: 'Palworld Breeding & Stat Calculators | GamingToolsHub',
    description: 'Breeding combination calculators, reverse lineage search, IV calculators, and condensation requirements for Palworld.',
  },
  {
    path: '/games/genshin',
    title: 'Genshin Impact Calculators & Pity Planners | GamingToolsHub',
    description: 'Wish pity estimators, Primogem planners, resin refill timers, and artifact crit value calculators for Genshin Impact.',
  },
  {
    path: '/genshin',
    title: 'Genshin Impact Calculators & Pity Planners | GamingToolsHub',
    description: 'Wish pity estimators, Primogem planners, resin refill timers, and artifact crit value calculators for Genshin Impact.',
  },
  {
    path: '/about',
    title: 'About GamingToolsHub – Precision Gaming Utilities',
    description: 'Learn about GamingToolsHub: fast, accurate, client-side gaming calculators built by passionate gamers.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | GamingToolsHub',
    description: 'Privacy policy for GamingToolsHub. We do not store or sell your personal gaming calculations.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | GamingToolsHub',
    description: 'Terms of service and acceptable usage guidelines for GamingToolsHub.',
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer | GamingToolsHub',
    description: 'Legal disclaimer and trademark notices for GamingToolsHub.',
  }
];

staticHubPages.forEach(p => {
  let pageHtml = baseTemplate;
  const canonicalUrl = `${DOMAIN}${p.path}`;

  pageHtml = pageHtml.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(p.title)}</title>`);
  pageHtml = pageHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${escapeHtml(p.description)}" />`
  );
  pageHtml = pageHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${escapeHtml(p.title)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${escapeHtml(p.description)}" />`
  );
  pageHtml = pageHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  writeHtmlForRoute(p.path, pageHtml);
});

console.log(`Pre-rendered ${staticHubPages.length} hub and static pages!`);

/**
 * 3. Generate Intelligent GitHub Pages 404.html with SPA Redirect
 * This guarantees that even if a dynamic or unlisted URL is accessed, GitHub Pages preserves the URL without 404ing!
 */
const spa404Script = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>GamingToolsHub - Redirecting...</title>
    <script>
      // Single Page App redirect for GitHub Pages
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
  <body style="background:#080c14;color:#94a3b8;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
    <p>Redirecting to requested page...</p>
  </body>
</html>
`;

fs.writeFileSync(path.join(DIST_DIR, '404.html'), spa404Script.trim(), 'utf-8');
console.log('Generated GitHub Pages intelligent 404.html SPA redirect!');
