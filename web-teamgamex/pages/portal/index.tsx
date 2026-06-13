import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import PortalLayout from 'components/portal/PortalLayout'
import { supabase } from 'lib/supabase'

export default function MemberPortal() {
  const { user, isLoaded } = useUser()
  const [stats, setStats] = useState({ participation: '0%', pendingLogs: 0, events: 0 })
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Identify the System Admin (Dharmendra)
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'hello.dsgiri@gmail.com'

  useEffect(() => {
    async function getPortalData() {
      if (!user) return

      // 1. Fetch Subscription Status from Profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', user.id)
        .single()
      
      setSubscriptionStatus(profile?.subscription_status || 'trial')

      // 2. Fetch Facility Stats from Event Calendar
      const { data: events, error } = await supabase
        .from('event_calendar')
        .select('*')
      
      if (events && !error) {
        const avgPart = events.length > 0 
          ? Math.round(events.reduce((acc, curr) => acc + (curr.participation || 0), 0) / events.length) 
          : 0
        
        const pending = events.filter(e => !e.mds_log || e.mds_log.length < 5).length

        setStats({
          participation: `${avgPart}%`,
          pendingLogs: pending,
          events: events.length
        })
      }
      setLoading(false)
    }

    if (isLoaded) {
      getPortalData()
    }
  }, [isLoaded, user])

  return (
    <PortalLayout>
      <Head>
        <title>Facility Console | TeamGameX Portal</title>
      </Head>

      {/* SYSTEM ADMIN ALERT: Master Console Access */}
      {isAdmin && (
        <div className="mb-6 p-4 bg-slate-900 rounded-2xl flex justify-between items-center text-white border border-blue-500/30">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <p className="text-[9px] font-black uppercase tracking-widest">Admin Infrastructure Active</p>
          </div>
          <Link href="/admin" className="text-[9px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors">
            Open Master Console —
          </Link>
        </div>
      )}

      {/* REVENUE BRIDGE: Subscription Nudge */}
      {!loading && subscriptionStatus !== 'active' && (
        <div className="mb-10 p-8 bg-blue-600 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center text-white shadow-xl shadow-blue-200">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-black tracking-tight">Unlock Full Cognitive Library.</h2>
            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mt-1">Current Status: {subscriptionStatus?.toUpperCase()}</p>
          </div>
          <Link href="/pricing" className="bg-white text-blue-600 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
            View Upgrade Plans —
          </Link>
        </div>
      )}

      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block">
            Operational Overview
          </span>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">Facility Health.</h1>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm text-right">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Facility Manager</p>
          <p className="text-sm font-bold text-slate-900">{user?.fullName || 'Active Member'}</p>
        </div>
      </header>

      {/* REAL-TIME METRIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { label: 'Weekly Participation', value: loading ? '...' : stats.participation, icon: '📈' },
          { label: 'Pending Compliance Logs', value: loading ? '...' : stats.pendingLogs, icon: '📋' },
          { label: 'Scheduled Events', value: loading ? '...' : stats.events, icon: '🗓️' }
        ].map((stat) => (
          <div key={stat.label} className="p-10 bg-white border-2 border-slate-50 rounded-[3rem] shadow-sm relative overflow-hidden group hover:border-blue-100 transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 relative z-10">{stat.label}</p>
            <p className="text-5xl font-black tracking-tighter text-slate-900 relative z-10">{stat.value}</p>
            <div className="absolute -right-4 -bottom-4 text-8xl opacity-[0.03] grayscale group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COMPLIANCE CALL TO ACTION */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px]" />
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Documentation <br /> <span className="text-blue-400 italic font-serif">Done in Seconds.</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium max-w-sm leading-relaxed">
                Convert your "Joy Sessions" into Section F clinical logs for state-survey readiness.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portal/mds-logs" className="bg-blue-600 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all text-center">
                Open Log Generator —
              </Link>
              <Link href="/portal/calendar" className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-center">
                Schedule Activity
              </Link>
            </div>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-white border-2 border-slate-50 rounded-[4rem] p-12 flex flex-col justify-between shadow-sm">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Infrastructure Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${subscriptionStatus === 'active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                  {subscriptionStatus === 'active' ? 'Pro License Active' : 'Trial Mode'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">Supabase / Sanity Online</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50">
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">MDS LOGIC SECURE</p>
          </div>
        </div>
      </div>
    </PortalLayout>
  )
}