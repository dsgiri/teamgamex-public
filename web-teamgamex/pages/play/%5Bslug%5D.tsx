import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from 'components/BlogLayout'
import VideoPlayer from 'components/VideoPlayer'
import { initialGames, GameActivity } from 'lib/mockData'

export default function PlayGamePage() {
  const router = useRouter()
  const { slug } = router.query
  const [games, setGames] = useState<GameActivity[]>([])
  const [game, setGame] = useState<GameActivity | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const localSaved = localStorage.getItem('teamgamex_submissions')
    let submissions: GameActivity[] = []
    if (localSaved) {
      try {
        submissions = JSON.parse(localSaved).filter((s: GameActivity) => s.status === 'live')
      } catch (e) {
        console.error(e)
      }
    }
    const allGames = [...initialGames, ...submissions]
    setGames(allGames)

    if (slug) {
      const found = allGames.find((g) => g.slug === slug)
      setGame(found || null)
    }
  }, [slug])

  if (!game) {
    return (
      <Layout>
        <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center">
          <p className="text-xl font-bold mb-4">Activity not found.</p>
          <Link href="/" className="text-blue-500 hover:underline">Back to directory</Link>
        </div>
      </Layout>
    )
  }

  // Get up next/related videos (excluding the current one)
  const upNext = games.filter((g) => g.id !== game.id).slice(0, 4)

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Layout>
      <Head>
        <title>{game.title} | TeamGameX</title>
        <meta name="description" content={game.description} />
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
              href={game.gearUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl transition-colors"
            >
              Get the gear
            </a>
          </div>
        </nav>

        {/* Detail Body */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white mb-8 transition-colors">
            <span>←</span> Back to directory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Video & Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Player */}
              <div className="bg-black aspect-video rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative">
                {game.videoUrl.includes('youtube') || game.videoUrl.includes('youtu.be') ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${game.embedId}`}
                    title={game.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-8 bg-slate-950">
                    <VideoPlayer url={game.videoUrl} title={game.title} />
                  </div>
                )}
              </div>

              {/* Title & Tags */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                  {game.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                    {game.category}
                  </span>
                  <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                    {game.mobility} mobility friendly
                  </span>
                  <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                    {game.gearCost} cost
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-950/40 border border-slate-800 rounded-3xl p-8 space-y-4">
                <h2 className="text-lg font-bold text-slate-300 uppercase tracking-widest text-[10px]">Description</h2>
                <p className="text-slate-300 text-lg leading-relaxed">{game.description}</p>
              </div>

              {/* Structured Metadata Panel */}
              <div className="bg-slate-950/60 border border-slate-850 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Players</span>
                  <span className="text-2xl font-black text-white">{game.playersMin}–{game.playersMax}</span>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Duration</span>
                  <span className="text-2xl font-black text-white">{game.durationMin} min</span>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Mobility</span>
                  <span className="text-2xl font-black text-white capitalize">{game.mobility === 'all' ? 'All levels' : game.mobility}</span>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Gear Cost</span>
                  <span className="text-2xl font-black text-white">{game.gearCost}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={game.gearUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 bg-blue-650 hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-center transition-colors border border-blue-600 shadow-lg shadow-blue-950/40"
                >
                  🛒 Get the gear — Amazon
                </a>
                <a
                  href={game.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl text-center transition-colors border border-slate-700"
                >
                  🔗 Watch original
                </a>
                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl transition-colors border border-slate-700 flex items-center justify-center gap-2"
                >
                  <span>📢</span> {copied ? 'Copied Link!' : 'Share'}
                </button>
              </div>
            </div>

            {/* Right: Up Next Sidebar */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Up next</h3>
              <div className="space-y-4">
                {upNext.map((next) => (
                  <Link
                    key={next.id}
                    href={`/play/${next.slug}`}
                    className="flex gap-4 p-4 bg-slate-950/40 border border-slate-850 hover:border-slate-750 rounded-2xl transition-all group"
                  >
                    <div className="w-24 h-16 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center justify-center text-xl shrink-0">
                      {next.category === 'movement' && '🏃'}
                      {next.category === 'music' && '🎵'}
                      {next.category === 'memory' && '🧠'}
                      {next.category === 'creative' && '🎨'}
                      {next.category === 'social' && '💬'}
                      {next.category === 'trivia' && '💡'}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {next.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-bold capitalize">{next.category} · {next.durationMin} min</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
