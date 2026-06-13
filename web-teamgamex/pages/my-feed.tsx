import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { getPostsByIds } from 'lib/sanity.client'
import { Post } from 'lib/sanity.queries'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import VideoPlayer from 'components/VideoPlayer'

export default function MyFeed() {
  const { userId, isLoaded } = useAuth()
  const [savedPosts, setSavedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  // --- Scheduling States ---
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [eventDate, setEventDate] = useState('')
  const [isScheduling, setIsScheduling] = useState(false)

  // Helper: Get Today's Date at 12:00 PM in format YYYY-MM-DDTHH:mm
  const getDefaultDateTime = () => {
    const today = new Date();
    const datePart = today.toLocaleDateString('en-CA'); // Returns YYYY-MM-DD
    return `${datePart}T12:00`;
  }

  // Fetch saved activities
  useEffect(() => {
    async function fetchMyFeed() {
      if (!userId) return

      const { data: savedEntries, error } = await supabase
        .from('saved_posts')
        .select('post_id')
        .eq('user_id', userId)

      if (error) {
        console.error("Error fetching feed:", error)
        setLoading(false)
        return
      }

      const savedIds = savedEntries.map(entry => entry.post_id)
      if (savedIds.length === 0) {
        setSavedPosts([])
        setLoading(false)
        return
      }

      const filtered = await getPostsByIds(savedIds)

      setSavedPosts(filtered)
      setLoading(false)
    }

    if (isLoaded) fetchMyFeed()
  }, [userId, isLoaded])

  // --- Handle Scheduling Logic ---
  const handleSchedule = async () => {
    if (!selectedPost || !eventDate) return

    setIsScheduling(true)
    try {
      const res = await fetch("/api/schedule-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          postId: selectedPost._id, 
          eventDate: eventDate 
        }),
      })

      if (res.ok) {
        alert(`Success: ${selectedPost.title} scheduled!`)
        setIsModalOpen(false)
      } else {
        const data = await res.json()
        alert(data.error || "Failed to schedule.")
      }
    } catch (err) {
      alert("Connection error. Please try again.")
    } finally {
      setIsScheduling(false)
    }
  }

  return (
    <Layout preview={false}>
      <Container>
        <h1 className="text-4xl font-bold mt-16 mb-8 border-b-4 border-blue-600 inline-block">
          My Game Feed
        </h1>

        {loading ? (
          <p className="text-slate-600 italic">Accessing your library...</p>
        ) : savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
            {savedPosts.map((post) => (
              <div key={post._id} className="group flex flex-col bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <VideoPlayer videoUrl={post.videoUrl || ''} />
                </div>
                
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{post.title}</h3>
                <div className="text-[10px] font-bold text-blue-600 uppercase mb-4 tracking-widest">
                  {post.category || 'Saved Activity'}
                </div>

                <div className="mt-auto space-y-2">
                  <button 
                    onClick={() => {
                      setSelectedPost(post)
                      setEventDate(getDefaultDateTime()) // Set default on open
                      setIsModalOpen(true)
                    }}
                    className="w-full text-[10px] font-bold border-2 border-blue-600 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition-all"
                  >
                    🗓️ SCHEDULE FOR EVENT
                  </button>
                  
                  <a 
                    href={post.shopLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-center text-[10px] font-bold bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-black transition-all"
                  >
                    GET THE GEAR
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 p-12 rounded-2xl text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-600 mb-4 text-lg font-medium">Your feed is currently empty.</p>
            <a href="/" className="text-blue-600 font-bold hover:underline">Browse activities!</a>
          </div>
        )}

        {/* --- Schedule Event Modal --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Plan Activity</h2>
              <p className="text-slate-500 mb-6 text-sm">
                Scheduling: <span className="font-bold text-blue-600">{selectedPost?.title}</span>
              </p>

              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Select Date & Time
              </label>
              <input 
                type="datetime-local" 
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl mb-8 focus:ring-2 focus:ring-blue-600 outline-none text-slate-900"
              />

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 font-bold text-slate-500 hover:text-slate-700 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSchedule}
                  disabled={isScheduling || !eventDate}
                  className={`flex-1 px-4 py-3 rounded-xl font-bold text-white transition shadow-lg ${
                    isScheduling || !eventDate ? 'bg-slate-300' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isScheduling ? 'CONFIRMING...' : 'CONFIRM DATE'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  )
}