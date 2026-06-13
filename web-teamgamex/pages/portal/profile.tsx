// pages/portal/profile.tsx
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useUser } from '@clerk/nextjs'
import PortalLayout from 'components/portal/PortalLayout'
import { supabase } from 'lib/supabase'

export default function ProfilePage() {
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  // Profile State
  const [profile, setProfile] = useState({
    facility_name: '',
    admin_name: '',
    license_number: '',
    npi_number: '',
    facility_address: ''
  })

  useEffect(() => {
    async function loadProfile() {
      if (!user) return
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) setProfile(data)
      setLoading(false)
    }
    loadProfile()
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user?.id,
        ...profile,
        updated_at: new Date().toISOString(),
      })

    if (!error) alert('Facility Infrastructure Updated.')
    setSaving(false)
  }

  return (
    <PortalLayout>
      <Head><title>Facility Profile | TGX Portal</title></Head>

      <header className="mb-12">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-2 block">Identity Vault</span>
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Facility Profile.</h1>
        <p className="text-slate-400 font-medium text-sm mt-2">Essential data for MDS Section F clinical reporting.</p>
      </header>

      <div className="max-w-3xl">
        <form onSubmit={handleSave} className="space-y-12">
          
          {/* Section 1: Clinical Identity */}
          <section className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b border-slate-100">Clinical Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Facility Name</label>
                <input 
                  type="text"
                  value={profile.facility_name}
                  onChange={e => setProfile({...profile, facility_name: e.target.value})}
                  className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                  placeholder="e.g. Austin South Care Center"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Administrator Name</label>
                <input 
                  type="text"
                  value={profile.admin_name}
                  onChange={e => setProfile({...profile, admin_name: e.target.value})}
                  className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Regulatory Data */}
          <section className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-4 border-b border-slate-100">Regulatory Infrastructure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Facility License #</label>
                <input 
                  type="text"
                  value={profile.license_number}
                  onChange={e => setProfile({...profile, license_number: e.target.value})}
                  className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">National Provider ID (NPI)</label>
                <input 
                  type="text"
                  value={profile.npi_number}
                  onChange={e => setProfile({...profile, npi_number: e.target.value})}
                  className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Facility Physical Address</label>
              <textarea 
                value={profile.facility_address}
                onChange={e => setProfile({...profile, facility_address: e.target.value})}
                className="w-full h-32 bg-white border-2 border-slate-100 rounded-2xl p-6 font-bold text-slate-900 outline-none focus:border-blue-600 transition-all"
              />
            </div>
          </section>

          {/* Form Footer */}
          <div className="pt-8 flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
              {loading ? 'Initializing...' : 'Infrastructure Secure'}
            </p>
            <button 
              type="submit"
              disabled={saving}
              className="bg-slate-900 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50"
            >
              {saving ? 'Saving Specs...' : 'Update Facility Profile —'}
            </button>
          </div>
        </form>
      </div>
    </PortalLayout>
  )
}