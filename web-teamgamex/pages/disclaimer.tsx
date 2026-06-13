// pages/disclaimer.tsx
import Head from 'next/head'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import TopBar from 'components/layout/TopBar'

export default function DisclaimerPage() {
  return (
    <Layout>
      <Head><title>Disclaimer | TeamGameX</title></Head>
      <TopBar />
      <Container>
        <main className="pt-32 pb-20">
          <header className="mb-16">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2">Legal Disclaimer.</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Essential Safety Information</p>
          </header>
          
          <div className="max-w-3xl space-y-10">
            <div className="p-8 bg-rose-50 border-2 border-rose-100 rounded-[2.5rem]">
              <h2 className="text-sm font-black uppercase tracking-widest text-rose-600 mb-4">Safety First</h2>
              <p className="text-slate-700 leading-relaxed font-bold">
                TeamGameX is a professional curation tool. The activities provided are for informational and inspirational purposes only. 
                Facilities are solely responsible for ensuring that any activity performed is safe for their specific residents' physical and cognitive conditions.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-2">Not Medical Advice</h3>
                <p className="text-slate-500 font-medium text-sm">
                  TeamGameX does not provide medical or therapeutic advice. Participation in activities should always be supervised by qualified healthcare professionals at your facility.
                </p>
              </div>
              <div>
                <h3 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-2">Accuracy of Gear</h3>
                <p className="text-slate-500 font-medium text-sm">
                  While we provide links to "Get Gear," we are not responsible for the quality, delivery, or safety of items purchased from third-party vendors.
                </p>
              </div>
            </div>
          </div>
        </main>
      </Container>
    </Layout>
  )
}