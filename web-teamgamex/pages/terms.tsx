// pages/terms.tsx
import Head from 'next/head'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import TopBar from 'components/layout/TopBar'

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing TeamGameX, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree, you are prohibited from using the service.'
    },
    {
      title: '2. Use License',
      content: 'Permission is granted to professionally use the TeamGameX platform for activity planning within a single facility (Solo/Pro tiers) or across multiple facilities (Enterprise tier). This is a license, not a transfer of title.'
    },
    {
      title: '3. Third-Party Content',
      content: 'TeamGameX curates content from public platforms like YouTube and TikTok. We do not claim ownership of these videos. We provide a specialized curation and documentation service for professional use cases.'
    },
    {
      title: '4. Service Availability',
      content: 'We strive for 99.9% uptime, but the service is provided "as is." We are not liable for any downtime resulting from third-party API failures (e.g., YouTube video removals).'
    }
  ]

  return (
    <Layout>
      <Head><title>Terms of Use | TeamGameX</title></Head>
      <TopBar />
      <Container>
        <main className="pt-32 pb-20">
          <header className="mb-16">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Terms of Use.</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Last Updated: May 2026</p>
          </header>
          <div className="max-w-3xl space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-4">{s.title}</h2>
                <p className="text-slate-600 leading-relaxed font-medium">{s.content}</p>
              </div>
            ))}
          </div>
        </main>
      </Container>
    </Layout>
  )
}