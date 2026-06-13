import Head from 'next/head'
import BlogLayout from 'components/BlogLayout'

interface PartnerSpec {
  name: string
  role: string
  description: string
  color: string
  gradient: string
  iconText: string
}

export default function PartnersPage() {
  const partners: PartnerSpec[] = [
    {
      name: 'Google Gemini',
      role: 'Generative Intelligence',
      description: 'Powers smart activity categorization, automated metadata enrichment, and cognitive game design hints.',
      color: 'text-blue-400',
      gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      iconText: ' Gemini '
    },
    {
      name: 'Google AI Studio',
      role: 'Prompt & Model Prototyping',
      description: 'Used for refining prompt parameters, testing zero-shot classifications, and optimizing developer workflows.',
      color: 'text-indigo-400',
      gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent',
      iconText: ' Studio '
    },
    {
      name: 'Clerk',
      role: 'Identity & Authentication',
      description: 'Secures care facility account logins, profile management, and dashboard authentication globally.',
      color: 'text-violet-400',
      gradient: 'from-violet-500/20 via-fuchsia-500/10 to-transparent',
      iconText: ' Clerk '
    },
    {
      name: 'Sanity.io',
      role: 'Structured Content Management',
      description: 'Real-time collaborative CMS that allows care coordinators to instantly visual-edit activity libraries.',
      color: 'text-rose-400',
      gradient: 'from-rose-500/20 via-orange-500/10 to-transparent',
      iconText: ' Sanity '
    },
    {
      name: 'Supabase',
      role: 'Relational Storage & Auth Cache',
      description: 'Handles PostgreSQL data persistence, row-level security policy checking, and saved game activity feeds.',
      color: 'text-emerald-400',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      iconText: ' DB '
    },
    {
      name: 'Stripe.com',
      role: 'Global Revenue & Subscription Gateway',
      description: 'Manages subscription billing, customer checkouts, tier upgrades, and automated payment webhooks.',
      color: 'text-sky-400',
      gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
      iconText: ' Pay '
    },
    {
      name: 'Netlify',
      role: 'Edge Hosting & Serverless Pipeline',
      description: 'Hosts the web portal globally on high-availability edge networks with atomic deploy builds.',
      color: 'text-cyan-400',
      gradient: 'from-cyan-500/20 via-teal-500/10 to-transparent',
      iconText: ' Cloud '
    },
    {
      name: 'Web3Forms',
      role: 'Serverless Contact & Ticketing Forms',
      description: 'Forwards support tickets and facility submission inquiries directly to email boxes without server overhead.',
      color: 'text-amber-400',
      gradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      iconText: ' Mail '
    }
  ]

  return (
    <BlogLayout>
      <Head>
        <title>Technology Partners | TeamGameX</title>
        <meta
          name="description"
          content="Recognizing the modern, enterprise-grade cloud systems and APIs that power the TeamGameX platform."
        />
      </Head>

      <div className="bg-slate-950 text-white min-h-screen font-sans py-24 px-6 relative overflow-hidden">
        {/* Abstract Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black px-4 py-2 rounded-full uppercase tracking-[0.2em]">
              Our Ecosystem
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Technology Partners<span className="text-blue-500">.</span>
            </h1>
            <p className="text-slate-400 font-bold max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              TeamGameX is built upon a state-of-the-art serverless stack. We collaborate with best-in-class service providers to deliver an ultra-fast, highly secure, and accessible platform for senior care professionals.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner) => (
              <div 
                key={partner.name}
                className="group relative bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-slate-700/80 hover:bg-slate-900/80 transition-all duration-300 flex gap-6 overflow-hidden shadow-xl shadow-black/20"
              >
                {/* Micro hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                {/* Left: Icon box */}
                <div className="flex-shrink-0 w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-xs font-bold text-slate-350 shadow-inner relative z-10 group-hover:scale-105 transition-transform duration-300">
                  {partner.iconText}
                </div>

                {/* Right: Info */}
                <div className="space-y-2 relative z-10">
                  <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                    {partner.name}
                  </h2>
                  <p className={`text-[10px] font-black uppercase tracking-wider ${partner.color}`}>
                    {partner.role}
                  </p>
                  <p className="text-slate-400 text-xs font-bold leading-relaxed pt-1">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BlogLayout>
  )
}
