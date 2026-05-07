import { Post } from 'lib/sanity.queries'
import VideoPlayer from './VideoPlayer'

export default function HeroPost(props: Post) {
  const { 
    title = 'Trending Activity', 
    description = '',
    videoUrl = '', 
    postSource = '', 
    playerBenefit = '', 
    shopLink = '#', 
    category = '' 
  } = props

  return (
    <section className="mt-8 mb-16 px-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Universal Video Player */}
        <div className="relative w-full aspect-[9/16] max-h-[650px] rounded-3xl overflow-hidden bg-black shadow-2xl ring-1 ring-slate-200">
          <VideoPlayer videoUrl={videoUrl} />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              {category || 'Team Building'}
            </span>
            <h3 className="text-3xl lg:text-5xl font-black leading-tight mb-2 text-slate-900 break-words">
              {title}
            </h3>
            
            {description && (
              <p className="text-slate-600 text-lg mb-4 font-medium leading-relaxed">
                {description}
              </p>
            )}

            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
              Platform: <span className="text-blue-500">{postSource || 'Checking...'}</span>
            </p>
          </div>

          <div className="mb-10 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-blue-600 rounded-full"></div>
            <p className="text-xl leading-relaxed text-slate-700 font-medium pl-6 italic">
              "{playerBenefit || 'Discover why this is a great addition to your team workflow.'}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href={videoUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg">
              Watch Original
            </a>
            <a href={shopLink || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg">
              Get the Gear
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}