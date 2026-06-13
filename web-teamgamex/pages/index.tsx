import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/BlogLayout'
import { getAllPosts } from 'lib/sanity.client'
import { Post } from 'lib/sanity.queries'
import { initialGames, GameActivity } from 'lib/mockData'

interface IndexPageProps {
  posts: Post[]
}

// Mapping utility to convert Sanity Post to GameActivity layout
const mapSanityPostToGame = (post: Post): GameActivity => {
  // Extract youtube ID or other platform IDs
  const videoUrl = post.videoUrl || ''
  let embedId = ''
  let platform = (post.postSource || 'youtube') as any

  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    embedId = videoUrl.includes('shorts/') 
      ? videoUrl.split('shorts/')[1]?.split('?')[0] 
      : videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop() || ''
    platform = 'youtube'
  } else if (videoUrl.includes('facebook.com')) {
    platform = 'facebook'
  } else if (videoUrl.includes('tiktok.com')) {
    embedId = videoUrl.split('/video/')[1]?.split('?')[0] || ''
    platform = 'tiktok'
  }

  // Fallback slug conversion
  const slug = post.postId || post.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''

  return {
    id: post._id,
    title: post.title || 'Untitled Game',
    description: post.description || post.playerBenefit || 'No description provided.',
    videoUrl: videoUrl,
    platform: platform,
    embedId: embedId,
    category: (post.category || 'movement') as any,
    mobility: 'all', // Fallback defaults
    playersMin: 4,
    playersMax: 20,
    durationMin: 20,
    gearUrl: post.shopLink || 'https://www.amazon.com',
    gearCost: post.shopLink ? 'Low cost' : 'Free',
    status: 'live',
    slug: slug
  }
}

