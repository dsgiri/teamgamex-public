// pages/admin/subscribers.tsx
import { useEffect, useState } from 'react'
import AdminLayout from 'components/admin/AdminLayout'
import { supabase } from 'lib/supabase'

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubs() {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error) setSubscribers(data)
      setLoading(false)
    }
    fetchSubs()
  }, [])

  return (
    <AdminLayout>
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Member Registry</h1>
        <p className="text-slate-400 font-medium text-sm">Managing the Joy-First community.</p>
      </header>

      <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b-2 border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Name</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Email</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Source</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={4} className="px-8 py-12 text-center text-xs font-bold text-slate-400 animate-pulse">Loading Infrastructure...</td></tr>
            ) : subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 font-bold text-slate-900 text-sm">{sub.full_name}</td>
                <td className="px-8 py-6 font-medium text-slate-500 text-sm">{sub.email}</td>
                <td className="px-8 py-6">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {sub.source}
                  </span>
                </td>
                <td className="px-8 py-6 font-medium text-slate-400 text-xs">
                  {new Date(sub.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}