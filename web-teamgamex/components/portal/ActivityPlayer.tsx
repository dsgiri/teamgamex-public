// components/portal/ActivityPlayer.tsx
export default function ActivityPlayer({ activity, onClose }: { activity: any, onClose: () => void }) {
  if (!activity) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-6 lg:p-12">
      <div className="w-full max-w-6xl bg-black rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row aspect-video lg:aspect-auto">
        
        {/* Video Side */}
        <div className="flex-[2] bg-slate-800 relative">
          <iframe 
            src={`https://www.youtube.com/embed/${activity.videoId}?autoplay=1&modestbranding=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>

        {/* Clinical Side */}
        <div className="flex-1 bg-white p-12 flex flex-col justify-between">
          <div className="space-y-6">
            <button onClick={onClose} className="text-slate-300 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest">— Close Player</button>
            <h2 className="text-3xl font-black tracking-tighter text-slate-900">{activity.title}</h2>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Clinical Objective</p>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                {activity.mdsObjective || "Focused on rhythmic coordination and social synchronization (Section F)."}
              </p>
            </div>
          </div>
          <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">
            Record Participation —
          </button>
        </div>
      </div>
    </div>
  )
}