export default function IndexPage({ posts = [] }: IndexPageProps) {
  const [games, setGames] = useState<GameActivity[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')

  useEffect(() => {
    // Map Sanity posts
    const sanityGames = posts.map(mapSanityPostToGame)

    // Pull local submissions
    const localSaved = localStorage.getItem('teamgamex_submissions')
    let submissions: GameActivity[] = []
    if (localSaved) {
      try {
        submissions = JSON.parse(localSaved).filter((s: GameActivity) => s.status === 'live')
      } catch (e) {
        console.error(e)
      }
    }
    
    // Combine Sanity games, local submissions, and fallback initialGames if empty
    const combined = [...sanityGames, ...submissions]
    if (combined.length === 0) {
      setGames(initialGames)
    } else {
      setGames(combined)
    }
  }, [posts])

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
    { id: 'all', name: '✨ All Games', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' },
    { id: 'memory', name: '🧠 Memory Boost', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200' },
    { id: 'movement', name: '🏃 Active Fun', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
    { id: 'trivia', name: '💡 Trivia Quiz', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { id: 'music', name: '🎵 Sing Along', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200' },
    { id: 'low mobility', name: '🪑 Seated Only', color: 'bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200' },
    { id: 'groups 5+', name: '👥 Big Groups', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  ]

  const platforms = [
    { id: 'all', name: 'All Video Sources' },
    { id: 'youtube', name: '📺 YouTube' },
    { id: 'tiktok', name: '🎵 TikTok' },
    { id: 'instagram', name: '📸 Instagram' },
    { id: 'linkedin', name: '💼 LinkedIn' },
  ]

  return (
    <Layout>
      <Head>
        <title>TeamGameX | Fun & Joyful Games for Seniors</title>
        <meta
          name="description"
          content="A playful, warm directory of team games designed to spark memory, connection, and laughter in senior care homes."
        />
      </Head>

      <div className="bg-[#faf6f0] text-slate-800 min-h-screen font-sans selection:bg-amber-200">
        {/* Navigation Bar */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-b-2 border-[#f0e8dc]">
          <Link href="/" className="text-3xl font-black tracking-tight text-indigo-950 flex items-center gap-2 hover:scale-105 transition-transform">
            <span className="bg-gradient-to-tr from-amber-400 to-rose-450 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-amber-500/30">🎯</span>
            TeamGameX
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-indigo-650 transition-colors">🎈 Game Directory</Link>
            <Link href="/disclaimer" className="hover:text-indigo-650 transition-colors">💬 About Us</Link>
            <Link href="/submit" className="hover:text-indigo-650 transition-colors">➕ Submit a Game</Link>
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-450 hover:bg-amber-400 text-slate-900 px-5 py-3 rounded-2xl transition-all font-black shadow-md shadow-amber-500/20 active:scale-95"
            >
              Get Game Supplies 🛍️
            </a>
          </div>
        </nav>

        {/* Hero Header */}
        <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-[#eaf7f4] border-2 border-[#cbebe3] text-[#1d9e75] text-xs font-bold px-4 py-2 rounded-full">
            <span>💚</span> For senior & assisted living
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Team games that improve{' '}
            <span className="underline decoration-wavy decoration-amber-400 decoration-3">memory</span>,{' '}
            <span className="underline decoration-wavy decoration-rose-400 decoration-3">engagement</span> &{' '}
            <span className="underline decoration-wavy decoration-emerald-400 decoration-3">joy</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-bold max-w-3xl mx-auto leading-relaxed">
            A curated video directory of real team games played in care homes and senior communities — with gear links so you can run them today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#directory-section"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-lg shadow-indigo-650/20 text-center active:scale-95 text-base"
            >
              🎉 Browse Games Now
            </a>
            <Link
              href="/submit"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-black px-10 py-5 rounded-2xl transition-all border-2 border-[#e6dec8] hover:border-slate-400 text-center active:scale-95 text-base"
            >
              ➕ Submit a Game
            </Link>
          </div>
        </header>

        {/* Directory Section */}
        <section id="directory-section" className="max-w-6xl mx-auto px-6 pb-24">
          {/* Filters Dashboard */}
          <div className="bg-white border-2 border-[#f0e8dc] rounded-[2.5rem] p-8 mb-12 shadow-sm space-y-6">
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 mr-2">Choose Game Style:</span>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-3 rounded-2xl text-xs font-black transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105'
                        : `${cat.color} border-2 border-transparent`
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Platform Filter */}
              <div className="flex flex-wrap items-center gap-3 border-t-2 border-[#fbf9f6] pt-5">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 mr-2">Video Platform:</span>
                {platforms.map((plat) => (
                  <button
                    key={plat.id}
                    onClick={() => setSelectedPlatform(plat.id)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                      selectedPlatform === plat.id
                        ? 'bg-slate-800 text-white shadow-md scale-105'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border-2 border-[#e6dec8]'
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
                  className="group bg-white border-2 border-[#e6dec8] hover:border-indigo-400 rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-950/5 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Preview (Video Thumbnail or Fallback) */}
                    <div className="relative aspect-video bg-slate-950 border-2 border-[#e6dec8] rounded-[1.5rem] overflow-hidden mb-6 flex items-center justify-center transition-colors">
                      {game.platform === 'youtube' && game.embedId ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://img.youtube.com/vi/${game.embedId}/hqdefault.jpg`}
                            alt={game.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Dark overlay that fades out on hover */}
                          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/25 transition-colors duration-300" />
                        </>
                      ) : (
                        /* Beautiful fallback gradient with category symbol */
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 flex items-center justify-center">
                          <span className="text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                            {game.category === 'movement' && '🏃'}
                            {game.category === 'music' && '🎵'}
                            {game.category === 'memory' && '🧠'}
                            {game.category === 'creative' && '🎨'}
                            {game.category === 'social' && '💬'}
                            {game.category === 'trivia' && '💡'}
                          </span>
                        </div>
                      )}

                      {/* Glassmorphic Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full flex items-center justify-center shadow-lg group-hover:bg-white group-hover:text-slate-950 group-hover:scale-110 transition-all duration-300">
                          <svg
                            className="w-5 h-5 fill-current ml-0.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Platform Icon Overlay */}
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-700 border-2 border-[#e6dec8] z-20">
                        {game.platform === 'youtube' && '📺 YouTube'}
                        {game.platform === 'tiktok' && '🎵 TikTok'}
                        {game.platform === 'instagram' && '📸 Instagram'}
                        {game.platform === 'linkedin' && '💼 LinkedIn'}
                      </span>
                      <span className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-black text-white z-20">
                        ⏱️ {game.durationMin} min
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-650 transition-colors leading-snug">
                      {game.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-rose-100 text-rose-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl">
                        {game.category}
                      </span>
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl">
                        💰 {game.gearCost}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold pt-4 border-t-2 border-[#fbf9f6]">
                    <span className="flex items-center gap-1.5">👥 {game.playersMin}–{game.playersMax} players</span>
                    <span className="flex items-center gap-1.5 capitalize">🪑 {game.mobility} mobility</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-[#e6dec8] rounded-[2.5rem] bg-white">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="text-slate-500 font-bold text-lg">No games found matching the active filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedPlatform('all')
                }}
                className="mt-4 text-sm font-black text-indigo-600 hover:text-indigo-500 underline"
              >
                Clear all filters and start again
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: { posts: posts || [] },
    revalidate: 60
  }
}