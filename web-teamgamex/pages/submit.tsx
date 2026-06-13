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

      <div className="bg-slate-900 text-white min-h-screen font-sans pb-24">
        {/* Navigation Bar */}
        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800 mb-12">
          <Link href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
            Team<span className="text-blue-500">Game</span>X.
          </Link>
          <div className="flex items-center gap-8 text-sm font-bold text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Directory</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">About</Link>
            <Link href="/submit" className="hover:text-white transition-colors">Submit a game</Link>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white mb-8 transition-colors">
            <span>←</span> Back to directory
          </Link>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Submit a game video
          </h1>
          <p className="text-slate-400 font-medium mb-8">
            Paste any social media short and we'll add it to the directory. All submissions are reviewed before going live.
          </p>

          {success ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl p-8 text-center space-y-4">
              <span className="text-4xl">🎉</span>
              <h3 className="text-xl font-bold">Submission Received!</h3>
              <p className="text-sm font-medium">Thank you for helping our community grow. Redirecting you to the homepage...</p>
            </div>
          ) : (
            <div className="bg-slate-950/40 border border-slate-800 rounded-3xl p-8 space-y-6">
              {/* URL Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Video URL (YouTube, TikTok, Instagram, LinkedIn, Facebook)</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/shorts/..."
                  value={videoUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full h-14 bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 text-sm font-medium outline-none transition-colors"
                />
                {detectedPlatform && (
                  <p className="text-emerald-400 text-xs font-bold">
                    ✓ {detectedPlatform} short detected — preview ready
                  </p>
                )}
              </div>

              {/* Game Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Game Name</label>
                <input
                  type="text"
                  placeholder="e.g. Human Bowling — Care Home Edition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-14 bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 text-sm font-medium outline-none transition-colors"
                />
              </div>

              {/* Platform Badges */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Platform Detected</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['youtube', 'tiktok', 'instagram', 'linkedin', 'facebook'].map((plat) => (
                    <span
                      key={plat}
                      className={`px-4 py-2 rounded-xl text-xs font-bold capitalize border ${
                        detectedPlatform === plat
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
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
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Game Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-14 bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors capitalize"
                  >
                    {['movement', 'memory', 'trivia', 'music', 'creative', 'social'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Mobility Level</label>
                  <select
                    value={mobility}
                    onChange={(e) => setMobility(e.target.value)}
                    className="w-full h-14 bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors capitalize"
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
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Players (Min)</label>
                  <input
                    type="number"
                    value={playersMin}
                    onChange={(e) => setPlayersMin(Number(e.target.value))}
                    className="w-full h-14 bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Players (Max)</label>
                  <input
                    type="number"
                    value={playersMax}
                    onChange={(e) => setPlayersMax(Number(e.target.value))}
                    className="w-full h-14 bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full h-14 bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 text-sm font-bold outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Amazon Affiliate Link */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Amazon Gear Link (Optional — Affiliate)</label>
                <input
                  type="url"
                  placeholder="https://amazon.com/dp/..."
                  value={gearUrl}
                  onChange={(e) => setGearUrl(e.target.value)}
                  className="w-full h-14 bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl px-4 text-sm font-medium outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Short Description</label>
                <textarea
                  placeholder="Residents form two teams and roll lightweight foam balls down..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border-2 border-slate-800 focus:border-blue-500 rounded-xl p-4 text-sm font-medium outline-none transition-colors resize-none"
                />
              </div>

              {/* Form CTAs */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit('pending')}
                  className="bg-blue-650 hover:bg-blue-600 disabled:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for review'}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit('draft')}
                  className="bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 text-slate-300 font-bold px-8 py-4 rounded-xl transition-colors text-sm border border-slate-700"
                >
                  Save draft
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  )
}
