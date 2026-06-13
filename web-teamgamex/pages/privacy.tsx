// pages/privacy.tsx
import Head from 'next/head'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'

export default function PrivacyPage() {
  return (
    <Layout>
      <Head><title>Privacy Policy | TeamGameX Infrastructure</title></Head>
      <Container>
        <main className="pt-40 pb-20">
          <header className="mb-16">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Privacy Policy.</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Security & Data Protocols</p>
          </header>
          
          <div className="max-w-3xl space-y-12">
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-4">Data Collection</h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                We collect essential facility and user data required to generate MDS logs and manage memberships. We do not sell user data to third-party advertisers.
              </p>
            </section>
            
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-blue-600 mb-4">Security</h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                Our infrastructure is built on encrypted protocols. We use industry-standard authentication (Clerk/Auth.js) to ensure that facility activity data remains private and secure.
              </p>
            </section>
          </div>
        </main>
      </Container>
    </Layout>
  )
}