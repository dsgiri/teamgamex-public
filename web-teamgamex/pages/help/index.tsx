import Head from 'next/head'
import Link from 'next/link'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import { createClient } from 'next-sanity'

// Sanity Client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-10-16',
  useCdn: false,
})

export default function HelpCenter({ posts = [] }) {
  // Utility to count articles by category for the UI badges
  const getCount = (catValue: string) => 
    posts.filter((p: any) => p.category === catValue).length;

  const categories = [
    { name: "Getting Started", icon: "🚀", slug: "engagement", count: getCount('engagement') },
    { name: "MDS Log Generation", icon: "📋", slug: "compliance", count: getCount('compliance') },
    { name: "Subscription & Billing", icon: "💳", slug: "management", count: getCount('management') },
    { name: "Technical Support", icon: "🛠️", slug: "support", count: getCount('support') }
  ];

  return (
    <Layout>
      <Head>
        <title>Help Center | TeamGameX Support Hub</title>
      </Head>

      <Container>
        <header className="pt-32 pb-16 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4 block">
            Knowledge Base
          </span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4">Support Hub.</h1>
          <p className="text-slate-500 font-bold max-w-xl mx-auto">
            Documentation and guides to help Activity Administrators scale resident joy and maintain compliance.
          </p>
        </header>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          {categories.map((cat) => (
            <Link href={`/help/category/${cat.slug}`} key={cat.name}>
              <div className="p-12 bg-white border-2 border-slate-100 rounded-[3rem] hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer group shadow-sm">
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <h3 className="text-2xl font-black tracking-tight mb-2 text-slate-900">
                  {cat.name}
                </h3>
                <div className="flex items-center gap-3">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {cat.count} Articles Available
                  </p>
                  <span className="text-blue-600 font-bold">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* RECENT GUIDES LIST */}
        <section className="pb-32">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 border-b pb-4 mb-8">
            Recently Added Guides
          </h3>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post: any) => (
              <Link href={`/help/${post.slug.current}`} key={post._id} className="group block">
                <div className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl hover:bg-white border-2 border-transparent hover:border-blue-100 transition-all">
                  <p className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </p>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    {post.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CONTACT STRIP */}
        <section className="bg-slate-900 rounded-[4rem] p-16 text-center text-white mb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-4 tracking-tight">Need 1-on-1 Assistance?</h2>
            <p className="text-slate-400 text-sm mb-10 font-medium max-w-md mx-auto leading-relaxed">
              Our engineering team is ready to help your facility scale joy. Reach out for technical or billing support.
            </p>
            <a 
              href="mailto:support@teamgamex.com" 
              className="bg-blue-600 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-600 transition-all shadow-xl shadow-blue-500/20"
            >
              Contact Support —
            </a>
          </div>
        </section>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  // Query only 'article' types where 'type' is 'help'
  const posts = await client.fetch(`
    *[_type == "article" && type == "help"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      category,
      publishedAt
    }
  `)

  return {
    props: {
      posts: posts || [],
    },
    revalidate: 60,
  }
}