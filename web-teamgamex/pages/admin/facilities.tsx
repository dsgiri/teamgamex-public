import { useEffect, useState, useMemo } from 'react'
import AdminLayout from 'components/admin/AdminLayout'
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/nextjs'

export default function FacilityRegistryPage() {
  const { getToken } = useAuth()
  const [facilities, setFacilities] = useState<any[]>([])
  const [types, setTypes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // UI & Filtering States
  const [viewType, setViewType] = useState<'list' | 'tile'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Paging State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 25

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await getToken({ template: 'supabase' })
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          { global: { headers: { Authorization: `Bearer ${token}` } } }
        )

        // 1. Fetch Facility Types for the filter dropdown
        const { data: typeData } = await supabase.from('facility_types').select('*').order('type_name')
        if (typeData) setTypes(typeData)

        // 2. Fetch Registry with HQ and Type Relations
        const { data, error } = await supabase
          .from('facility_registry')
          .select(`
            *,
            facility_hq ( hq_name ),
            facility_types ( type_name, abbreviation )
          `)
          .order('facility_name', { ascending: true })
        
        if (error) throw error
        if (data) setFacilities(data)
      } catch (err) {
        console.error("Registry Sync Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [getToken])

  // Reset paging when filters change
  useEffect(() => { setCurrentPage(1) }, [searchTerm, statusFilter, typeFilter])

  // Advanced Filtering Logic
  const filteredFacilities = useMemo(() => {
    return facilities.filter(f => {
      const matchesSearch = 
        f.facility_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.facility_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.city?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
      const matchesType = typeFilter === 'all' || f.type_id === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    })
  }, [facilities, searchTerm, statusFilter, typeFilter])

  // Pagination Logic
  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage)
  const paginatedFacilities = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredFacilities.slice(start, start + itemsPerPage)
  }, [filteredFacilities, currentPage])

  return (
    <AdminLayout>
      <header className="mb-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 uppercase">Facility Registry</h1>
            <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-widest">
              Asset Database: {facilities.length} physical sites mapped
            </p>
          </div>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">
            + Register Asset
          </button>
        </div>

        {/* --- CONTROL BAR --- */}
        <div className="bg-white p-4 rounded-[2rem] border-2 border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
            <input 
              type="text"
              placeholder="Filter by ID, Name, or City..."
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 transition-all uppercase placeholder:normal-case"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button onClick={() => setViewType('tile')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewType === 'tile' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Tile</button>
            <button onClick={() => setViewType('list')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewType === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>List</button>
          </div>

          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-6 py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${showAdvanced ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-slate-100 text-slate-500 hover:bg-slate-50'}`}
          >
            {showAdvanced ? 'Hide Intelligence —' : 'Advanced Filters +'}
          </button>
        </div>

        {/* --- ADVANCED SEARCH DRAWER --- */}
        {showAdvanced && (
          <div className="mt-4 p-8 bg-slate-900 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-4 duration-300">
            <div>
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Classification</label>
              <select 
                className="w-full bg-slate-800 border-none rounded-xl text-white text-xs font-bold py-4 px-4 focus:ring-2 focus:ring-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Facility Types</option>
                {types.map(t => <option key={t.id} value={t.id}>{t.type_name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block">Operational Status</label>
              <select 
                className="w-full bg-slate-800 border-none rounded-xl text-white text-xs font-bold py-4 px-4 focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Production</option>
                <option value="onboarding">Onboarding Lead</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {/* --- DATA VIEW --- */}
      {viewType === 'list' ? (
        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b-2 border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Physical Asset</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Headquarters</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Location</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={5} className="px-8 py-20 text-center font-black text-slate-200 uppercase tracking-[0.3em]">Querying Registry...</td></tr>
              ) : paginatedFacilities.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="text-[9px] font-black text-blue-600 mb-0.5 tracking-tighter">{f.facility_id}</p>
                    <p className="font-bold text-slate-900 text-sm">{f.facility_name}</p>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    {f.facility_hq?.hq_name || 'Standalone'}
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                      {f.facility_types?.abbreviation || 'N/A'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    {f.city}, {f.state}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-800 tracking-widest">Inspect —</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {paginatedFacilities.map((f) => (
            <div key={f.id} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 hover:border-blue-200 transition-all shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">
                  {f.facility_name.charAt(0)}
                </div>
                <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700">
                  {f.facility_types?.abbreviation || 'N/A'}
                </span>
              </div>
              <p className="text-[9px] font-black text-blue-600 mb-1 tracking-tighter">{f.facility_id}</p>
              <h3 className="text-lg font-black text-slate-900 leading-tight mb-4 h-12 line-clamp-2">{f.facility_name}</h3>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {f.city}, {f.state}
                <button className="text-blue-600 hover:text-blue-800">Manage —</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- INDUSTRIAL PAGINATION --- */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2 pb-20">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-slate-100 bg-white text-slate-400 disabled:opacity-30 hover:bg-slate-50 transition-all">←</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i+1} onClick={() => setCurrentPage(i+1)} className={`w-12 h-12 flex items-center justify-center rounded-xl text-[10px] font-black transition-all ${currentPage === i+1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-blue-200'}`}>{i+1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-slate-100 bg-white text-slate-400 disabled:opacity-30 hover:bg-slate-50 transition-all">→</button>
        </div>
      )}
    </AdminLayout>
  )
}