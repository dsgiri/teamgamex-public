// pages/portal/billing.tsx
import { useState } from 'react'
import Head from 'next/head'
import { useUser } from '@clerk/nextjs'
import PortalLayout from 'components/portal/PortalLayout'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function BillingPage() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async (priceId: string) => {
    setLoading(true)
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, email: user?.primaryEmailAddress?.emailAddress }),
    })

    const { sessionId } = await response.json()
    const stripe = await stripePromise
    await stripe?.redirectToCheckout({ sessionId })
    setLoading(false)
  }

  return (
    <PortalLayout>
      <Head><title>Billing | TGX Portal</title></Head>

      <header className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block">Revenue Infrastructure</span>
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Billing.</h1>
        <p className="text-slate-400 font-medium text-sm mt-2">Manage your facility's subscription and data access level.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* FREE TRIAL SPEC */}
        <div className="p-10 bg-white border-2 border-slate-100 rounded-[3rem] flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Plan: Free</h3>
            <h2 className="text-3xl font-black text-slate-900">Trial Mode</h2>
            <ul className="space-y-4">
              {['Basic Activity Feed', 'Manual Documentation', 'Limit: 5 Scheduled Events'].map(spec => (
                <li key={spec} className="text-xs font-bold text-slate-500 flex items-center gap-3">
                  <span className="text-slate-200">✓</span> {spec}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-12 text-[10px] font-black uppercase tracking-widest text-slate-300">Operational Standard</p>
        </div>

        {/* PRO PLAN SPEC */}
        <div className="p-10 bg-slate-900 text-white rounded-[3.5rem] flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[80px]" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Recommended</h3>
            <h2 className="text-3xl font-black italic font-serif">Facility Pro.</h2>
            <p className="text-5xl font-black tracking-tighter">$99<span className="text-xl text-slate-500">/mo</span></p>
            <ul className="space-y-4">
              {['Unlimited Activity Feed', 'Automated MDS PDF Generation', 'Unlimited Calendar Sync', 'Priority Support'].map(spec => (
                <li key={spec} className="text-xs font-bold text-slate-300 flex items-center gap-3">
                  <span className="text-blue-500 font-black">✓</span> {spec}
                </li>
              ))}
            </ul>
          </div>
          <button 
            onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || '')} 
            disabled={loading}
            className="mt-12 w-full py-5 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? 'Initializing Gateway...' : 'Upgrade to Pro —'}
          </button>
        </div>
      </div>
    </PortalLayout>
  )
}