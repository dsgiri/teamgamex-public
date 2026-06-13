interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  if (!videoUrl || videoUrl.length < 5) return null;

  // 1. Logic for YouTube Shorts
  if (videoUrl.includes('youtube.com/shorts/')) {
    const videoId = videoUrl.split('/shorts/')[1]?.split('?')[0];
    return (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0"
      ></iframe>
    );
  }

  // 2. Logic for Facebook Reels
  if (videoUrl.includes('facebook.com')) {
    return (
      <iframe
        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoUrl)}&show_text=0&width=337`}
        width="100%"
        height="100%"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="absolute inset-0"
      ></iframe>
    );
  }

  return (
    <div className="flex items-center justify-center h-full text-slate-500 text-xs italic p-4 text-center">
      Unsupported video platform
    </div>
  );
}