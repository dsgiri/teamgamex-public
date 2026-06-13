// components/home/ActivityStrip.tsx
import PostPreview from '../PostPreview'

interface ActivityStripProps {
  title: string
  activities: any[]
  onSave: (id: string) => void
  onAddToEvent: (id: string) => void
}

export default function ActivityStrip({ 
  title, 
  activities, 
  onSave, 
  onAddToEvent 
}: ActivityStripProps) {
  
  if (!activities || activities.length === 0) return null

  return (
    <section className="py-10">
      {/* Strip Header */}
      <div className="flex items-center justify-between px-6 mb-6">
        <h2 className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
          <span className="w-2 h-8 bg-blue-600 rounded-full" />
          {title}
        </h2>
        <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">
          View All →
        </button>
      </div>

      {/* The Scrollable Playground */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory no-scrollbar">
          {activities.map((activity) => (
            <div 
              key={activity._id} 
              className="flex-none w-[300px] md:w-[350px] snap-start"
            >
              <PostPreview 
                post={activity} 
                onSave={onSave} 
                onAddToEvent={onAddToEvent} 
              />
            </div>
          ))}
          
          {/* Decorative Spacer at the end for clean scrolling */}
          <div className="flex-none w-6" />
        </div>
        
        {/* Subtle Gradient Fades (Optional UX polish) */}
        <div className="absolute top-0 right-0 bottom-8 w-20 bg-gradient-to-l from-white pointer-events-none hidden md:block" />
      </div>
    </section>
  )
}