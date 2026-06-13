import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from 'components/BlogLayout'

export default function SubmitGamePage() {
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState('')
  const [title, setTitle] = useState('')
  const [detectedPlatform, setDetectedPlatform] = useState<string>('')
  const [category, setCategory] = useState('movement')
  const [mobility, setMobility] = useState('all')
  const [playersMin, setPlayersMin] = useState(6)
  const [playersMax, setPlayersMax] = useState(20)
  const [duration, setDuration] = useState(20)
  const [gearUrl, setGearUrl] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Handle URL change to auto-detect platform
  const handleUrlChange = (url: string) => {
    setVideoUrl(url)
    const lowerUrl = url.toLowerCase()
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
      setDetectedPlatform('youtube')
    } else if (lowerUrl.includes('tiktok.com')) {
      setDetectedPlatform('tiktok')
    } else if (lowerUrl.includes('instagram.com')) {
      setDetectedPlatform('instagram')
    } else if (lowerUrl.includes('linkedin.com')) {
      setDetectedPlatform('linkedin')
    } else if (lowerUrl.includes('facebook.com')) {
      setDetectedPlatform('facebook')
    } else {
      setDetectedPlatform('')
    }
  }

  // Helper to extract mock embedId
  const getEmbedId = (url: string, platform: string) => {
    try {
      if (platform === 'youtube') {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : 'mock-yt-id'
      }
      return 'mock-id'
    } catch {
      return 'mock-id'
    }
  }

  const handleSubmit = (status: 'pending' | 'draft') => {
    if (!videoUrl || !title || !description) {
      alert('Please fill in Video URL, Game Name, and Description.')
      return
    }

    setIsSubmitting(true)
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const newSubmission = {
      id: Date.now().toString(),
      title,
      description,
      videoUrl,
      platform: (detectedPlatform || 'youtube') as any,
      embedId: getEmbedId(videoUrl, detectedPlatform || 'youtube'),
      category: category as any,
      mobility: mobility as any,
      playersMin,
      playersMax,
      durationMin: duration,
      gearUrl: gearUrl || 'https://www.amazon.com',
      gearCost: gearUrl ? '~$18' : '~$0',
      status, // 'pending' or 'draft'
      slug,
    }

    // Save to local storage for prototype persistence
    const existing = localStorage.getItem('teamgamex_submissions')
    let submissions = []
    if (existing) {
      try {
        submissions = JSON.parse(existing)
      } catch (e) {
        console.error(e)
      }
    }
    submissions.push(newSubmission)
    localStorage.setItem('teamgamex_submissions', JSON.stringify(submissions))

    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }, 1200)
  }

  return (
    <Layout>
      <Head>
        <title>Submit a Game | TeamGameX</title>
      </Head>

      <div className="bg-[#faf6f0] text-slate-800 min-h-screen font-sans pb-24">
        {/* Navigation Bar */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b-2 border-[#f0e8dc] mb-12">
          <Link href="/" className="text-3xl font-black tracking-tight text-indigo-950 flex items-center gap-2 hover:scale-105 transition-transform">
            <span className="bg-gradient-to-tr from-amber-400 to-rose-450 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-amber-500/30">🎯</span>
            TeamGameX
          </Link>
          <div className="flex items-center gap-8 text-sm font-bold text-slate-600">
            <Link href="/" className="hover:text-indigo-650 transition-colors">🎈 Game Directory</Link>
            <Link href="/disclaimer" className="hover:text-indigo-650 transition-colors">💬 About Us</Link>
            <Link href="/submit" className="hover:text-indigo-650 transition-colors">➕ Submit a Game</Link>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-indigo-650 mb-8 transition-colors">
            <span>←</span> Back to directory
          </Link>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-3">
            Submit a game video 🎬
          </h1>
          <p className="text-slate-500 font-medium mb-8">
            Help our directory grow! Paste a social media video link from YouTube, TikTok, or Instagram. We will review and publish it.
          </p>

          {success ? (
            <div className="bg-emerald-100 border-2 border-emerald-200 text-emerald-800 rounded-[2rem] p-8 text-center space-y-4 shadow-sm">
              <span className="text-4xl">🎉</span>
              <h3 className="text-xl font-black">Submission Received!</h3>
              <p className="text-sm font-bold">Thank you for sharing with our community. Redirecting you to the homepage...</p>
            </div>
          ) : (
            <div className="bg-white border-2 border-[#e6dec8] rounded-[2rem] p-8 space-y-6 shadow-sm">
              {/* URL Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Social Video URL</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/shorts/..."
                  value={videoUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full h-14 bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl px-4 text-sm font-medium outline-none transition-colors"
                />
                {detectedPlatform && (
                  <p className="text-emerald-600 text-xs font-bold">
                    ✓ {detectedPlatform} video source detected!
                  </p>
                )}
              </div>

              {/* Game Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Game Name</label>
                <input
                  type="text"
                  placeholder="e.g. Balloon Volleyball Relays"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-14 bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl px-4 text-sm font-medium outline-none transition-colors"
                />
              </div>

              {/* Platform Badges */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Platform Detected</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['youtube', 'tiktok', 'instagram', 'linkedin', 'facebook'].map((plat) => (
                    <span
                      key={plat}
                      className={`px-4 py-2 rounded-xl text-xs font-black capitalize border-2 ${
                        detectedPlatform === plat
                          ? 'bg-indigo-650 border-indigo-500 text-white shadow-sm'
                          : 'bg-[#fafaf8] border-[#e6dec8] text-slate-400'
                      }`}
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Double Column Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Game Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-14 bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors capitalize"
                  >
                    {['movement', 'memory', 'trivia', 'music', 'creative', 'social'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mobility Level</label>
                  <select
                    value={mobility}
                    onChange={(e) => setMobility(e.target.value)}
                    className="w-full h-14 bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors capitalize"
                  >
                    <option value="all">All levels</option>
                    <option value="seated">Seated/wheelchair ok</option>
                    <option value="standing">Standing required</option>
                  </select>
                </div>
              </div>

              {/* Player numbers and duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Players (Min)</label>
                  <input
                    type="number"
                    value={playersMin}
                    onChange={(e) => setPlayersMin(Number(e.target.value))}
                    className="w-full h-14 bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Players (Max)</label>
                  <input
                    type="number"
                    value={playersMax}
                    onChange={(e) => setPlayersMax(Number(e.target.value))}
                    className="w-full h-14 bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-14 bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Amazon Affiliate Link */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Amazon Gear Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://amazon.com/dp/..."
                  value={gearUrl}
                  onChange={(e) => setGearUrl(e.target.value)}
                  className="w-full h-14 bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl px-4 text-sm font-medium outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">How to play & Rules</label>
                <textarea
                  placeholder="Explain how to set up the game and run it..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#fafaf8] border-2 border-[#e6dec8] focus:border-indigo-500 rounded-xl p-4 text-sm font-medium outline-none transition-colors resize-none"
                />
              </div>

              {/* Form CTAs */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit('pending')}
                  className="bg-indigo-650 hover:bg-indigo-600 disabled:bg-indigo-800 text-white font-black px-8 py-4 rounded-2xl transition-colors text-sm shadow-md active:scale-95"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Game for Review'}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit('draft')}
                  className="bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-700 font-black px-8 py-4 rounded-2xl transition-colors text-sm border-2 border-[#e6dec8] active:scale-95"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  )
}
