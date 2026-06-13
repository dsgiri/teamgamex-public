import { useState } from 'react'
import { useUser } from '@clerk/nextjs'

export default function AddActivity() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({
    title: '',
    youtubeUrl: '',
    description: '',
    vibe: 'physical' // Default ID from your Sanity Vibe schema
  })

  // Prevent unauthorized eyes from even seeing the form
  if (user?.primaryEmailAddress?.emailAddress !== 'hello.dsgiri@gmail.com') {
    return <div className="p-20 font-black">UNAUTHORIZED ACCESS.</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('Injecting into Sanity Engine...')

    try {
      const res = await fetch('/api/admin/create-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        setStatus('Success: Activity Deployed.')
        setForm({ title: '', youtubeUrl: '', description: '', vibe: 'physical' })
      } else {
        setStatus('Error: Injection Failed.')
      }
    } catch (err) {
      setStatus('System Error: Check Terminal.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 md:p-24">
      <header className="mb-12">
        <h1 className="text-5xl font-black tracking-tighter">Content Factory.</h1>
        <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Manual Entry Terminal</p>
      </header>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-6 bg-white p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Name</label>
          <input 
            required
            className="w-full h-14 bg-slate-100 border-none rounded-2xl px-6 font-bold focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">YouTube URL / Shorts ID</label>
          <input 
            required
            className="w-full h-14 bg-slate-100 border-none rounded-2xl px-6 font-bold"
            value={form.youtubeUrl}
            onChange={e => setForm({...form, youtubeUrl: e.target.value})}
            placeholder="e.g. bX8v3n..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Vibe Category (Ref ID)</label>
          <select 
            className="w-full h-14 bg-slate-100 border-none rounded-2xl px-6 font-bold appearance-none"
            value={form.vibe}
            onChange={e => setForm({...form, vibe: e.target.value})}
          >
            <option value="physical">Physical Activity</option>
            <option value="mental">Mental Stimulation</option>
            <option value="social">Social Connection</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Guidance</label>
          <textarea 
            className="w-full h-32 bg-slate-100 border-none rounded-2xl p-6 font-bold resize-none"
            value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all disabled:bg-slate-300"
        >
          {loading ? 'Processing...' : 'Deploy to Library —'}
        </button>

        {status && (
          <p className="text-center text-[10px] font-black uppercase text-blue-500 animate-pulse">{status}</p>
        )}
      </form>
    </div>
  )
}