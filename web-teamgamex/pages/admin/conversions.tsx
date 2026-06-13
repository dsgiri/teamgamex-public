// pages/admin/conversions.tsx
import AdminLayout from 'components/admin/AdminLayout'

export default function ConversionAdmin() {
  return (
    <AdminLayout>
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Conversion Engine.</h1>
        <p className="text-slate-400 font-medium text-sm">Subscriber to Paid Facility migration.</p>
      </header>

      {/* Conversion Funnel Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Free Subs', val: '1,240' },
          { label: 'Trial Active', val: '42' },
          { label: 'Paid Pro', val: '18' },
          { label: 'Enterprise', val: '3' }
        ].map(stat => (
          <div key={stat.label} className="p-6 bg-white border-2 border-slate-100 rounded-3xl">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Hot Leads Table */}
      <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">High-Intent Leads</h3>
        </div>
        <table className="w-full text-left">
          <thead className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
            <tr>
              <th className="px-8 py-4">Professional</th>
              <th className="px-8 py-4">Engagement</th>
              <th className="px-8 py-4">Last Active</th>
              <th className="px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-bold text-slate-600 divide-y divide-slate-50">
             <tr className="hover:bg-slate-50/50 transition-all">
                <td className="px-8 py-6">Jane Smith <br/><span className="text-[10px] font-medium text-slate-400">Green Oaks Manor</span></td>
                <td className="px-8 py-6"><span className="text-green-600">High (12 saves)</span></td>
                <td className="px-8 py-6 text-slate-400 font-medium">2 hours ago</td>
                <td className="px-8 py-6">
                   <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                     Send Offer
                   </button>
                </td>
             </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}