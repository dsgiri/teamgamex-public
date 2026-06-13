import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/BlogLayout'
import { initialGames, GameActivity } from 'lib/mockData'

export default function IndexPage() {
  const [games, setGames] = useState<GameActivity[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

  useEffect(() => {
    // In a real app we might load this from Sanity or Supabase, fallback to initialGames
    const localSaved = localStorage.getItem('teamgamex_submissions')
    let submissions: GameActivity[] = []
    if (localSaved) {
      try {
        submissions = JSON.parse(localSaved).filter((s: GameActivity) => s.status === 'live')
      } catch (e) {
        console.error(e)
      }
    }
    setGames([...initialGames, ...submissions])
  }, [])

  // Filter Logic
  const filteredGames = games.filter((game) => {
    const categoryMatch =
      selectedCategory === 'all' ||
      game.category.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'low mobility' && game.mobility === 'seated') ||
      (selectedCategory === 'groups 5+' && game.playersMin >= 5)

    const platformMatch =
      selectedPlatform === 'all' ||
      game.platform.toLowerCase() === selectedPlatform.toLowerCase()

    return categoryMatch && platformMatch
  })

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'memory', name: 'Memory' },
    { id: 'movement', name: 'Movement' },
    { id: 'trivia', name: 'Trivia' },
    { id: 'music', name: 'Music' },
    { id: 'low mobility', name: 'Low mobility' },
    { id: 'groups 5+', name: 'Groups 5+' },
  ]

  const platforms = [
    { id: 'all', name: 'All' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'linkedin', name: 'LinkedIn' },
  ]

  return (
    <Layout>
      <Head>
        <title>TeamGameX | Team games for senior and assisted living</title>
        <meta
          name="description"
          content="A curated video directory of real team games played in care homes and senior communities."
        />
      </Head>

      <div className="bg-slate-900 text-white min-h-screen font-sans">
        {/* Navigation Bar */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800">
          <Link href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
            Team<span className="text-blue-500">Game</span>X.
          </Link>
          <div className="flex items-center gap-8 text-sm font-bold text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Directory</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">About</Link>
            <Link href="/submit" className="hover:text-white transition-colors">Submit a game</Link>
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl transition-colors border border-slate-700"
            >
              Get the gear
            </a>
          </div>
        </nav>

        {/* Hero Header */}
        <header className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-6">
            <span>💚</span> For senior & assisted living
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.15]">
            Team games that improve memory, engagement & joy.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            A curated video directory of real team games played in care homes and senior communities — with gear links so you can run them today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#directory-section"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-8 py-4 rounded-xl transition-colors text-center"
            >
              Browse games
            </a>
            <Link
              href="/submit"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold px-8 py-4 rounded-xl transition-colors border border-slate-700 text-center"
            >
              Submit a game
            </Link>
          </div>
        </header>

        {/* Directory Section */}
        <section id="directory-section" className="max-w-6xl mx-auto px-6 pb-24">
          <div className="bg-slate-950/40 border border-slate-800 rounded-3xl p-8 mb-12 space-y-6">
            {/* Filters */}
            <div className="flex flex-col gap-6">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-black uppercase tracking-widest text-slate-500 mr-2">Filter:</span>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Platform Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-black uppercase tracking-widest text-slate-500 mr-2">Platform:</span>
                {platforms.map((plat) => (
                  <button
                    key={plat.id}
                    onClick={() => setSelectedPlatform(plat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedPlatform === plat.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {plat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGames.map((game) => (
                <Link
                  key={game.id}
                  href={`/play/${game.slug}`}
                  className="group bg-slate-950/50 border border-slate-850 hover:border-slate-700 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Placeholder */}
                    <div className="relative aspect-video bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6 flex items-center justify-center">
                      {/* Platform Icon Overlay */}
                      <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-300 border border-slate-800">
                        {game.platform}
                      </span>
                      <span className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-300">
                        {game.durationMin} min
                      </span>
                      {/* Fun category icon fallback */}
                      <span className="text-4xl select-none">
                        {game.category === 'movement' && '🏃'}
                        {game.category === 'music' && '🎵'}
                        {game.category === 'memory' && '🧠'}
                        {game.category === 'creative' && '🎨'}
                        {game.category === 'social' && '💬'}
                        {game.category === 'trivia' && '💡'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {game.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        {game.category}
                      </span>
                      <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                        {game.gearCost === '~$0' || game.gearCost === 'Low cost' || !game.gearCost ? 'Free' : 'Low cost'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold pt-4 border-t border-slate-850">
                    <span className="flex items-center gap-1.5">👥 {game.playersMin}–{game.playersMax} players</span>
                    <span className="flex items-center gap-1.5">⏱️ {game.durationMin} min</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-950/10">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-slate-400 font-bold">No games found matching the active filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedPlatform('all')
                }}
                className="mt-4 text-sm font-bold text-blue-500 hover:text-blue-400"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}