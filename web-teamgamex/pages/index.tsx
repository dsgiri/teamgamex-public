import { GetStaticProps } from 'next'
import Container from 'components/BlogContainer'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import Layout from 'components/BlogLayout'
import VideoPlayer from 'components/VideoPlayer' // ADDED: Importing the player
import { getAllPosts, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'

export interface IndexPageProps {
  posts: Post[]
  settings: Settings
  preview: boolean
  token: string | null
}

export default function IndexPage(props: IndexPageProps) {
  const { posts, settings, preview } = props
  const [heroPost, ...morePosts] = posts || []

  return (
    <Layout preview={preview}>
      <IndexPageHead settings={settings} />
      <Container>
        <header className="flex flex-col items-center mt-16 mb-16 md:mb-12">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight text-slate-900">
            TeamGameX.
          </h1>
          <p className="text-center text-lg mt-5 text-slate-600 font-medium">
            Professional team-building games and executive resources.
          </p>
        </header>

        {/* The Featured Hero Video */}
        {heroPost && <HeroPost {...heroPost} />}

        {/* The Full Library Grid */}
        {morePosts.length > 0 && (
          <section className="pb-24">
            <h2 className="mb-8 text-3xl md:text-4xl font-bold tracking-tighter leading-tight text-slate-900 border-b-4 border-blue-600 inline-block">
              More Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
              {morePosts.map((post) => (
                <div key={post._id} className="group">
                  {/* Grid Video Player Container */}
                  <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden mb-4 shadow-lg ring-1 ring-slate-200">
                     <VideoPlayer videoUrl={post.videoUrl || ''} />
                  </div>

                  <h3 className="text-xl font-bold leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                    {post.category || 'Team Building'}
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 italic mb-6">
                    "{post.playerBenefit || 'Check out this team activity.'}"
                  </p>

                  <div className="flex gap-3">
                    <a 
                      href={post.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold bg-slate-100 px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      Watch Original
                    </a>
                    <a 
                      href={post.shopLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
                    >
                      Get Gear
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const [settings, posts] = await Promise.all([
    getSettings(),
    getAllPosts(),
  ])

  return {
    props: {
      posts: posts || [],
      settings: settings || {},
      preview,
      token: (previewData as any)?.token ?? null,
    },
  }
}