// components/HeroPost.tsx
import VideoPlayer from './VideoPlayer'

interface HeroPostProps {
  title: string
  excerpt: string
  videoUrl?: string
  originalUrl?: string 
  gearUrl?: string     
  onSave: () => void     // Logic passed from the main page
  isLoading: boolean     // Loading state from the main page
}

export default function HeroPost({
  title,
  videoUrl,
  excerpt,
  originalUrl,
  gearUrl,
  onSave,
  isLoading
}: HeroPostProps) {
  
  const handleOpenLink = (url?: string) => {
    const target = url || videoUrl;
    if (target) window.open(target, '_blank', 'noopener,noreferrer')
    else alert("Link coming soon!")
  }

  return (
    <section className="flex flex-col lg:flex-row gap-10 items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      <div className="w-full lg:w-1/2">
        <VideoPlayer url={videoUrl || ""} title={title} />
      </div>
      
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            Top Pick
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 leading-tight tracking-tighter">
            {title}
          </h2>
        </div>
        <p className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-blue-100 pl-4">
          "{excerpt || "Discover why this is a great addition to your team workflow."}"
        </p>
        
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-50">
          <button 
            onClick={() => handleOpenLink(originalUrl)}
            className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-black transition-all active:scale-95 shadow-lg whitespace-nowrap"
          >
            Watch Original
          </button>
          <button 
            onClick={() => handleOpenLink(gearUrl || "https://amazon.com")}
            className="flex-1 bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all active:scale-95 shadow-sm whitespace-nowrap"
          >
            Get the Gear
          </button>
          <button 
            onClick={onSave}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all shadow-sm ${
              isLoading 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
          >
            {isLoading ? 'SAVING...' : '+ ADD TO MY GAME FEED'}
          </button>
        </div>
      </div>
    </section>
  )
}