// components/PostPreview.tsx
import VideoPlayer from './VideoPlayer'

interface PostPreviewProps {
  post: any; // Simplified for MVP; will use proper types later
  onSave: (id: string) => void;
  onAddToEvent: (id: string) => void;
}

export default function PostPreview({ post, onSave, onAddToEvent }: PostPreviewProps) {
  return (
    <div className="flex flex-col gap-6 group bg-white p-3 rounded-[2.5rem] transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-transparent hover:border-slate-100">
      
      {/* Immersive Video-First player (YouTube/FB/TikTok all load here) */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-inner bg-black">
        <VideoPlayer url={post.videoUrl || post.title} title={post.title} />
        
        {/* Playful Floating Action Menu (Like Instagram/X) */}
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <button 
            onClick={() => onSave(post._id)}
            className="w-12 h-12 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all active:scale-90 group/btn"
          >
            <span className="text-xl">❤️</span>
          </button>
          <button 
            onClick={() => onAddToEvent(post._id)}
            className="w-12 h-12 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all active:scale-90"
          >
            <span className="text-xl">➕</span>
          </button>
        </div>
      </div>
      
      {/* The Utility - minimalist and focused */}
      <div className="px-1 flex-1">
        <h3 className="text-2xl font-black text-slate-800 leading-tight mb-2 tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-2 italic ledading-relaxed mb-6">
          "{post.excerpt}"
        </p>
        
        {/* Planning, Curation, & Gear - reduced corporate clutter */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 border-t border-slate-50 pt-3">
            <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-xs hover:bg-black transition-all">
              Watch Source
            </button>
            {post.gearUrl && (
              <a href={post.gearUrl} target="_blank" className="text-[10px] font-bold text-slate-400 hover:text-orange-500 transition-colors">
                🛒 Get Gears
              </a>
            )}
          </div>
          
          <button 
            onClick={() => onAddToEvent(post._id)}
            className="w-full py-4 bg-blue-600 text-white rounded-xl text-[10px] font-black tracking-widest uppercase hover:bg-blue-700 active:scale-95 shadow-xl"
          >
            + ADD TO EVENT
          </button>
        </div>
      </div>
    </div>
  )
}