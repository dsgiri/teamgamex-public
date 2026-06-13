// components/VideoPlayer.tsx
import React from 'react'

interface VideoPlayerProps {
  url: string
  title: string
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  // Logic to parse the video ID and provider
  const getEmbedUrl = (url: string) => {
    if (!url) return ''

    // YouTube Shorts & Standard
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = url.includes('shorts/') 
        ? url.split('shorts/')[1]?.split('?')[0] 
        : url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
      return `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`
    }

    // Facebook Reels & Video
    if (url.includes('facebook.com')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0`
    }

    // TikTok
    if (url.includes('tiktok.com')) {
      const id = url.split('/video/')[1]?.split('?')[0]
      return `https://www.tiktok.com/embed/v2/${id}`
    }

    return url // Fallback
  }

  const embedUrl = getEmbedUrl(url)

  return (
    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <span className="text-4xl">🎬</span>
          <p className="text-[10px] font-black uppercase tracking-widest">Video Preview</p>
        </div>
      )}
      
      {/* Subtle Overlay to maintain the "App" feel and prevent accidental clicks into the platform */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent group-hover:border-white/5 transition-all duration-500" />
    </div>
  )
}