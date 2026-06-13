import Head from 'next/head'
import Link from 'next/link'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import { createClient } from 'next-sanity'

// Standard Sanity Client configuration (Ensure these match your .env.local)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-10-16',
  useCdn: false,
})

export default function BlogIndex({ posts = [] }) {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <Layout>
      <Head>
        <title>The Journal | Industrial Insights by TeamGameX</title>
      </Head>

      <Container>
        {/* HEADER SECTION */}
        <header className="pt-32 pb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">The Journal.</h1>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-blue-600"></div>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
              Industrial Insights for Activity Administrators
            </p>
          </div>
        </header>

        {/* FEATURED POST: The leading insight */}
        {featuredPost && (
          <section className="mb-20">
            <Link href={`/blog/${featuredPost.slug.current}`} className="group">
              <div className="relative aspect-[21/9] w-full bg-slate-100 rounded-[3rem] overflow-hidden mb-8 border-2 border-transparent group-hover:border-blue-500 transition-all shadow-2xl">
                {/* Image Placeholder - If you use Sanity Image URL builder, replace src */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
                <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
                  <span className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                    Featured Insight
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight max-w-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-300 mt-4 max-w-xl font-medium line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* FEED: The broader library of articles */}
        <div className="grid grid-cols-1 gap-8 pb-32">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 border-b pb-4 mb-4">
            Recent Publications
          </h3>
          
          {remainingPosts.length > 0 ? (
            remainingPosts.map((post) => (
              <Link href={`/blog/${post.slug.current}`} key={post._id} className="group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-10 rounded-[2.5rem] bg-slate-50 border-2 border-transparent hover:border-blue-100 hover:bg-white transition-all shadow-sm hover:shadow-xl">
                  <div className="flex-1">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      {post.category || 'General'}
                    </span>
                    <h2 className="text-3xl font-black tracking-tight mt-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 font-medium line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} —
                    </p>
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        →
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
              <p className="text-slate-300 font-black uppercase tracking-widest text-xs">
                {featuredPost ? "More insights pending..." : "No articles published in the journal yet."}
              </p>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  // Query only 'article' types where 'type' is 'blog'
  const posts = await client.fetch(`
    *[_type == "article" && type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt
    }
  `)

  return {
    props: {
      posts: posts || [],
    },
    revalidate: 60, // Refresh page every minute for new content
  }
}