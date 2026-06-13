// pages/browse-games.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import TopBar from 'components/layout/TopBar'
import PostPreview from 'components/PostPreview'
import { getAllPosts } from 'lib/sanity.client'

interface BrowseGamesProps {
  posts: any[]
}

export default function BrowseGames({ posts = [] }: BrowseGamesProps) {
  const router = useRouter()
  const { q, category } = router.query
  
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [isSearching, setIsSearching] = useState(false)

  // Logic: Filters the massive library based on URL parameters
  useEffect(() => {
    setIsSearching(true)
    
    let results = posts

    // 1. Filter by Search Query (q)
    if (q) {
      const searchTerm = String(q).toLowerCase()
      results = results.filter(post => 
        post.title?.toLowerCase().includes(searchTerm) || 
        post.excerpt?.toLowerCase().includes(searchTerm)
      )
    }

    // 2. Filter by Vibe Category
    if (category && category !== 'All') {
      results = results.filter(post => post.category === category)
    }

    setFilteredPosts(results)
    
    // Simulate a quick "Automation" style processing delay for UX feel
    const timer = setTimeout(() => setIsSearching(false), 300)
    return () => clearTimeout(timer)
  }, [q, category, posts])

  return (
    <Layout>
      <Head>
        <title>Browse Games | TeamGameX Library</title>
      </Head>

      <TopBar />

      <Container>
        <main className="pt-32 pb-20 min-h-screen">
          {/* Result Header */}
          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                {category ? category : q ? `Search: "${q}"` : 'All Activities'}
              </h1>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {isSearching ? 'Processing Library...' : `${filteredPosts.length} Results Found`}
              </p>
            </div>

            {/* Quick Breadcrumb/Back to Home */}
            <button 
              onClick={() => router.push('/')}
              className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all"
            >
              ← Back to Playground
            </button>
          </header>

          {/* THE GRID: High-performance layout for thousands of posts */}
          {filteredPosts.length > 0 ? (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-opacity duration-300 ${isSearching ? 'opacity-50' : 'opacity-100'}`}>
              {filteredPosts.map((post) => (
                <PostPreview 
                  key={post._id} 
                  post={post} 
                  onSave={(id) => console.log('Saved:', id)}
                  onAddToEvent={(id) => console.log('Added to Event:', id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <span className="text-5xl mb-4 block">🔍</span>
              <h2 className="text-xl font-bold text-slate-900">No activities found.</h2>
              <p className="text-slate-400 mt-2">Try a different vibe or search term.</p>
              <button 
                onClick={() => router.push('/browse-games')}
                className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-xs"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>

        {/* Technical Pagination Placeholder (For future scaling to 10k+ posts) */}
        <div className="pb-20 flex justify-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
            End of Results
          </p>
        </div>
      </Container>
    </Layout>
  )
}

// ISR: Fetches the full dataset once every minute to keep results fresh
export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    props: { 
      posts: posts || [] 
    },
    revalidate: 60
  }
}