// pages/portal/settings.tsx
import { useState } from 'react'
import Head from 'next/head'
import PortalLayout from 'components/portal/PortalLayout'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    weeklyJoyDrop: true,
    complianceAlerts: true,
    systemUpdates: false
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    // Industrial Simulation of syncing with Supabase logic
    setTimeout(() => {
      setSaving(false)
      alert('Operational Configuration Synchronized.')
    }, 800)
  }

  return (
    <PortalLayout>
      <Head><title>Settings | TGX Portal</title></Head>

      <header className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block">
          System Configuration
        </span>
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Settings.</h1>
        <p className="text-slate-400 font-medium text-sm mt-2">
          Manage your facility's operational preferences and reporting logic.
        </p>
      </header>

      <div className="max-w-3xl">
        <form onSubmit={handleSave} className="space-y-12">
          
          {/* NOTIFICATION ENGINE */}
          <section className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b border-slate-100">
              Notification Engine
            </h3>
            
            <div className="space-y-6">
              {[
                { 
                  id: 'weeklyJoyDrop', 
                  title: 'Weekly Joy Drop', 
                  desc: 'Receive curated connection-based games every Monday morning.',
                  value: notifications.weeklyJoyDrop 
                },
                { 
                  id: 'complianceAlerts', 
                  title: 'Compliance & MDS Alerts', 
                  desc: 'Get notified when sessions require Section F documentation to stay survey-ready.',
                  value: notifications.complianceAlerts 
                },
                { 
                  id: 'systemUpdates', 
                  title: 'Infrastructure Logs', 
                  desc: 'Receive technical updates regarding the TGX logic engine and security.',
                  value: notifications.systemUpdates 
                }
              ].map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-6 p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:border-blue-100 transition-all group">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setNotifications({...notifications, [item.id as keyof typeof notifications]: !item.value})}
                    className={`w-14 h-8 rounded-full transition-all relative flex-shrink-0 ${item.value ? 'bg-blue-600' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all ${item.value ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* OPERATIONAL PREFERENCES */}
          <section className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b border-slate-100">
              Operational Specs
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Local Timezone</label>
                <select className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 outline-none focus:border-blue-600 appearance-none cursor-pointer">
                  <option>Central Time (US & Canada)</option>
                  <option>Eastern Time (US & Canada)</option>
                  <option>Mountain Time (US & Canada)</option>
                  <option>Pacific Time (US & Canada)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Audit Report Language</label>
                <select className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 outline-none focus:border-blue-600 appearance-none cursor-pointer">
                  <option>English (US)</option>
                  <option>Spanish (ES)</option>
                </select>
              </div>
            </div>
          </section>

          {/* DATA MOAT / DANGER ZONE */}
          <section className="space-y-4 pt-12 border-t border-slate-100">
             <button type="button" className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors">
               Archive Facility Infrastructure —
             </button>
             <p className="text-[9px] font-bold text-slate-300 leading-relaxed uppercase tracking-widest">
               Warning: Archiving will lock all MDS Section F history and billing cycles.
             </p>
          </section>

          {/* FORM ACTION */}
          <div className="pt-8 flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
              Operational Specs v1.0
            </p>
            <button 
              type="submit"
              disabled={saving}
              className="bg-slate-900 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50"
            >
              {saving ? 'Synchronizing...' : 'Save Configuration —'}
            </button>
          </div>

        </form>
      </div>
    </PortalLayout>
  )
}