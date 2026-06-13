// pages/portal/feed.tsx
import PortalLayout from 'components/portal/PortalLayout'
import ActivityStrip from 'components/home/ActivityStrip'
import { getAllPosts } from 'lib/sanity.client'
import { supabase } from 'lib/supabase'

export default function MemberFeed({ posts = [] }) {
  
  const handleAddToSchedule = async (post: any) => {
    const { error } = await supabase
      .from('event_calendar')
      .insert([{
        post_id: post._id,
        scheduled_for: new Date().toISOString(),
        participation: 0,
        mds_log: `Ready for generation: ${post.title}`
      }])
    
    if (!error) alert('Scheduled Successfully! Check your Calendar.')
  }

  return (
    <PortalLayout>
      <header className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block">Premium Library</span>
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Activity Vault.</h1>
      </header>

      <div className="space-y-16">
        <ActivityStrip 
          title="Curated Favorites" 
          activities={posts.slice(0, 4)} 
          onSave={() => {}} 
          onAddToEvent={handleAddToSchedule} 
        />
        <ActivityStrip 
          title="New Arrivals" 
          activities={posts.slice(4, 12)} 
          onSave={() => {}} 
          onAddToEvent={handleAddToSchedule} 
        />
      </div>
    </PortalLayout>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return { props: { posts: posts || [] }, revalidate: 60 }
}