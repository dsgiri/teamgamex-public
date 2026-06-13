// pages/faq.tsx
import Head from 'next/head'
import Container from 'components/BlogContainer'
import Layout from 'components/BlogLayout'
import TopBar from 'components/layout/TopBar'

export default function FAQPage() {
  const faqSections = [
    {
      category: 'Infrastructure & Automation',
      questions: [
        {
          q: 'How does the MDS Log Automation work?',
          a: 'When you "Add to Event," TeamGameX pre-fills the state-required goals and descriptions using our clinical logic engine. You simply add resident-specific notes, and the system generates a compliant log entry for your EMR.'
        },
        {
          q: 'Can I integrate this with our facility EMR?',
          a: 'Our Enterprise tier offers API access and Bio-Infrastructure integrations. Contact our technical team on the Support page to discuss your specific stack.'
        }
      ]
    },
    {
      category: 'Activity Curation',
      questions: [
        {
          q: 'Where do the activities come from?',
          a: 'We scan thousands of sources including YouTube, Facebook Reels, and TikTok to find high-engagement games. We then strip away the platform noise and curate them with professional documentation.'
        },
        {
          q: 'What does "Get Gears" mean?',
          a: 'Most games require specific items (e.g., balloons, sensory kits). The "Get Gears" link takes you directly to a verified vendor for the exact equipment shown in the video.'
        }
      ]
    },
    {
      category: 'Membership & Billing',
      questions: [
        {
          q: 'Can I cancel my subscription anytime?',
          a: 'Yes. Solo and Pro plans are month-to-month with no long-term contracts. You can manage your billing status directly from the Member Portal.'
        }
      ]
    }
  ]

  return (
    <Layout>
      <Head>
        <title>Technical FAQ | TeamGameX Documentation</title>
      </Head>

      <TopBar />

      <Container>
        <main className="pt-32 pb-20">
          
          {/* Header */}
          <header className="mb-20">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4">
              System Documentation.
            </h1>
            <p className="text-slate-500 font-medium max-w-xl">
              Common questions regarding activity automation, compliance logs, and facility infrastructure.
            </p>
          </header>

          {/* FAQ Content */}
          <div className="space-y-24">
            {faqSections.map((section) => (
              <section key={section.category} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* Category Label */}
                <div className="lg:col-span-1">
                  <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 sticky top-32">
                    {section.category}
                  </h2>
                </div>

                {/* Question List */}
                <div className="lg:col-span-2 space-y-16">
                  {section.questions.map((item) => (
                    <div key={item.q} className="space-y-4">
                      <h3 className="text-xl font-black tracking-tight text-slate-900 leading-tight">
                        {item.q}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>

              </section>
            ))}
          </div>

          {/* Secondary CTA */}
          <div className="mt-32 p-12 bg-slate-50 rounded-[3.5rem] border-2 border-dashed border-slate-200 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-2">Still have questions?</h3>
            <p className="text-slate-500 font-medium mb-8">Our engineering team is ready to assist with facility-specific requirements.</p>
            <button 
              onClick={() => window.location.href = '/support'}
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
            >
              Contact Support
            </button>
          </div>

        </main>
      </Container>
    </Layout>
  )
}