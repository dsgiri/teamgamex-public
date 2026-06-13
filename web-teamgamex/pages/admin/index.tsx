import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/BlogLayout'
import { initialGames, GameActivity } from 'lib/mockData'

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<GameActivity[]>([])
  const [pendingCount, setPendingCount] = useState(5)
  const [totalCount, setTotalCount] = useState(24)

  useEffect(() => {
    // Read submissions from localStorage
    const saved = localStorage.getItem('teamgamex_submissions')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setSubmissions(parsed)
        // Adjust counts dynamically
        const pending = parsed.filter((s: GameActivity) => s.status === 'pending').length
        setPendingCount(5 + pending)
        const live = parsed.filter((s: GameActivity) => s.status === 'live').length
        setTotalCount(24 + live)
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Approve a pending submission
  const handleApprove = (id: string) => {
    const saved = localStorage.getItem('teamgamex_submissions')
    if (saved) {
      try {
        const parsed: GameActivity[] = JSON.parse(saved)
        const updated = parsed.map((item) => {
          if (item.id === id) {
            return { ...item, status: 'live' as const }
          }
          return item
        })
        localStorage.setItem('teamgamex_submissions', JSON.stringify(updated))
        setSubmissions(updated)
        // Recalculate
        const pending = updated.filter((s) => s.status === 'pending').length
        setPendingCount(5 + pending)
        const live = updated.filter((s) => s.status === 'live').length
        setTotalCount(24 + live)
      } catch (e) {
        console.error(e)
      }
    }
  }

  // Reject/Delete a submission
  const handleReject = (id: string) => {
    const saved = localStorage.getItem('teamgamex_submissions')
    if (saved) {
      try {
        const parsed: GameActivity[] = JSON.parse(saved)
        const updated = parsed.filter((item) => item.id !== id)
        localStorage.setItem('teamgamex_submissions', JSON.stringify(updated))
        setSubmissions(updated)
        // Recalculate
        const pending = updated.filter((s) => s.status === 'pending').length
        setPendingCount(5 + pending)
        const live = updated.filter((s) => s.status === 'live').length
        setTotalCount(24 + live)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <Layout>
      <Head>
        <title>Admin Panel | TeamGameX</title>
      </Head>

      <div className="bg-[#faf6f0] text-slate-850 min-h-screen font-sans flex flex-col md:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 border-r-2 border-slate-800 flex flex-col shrink-0 text-white">
          <div className="p-8 border-b-2 border-slate-800">
            <Link href="/" className="text-3xl font-black tracking-tight text-white flex items-center gap-1 hover:scale-105 transition-transform">
              🎯 TeamGameX
            </Link>
          </div>
          <nav className="flex-1 p-6 space-y-2">
            {[
              { name: 'Dashboard', icon: '📊', active: true },
              { name: 'Videos', icon: '📹' },
              { name: 'Submissions', icon: '📥' },
              { name: 'Tags & filters', icon: '🏷️' },
              { name: 'Gear links', icon: '🔗' },
              { name: 'Analytics', icon: '📈' },
              { name: 'Settings', icon: '⚙️' },
            ].map((item) => (
              <button
                key={item.name}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
                  item.active
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>{item.icon}</span> {item.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Console */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto space-y-12">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Admin Control Center 🎛️</h1>
              <p className="text-slate-500 text-sm font-medium">Verify submissions and moderate public game listings.</p>
            </div>
            <Link
              href="/submit"
              className="bg-indigo-650 hover:bg-indigo-600 text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shrink-0 text-center shadow-md active:scale-95"
            >
              + Add video manual
            </Link>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Total live videos', value: totalCount, subtitle: 'Live in directory', color: 'text-emerald-600 bg-emerald-55/80 border-emerald-100' },
              { title: 'Pending review', value: pendingCount, subtitle: 'Needs verification', color: 'text-amber-600 bg-amber-55/80 border-amber-100' },
              { title: 'Plays this month', value: '1,204', subtitle: '+18% vs last month', color: 'text-blue-600 bg-blue-55/80 border-blue-100' },
              { title: 'Gear clicks', value: '87', subtitle: 'Amazon Associates', color: 'text-rose-600 bg-rose-55/80 border-rose-100' },
            ].map((stat) => (
              <div key={stat.title} className={`bg-white border-2 rounded-3xl p-6 space-y-2 shadow-sm ${stat.color.split(' ')[2]}`}>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">{stat.title}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                </div>
                <span className={`text-[10px] font-bold ${stat.color.split(' ')[0]} ${stat.color.split(' ')[1]} px-2 py-0.5 rounded-lg inline-block`}>
                  {stat.subtitle}
                </span>
              </div>
            ))}
          </div>

          {/* Recent Submissions */}
          <div className="space-y-6">
            <h2 className="text-xl font-black tracking-tight text-indigo-950">Recent Crowdsourced Submissions</h2>
            <div className="bg-white border-2 border-[#e6dec8] rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e6dec8] bg-[#fafaf8] text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="p-6">Game name</th>
                      <th className="p-6">Platform</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6dec8] text-sm font-medium text-slate-700">
                    {/* Default Mock Submissions */}
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-6 font-bold text-slate-900">Human bowling — care home</td>
                      <td className="p-6">
                        <span className="bg-red-100 text-red-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">YouTube</span>
                      </td>
                      <td className="p-6">
                        <span className="bg-teal-100 text-teal-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Movement</span>
                      </td>
                      <td className="p-6">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Live</span>
                      </td>
                      <td className="p-6 text-right text-xs font-bold text-slate-400">Approved</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-6 font-bold text-slate-900">Name that tune — decades</td>
                      <td className="p-6">
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">TikTok</span>
                      </td>
                      <td className="p-6">
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Music</span>
                      </td>
                      <td className="p-6">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">Live</span>
                      </td>
                      <td className="p-6 text-right text-xs font-bold text-slate-400">Approved</td>
                    </tr>

                    {/* Local Submissions */}
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/50">
                        <td className="p-6 font-bold text-slate-900">{sub.title}</td>
                        <td className="p-6">
                          <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase px-2.5 py-1 rounded-md capitalize">{sub.platform}</span>
                        </td>
                        <td className="p-6">
                          <span className="bg-teal-100 text-teal-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md capitalize">{sub.category}</span>
                        </td>
                        <td className="p-6">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                            sub.status === 'live'
                              ? 'bg-emerald-100 text-emerald-800'
                              : sub.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-6 text-right space-x-2">
                          {sub.status === 'pending' && (
                            <button
                              onClick={() => handleApprove(sub.id)}
                              className="bg-emerald-600 hover:bg-emerald-550 text-white text-xs font-black px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleReject(sub.id)}
                            className="bg-rose-600 hover:bg-rose-550 text-white text-xs font-black px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}