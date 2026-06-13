// pages/support.tsx
import Head from 'next/head'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import TopBar from 'components/layout/TopBar'

export default function SupportPage() {
  const supportCategories = [
    {
      title: 'Technical Infrastructure',
      icon: '⚙️',
      description: 'Assistance with API integrations, Bio-Infrastructure, and system automation.',
      link: '#tech'
    },
    {
      title: 'Billing & Account',
      icon: '💳',
      description: 'Manage your Facility Pro or Enterprise subscriptions and invoices.',
      link: '#billing'
    },
    {
      title: 'Activity Support',
      icon: '🎮',
      description: 'Help with game curation, gear procurement, or documentation logs.',
      link: '#activities'
    }
  ]

  return (
    <Layout>
      <Head>
        <title>Support Center | TeamGameX Infrastructure</title>
      </Head>

      <TopBar />

      <Container>
        <main className="pt-32 pb-20">
          
          {/* Header Section */}
          <header className="mb-20 text-center space-y-4">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900">
              Support Command Center.
            </h1>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Direct access to technical assistance and facility management resources.
            </p>
          </header>

          {/* Quick Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {supportCategories.map((cat) => (
              <a 
                key={cat.title}
                href={cat.link}
                className="group p-10 bg-slate-50 border-2 border-transparent hover:border-blue-600 hover:bg-white rounded-[3rem] transition-all shadow-sm hover:shadow-2xl"
              >
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">
                  {cat.icon}
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-2">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {cat.description}
                </p>
              </a>
            ))}
          </div>

          {/* Contact Infrastructure Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start border-t border-slate-100 pt-20">
            
            <div className="space-y-8">
              <h2 className="text-3xl font-black tracking-tighter text-slate-900">
                Open a Technical Ticket.
              </h2>
              <p className="text-slate-500 font-medium max-w-md">
                Our engineering team responds to priority facility tickets within 4 hours. Provide your facility ID for faster service.
              </p>
              
              <div className="space-y-4">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold text-slate-900">All Systems Operational</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="bg-white p-2 rounded-[3.5rem] shadow-2xl shadow-slate-200/50">
              <div className="p-10 space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">
                    Issue Category
                  </label>
                  <select className="w-full h-16 bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-2xl px-6 font-bold text-slate-900 transition-all outline-none appearance-none">
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the technical requirement..."
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white rounded-3xl p-6 font-bold text-slate-900 transition-all outline-none resize-none"
                  />
                </div>

                <button className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl active:scale-95">
                  Submit Ticket
                </button>
              </div>
            </form>

          </div>

          {/* Documentation Link */}
          <div className="mt-32 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-6">
              Self-Service Infrastructure
            </p>
            <a href="/faq" className="text-blue-600 font-black text-sm hover:underline">
              Browse Technical FAQ →
            </a>
          </div>

        </main>
      </Container>
    </Layout>
  )
}