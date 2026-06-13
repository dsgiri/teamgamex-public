// pages/portal/calendar.tsx
import { useState, useEffect } from 'react'
import PortalLayout from 'components/portal/PortalLayout'
import ActivityStrip from 'components/home/ActivityStrip'
import { getAllPosts } from 'lib/sanity.client'
import { supabase } from 'lib/supabase'

export default function PortalCalendar({ posts = [] }) {
  const [scheduledEvents, setScheduledEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch real events from Supabase
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('event_calendar')
      .select('*')
      .order('scheduled_for', { ascending: true })
    if (!error) setScheduledEvents(data)
    setLoading(false)
  }

  useEffect(() => { fetchEvents() }, [])

  // The "Wiring" logic: Adding a Sanity post to the Supabase Calendar
  const handleAddToEvent = async (post: any) => {
    const { error } = await supabase
      .from('event_calendar')
      .insert([{
        post_id: post._id,
        scheduled_for: new Date().toISOString(), // Default to now for this logic
        participation: 0,
        mds_log: `Resident engaged in ${post.title}. Focused on clinical joy logic.`
      }])
    
    if (!error) fetchEvents()
  }

  return (
    <PortalLayout>
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Planning Hub.</h1>
        <p className="text-slate-400 font-medium text-sm">Schedule joy and automate compliance logs.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* RIGHT SIDE: THE GAME FEED (From Sanity) */}
        <div className="lg:col-span-3 space-y-12">
          <ActivityStrip 
            title="Available Library" 
            activities={posts} 
            onSave={() => {}} 
            onAddToEvent={handleAddToEvent} 
          />
        </div>

        {/* LEFT SIDE: THE CALENDAR (From Supabase) */}
        <div className="lg:col-span-1 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scheduled Today</h3>
          <div className="space-y-4">
            {loading ? (
              <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2.5rem] animate-pulse" />
            ) : scheduledEvents.length > 0 ? (
              scheduledEvents.map(event => (
                <div key={event.id} className="p-6 bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm">
                  <p className="text-xs font-black text-blue-600 mb-1">
                    {new Date(event.scheduled_for).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-sm font-bold text-slate-900">Activity #{event.post_id.slice(-4)}</p>
                </div>
              ))
            ) : (
              <p className="text-xs font-bold text-slate-300 px-4">No activities scheduled yet.</p>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return { props: { posts: posts || [] }, revalidate: 60 }
}