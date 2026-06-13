// pages/admin/index.tsx
import AdminLayout from 'components/admin/AdminLayout'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Members', value: '1,248', change: '+12%', color: 'blue' },
    { label: 'Avg Participation', value: '87%', change: '+2%', color: 'green' },
    { label: 'MDS Logs Generated', value: '4,102', change: '+85', color: 'slate' }
  ]

  return (
    <AdminLayout>
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">System Overview</h1>
        <p className="text-slate-400 font-medium text-sm">Real-time engagement metrics.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="p-10 bg-white border-2 border-slate-100 rounded-[3rem] shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{stat.label}</p>
            <div className="flex items-baseline gap-4">
              <p className="text-5xl font-black tracking-tighter text-slate-900">{stat.value}</p>
              <p className={`text-xs font-black ${stat.color === 'blue' ? 'text-blue-600' : 'text-green-600'}`}>
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 bg-slate-900 rounded-[3.5rem] p-12 text-white flex items-center justify-center border-2 border-slate-800">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Participation Trend Graph</p>
        </div>
        <div className="h-96 bg-white border-2 border-slate-100 rounded-[3.5rem] p-12 flex items-center justify-center">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Vibe Distribution Chart</p>
        </div>
      </div>
    </AdminLayout>
  )
}