import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link' // Added for direct navigation
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import ActivityStrip from 'components/home/ActivityStrip'
import { getAllPosts } from 'lib/sanity.client'

export default function IndexPage({ posts = [] }) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/browse-games?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleVibeClick = (vibe: string) => {
    router.push(`/browse-games?category=${encodeURIComponent(vibe)}`)
  }

  const vibes = [
    { name: 'Move It!', emoji: '💃' },
    { name: 'Brain Power', emoji: '🧠' },
    { name: 'Sing Along', emoji: '🎤' },
    { name: 'Get Crafty', emoji: '🎨' },
    { name: 'Seated Fun', emoji: '🪑' }
  ]

  return (
    <Layout>
      <Head>
        <title>TeamGameX | Industrial Resident Engagement</title>
      </Head>

      <Container>
        {/* HERO SECTION */}
        <header className="pt-32 pb-12 flex flex-col items-center gap-10">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[1.1]">
              Happiness First.
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto px-4">
              The professional standard for <span className="text-blue-600 font-bold">cognitive stimulation</span> and connection in senior care.
            </p>
            
            {/* Primary CTA for New Users */}
            <div className="pt-4">
              <Link 
                href="/join" 
                className="inline-block bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-xl shadow-blue-200"
              >
                Start Your Free Trial —
              </Link>
            </div>
          </div>

          {/* Master Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-3xl relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the library (e.g. Trivia, Chair Yoga)" 
              className="w-full h-20 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-[2.5rem] px-10 text-xl font-medium transition-all outline-none shadow-sm"
            />
            <button type="submit" className="absolute right-4 top-4 bottom-4 bg-slate-900 text-white px-8 rounded-[1.8rem] font-bold text-sm hover:bg-black transition-colors">
              Search
            </button>
          </form>

          {/* VIBE NAVIGATION */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 w-full justify-center">
            {vibes.map(vibe => (
              <button 
                key={vibe.name}
                onClick={() => handleVibeClick(vibe.name)}
                className="flex items-center gap-2 bg-white border border-slate-100 px-6 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <span>{vibe.emoji}</span> {vibe.name}
              </button>
            ))}
          </div>
        </header>

        {/* CONTENT FEED */}
        <main className="space-y-4 pb-20">
          <ActivityStrip 
            title="Trending Joy" 
            activities={posts.slice(0, 8)} 
            onSave={() => {}} 
            onAddToEvent={() => {}} 
          />
        </main>

        {/* B2B CONFIDENCE SECTION */}
        <section className="mt-20 mb-20 p-12 bg-slate-900 text-white rounded-[4rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center text-center md:text-left">
             <div className="space-y-2">
                <p className="text-6xl font-black tracking-tighter">85%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg. Resident Participation</p>
             </div>
             <div className="space-y-2">
                <p className="text-3xl font-black leading-tight">
                  Documentation <br />
                  <span className="text-blue-400 italic font-serif">Done in Seconds.</span>
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Automatic MDS Section F Log Generation</p>
             </div>
          </div>
        </section>
      </Container>
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