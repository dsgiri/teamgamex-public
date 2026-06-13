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
        <div className="bg-[#faf6f0] text-slate-800 min-h-screen flex flex-col items-center justify-center">
          <p className="text-xl font-bold mb-4">Activity not found.</p>
          <Link href="/" className="text-indigo-650 hover:underline font-bold">Back to directory</Link>
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

      <div className="bg-[#faf6f0] text-slate-800 min-h-screen font-sans">
        {/* Navigation Bar */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-b-2 border-[#f0e8dc] mb-12">
          <Link href="/" className="text-3xl font-black tracking-tight text-indigo-950 flex items-center gap-2 hover:scale-105 transition-transform">
            <span className="bg-gradient-to-tr from-amber-400 to-rose-450 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-amber-500/30">🎯</span>
            TeamGameX
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-indigo-650 transition-colors">🎈 Game Directory</Link>
            <Link href="/disclaimer" className="hover:text-indigo-650 transition-colors">💬 About Us</Link>
            <Link href="/submit" className="hover:text-indigo-650 transition-colors">➕ Submit a Game</Link>
          </div>
        </nav>

        {/* Detail Body */}
        <main className="max-w-6xl mx-auto px-6 pb-24">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-indigo-650 mb-8 transition-colors">
            <span>←</span> Back to directory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Video & Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Player */}
              <div className="bg-slate-900 aspect-video rounded-[2rem] overflow-hidden border-2 border-[#e6dec8] shadow-xl relative">
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
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  {game.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-rose-100 border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl">
                    {game.category}
                  </span>
                  <span className="bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl">
                    🪑 {game.mobility} mobility friendly
                  </span>
                  <span className="bg-amber-100 border border-amber-200 text-amber-700 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl">
                    💰 {game.gearCost} cost
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white border-2 border-[#e6dec8] rounded-[2rem] p-8 space-y-4 shadow-sm">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Game Description & Instructions</h2>
                <p className="text-slate-700 text-lg leading-relaxed">{game.description}</p>
              </div>

              {/* Structured Metadata Panel */}
              <div className="bg-white border-2 border-[#e6dec8] rounded-[2rem] p-8 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">👥 Players</span>
                  <span className="text-2xl font-black text-indigo-950">{game.playersMin}–{game.playersMax}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">⏱️ Duration</span>
                  <span className="text-2xl font-black text-indigo-950">{game.durationMin} min</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">🪑 Mobility</span>
                  <span className="text-2xl font-black text-indigo-950 capitalize">{game.mobility === 'all' ? 'All levels' : game.mobility}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">💰 Gear cost</span>
                  <span className="text-2xl font-black text-indigo-950">{game.gearCost}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={game.gearUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 bg-amber-450 hover:bg-amber-400 text-slate-900 font-black py-4 rounded-xl text-center transition-colors shadow-md shadow-amber-500/10 text-base"
                >
                  🛍️ Get the gear — Amazon
                </a>
                <a
                  href={game.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 bg-white hover:bg-slate-50 text-slate-800 font-black py-4 rounded-xl text-center transition-colors border-2 border-[#e6dec8]"
                >
                  📺 Watch original video
                </a>
                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-850 font-black px-8 py-4 rounded-xl transition-colors border-2 border-[#e6dec8] flex items-center justify-center gap-2"
                >
                  <span>📢</span> {copied ? 'Copied Link!' : 'Share'}
                </button>
              </div>
            </div>

            {/* Right: Up Next Sidebar */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Related Activities</h3>
              <div className="space-y-4">
                {upNext.map((next) => (
                  <Link
                    key={next.id}
                    href={`/play/${next.slug}`}
                    className="flex gap-4 p-4 bg-white border-2 border-[#e6dec8] hover:border-indigo-400 rounded-2xl transition-all group"
                  >
                    <div className="w-20 h-16 bg-amber-50 border-2 border-[#e6dec8] rounded-xl overflow-hidden flex items-center justify-center text-3xl shrink-0 group-hover:bg-amber-100 transition-colors">
                      {next.category === 'movement' && '🏃'}
                      {next.category === 'music' && '🎵'}
                      {next.category === 'memory' && '🧠'}
                      {next.category === 'creative' && '🎨'}
                      {next.category === 'social' && '💬'}
                      {next.category === 'trivia' && '💡'}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-650 transition-colors line-clamp-2">
                        {next.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold capitalize">{next.category} · {next.durationMin} min</p>
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
