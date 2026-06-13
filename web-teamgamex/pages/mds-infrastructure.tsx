// pages/mds-infrastructure.tsx
import Head from 'next/head'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'

export default function MDSPage() {
  const specs = [
    { title: 'Automated Mapping', detail: 'Converts "Vibe" categories into Section F clinical objectives.' },
    { title: 'RLS Security', detail: 'Row Level Security ensures data is only accessible to authorized facility staff.' },
    { title: 'Audit Export', detail: 'One-click PDF generation for state survey readiness.' }
  ]

  return (
    <Layout>
      <Head>
        <title>MDS Infrastructure | TeamGameX Compliance</title>
      </Head>
      
      <Container>
        <main className="pt-32 pb-20">
          <header className="mb-20 max-w-3xl">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-6">
              Zero-Effort <br /><span className="text-blue-600">Section F Compliance.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              We’ve automated the "Boring" so you can focus on the "Joy." TeamGameX turns activity planning into clinical documentation in real-time.
            </p>
          </header>

          {/* Technical Spec Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {specs.map(spec => (
              <div key={spec.title} className="p-10 bg-slate-50 border-2 border-slate-100 rounded-[3rem]">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">{spec.title}</h3>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">{spec.detail}</p>
              </div>
            ))}
          </div>

          {/* The Documentation Logic Preview */}
          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                   <h2 className="text-3xl font-black tracking-tight">The MDS Log Generator.</h2>
                   <p className="text-slate-400 font-medium">
                      Our logic engine pre-fills every activity description with state-ready language. No more generic entries. No more manual typing.
                   </p>
                   <ul className="space-y-4">
                      {['Accuracy-First Logic', 'Clinical Goal Alignment', 'Real-time Participation Tracking'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                           <span className="text-blue-400">✓</span> {item}
                        </li>
                      ))}
                   </ul>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 font-mono text-[10px] text-blue-300">
                   <p className="mb-4 text-white font-bold">// AUTOMATED MDS OUTPUT EXCERPT</p>
                   <p>"Resident participated in 'Disco Bingo' (Move It!).</p>
                   <p>Objective: Section F (Customary Routines).</p>
                   <p>Outcome: Improved social engagement & rhythmic mobility.</p>
                   <p>Participation Metric: 92% active engagement observed."</p>
                </div>
             </div>
          </div>

          {/* REGULATORY ALIGNMENT SECTION */}
          <section className="mt-32 pt-20 border-t border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="max-w-md">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
                  Regulatory Framework
                </h3>
                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  TeamGameX automation protocols are developed in strict alignment with the 
                  <span className="text-blue-600"> CMS MDS 3.0 RAI User’s Manual</span>. 
                  We monitor federal updates to Section F and Section O to ensure your facility 
                  remains survey-ready.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-center gap-6">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-xl">
                  🏛️
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Source: CMS.gov
                  </p>
                  <a 
                    href="https://www.cms.gov/medicare/quality/nursing-home-improvement/resident-assessment-instrument-manual" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-black text-blue-600 hover:underline flex items-center gap-2"
                  >
                    View Official RAI Manual v1.20.1 →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Container>
    </Layout>
  )
}