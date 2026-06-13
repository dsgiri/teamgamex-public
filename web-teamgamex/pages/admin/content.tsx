// pages/admin/content.tsx
import AdminLayout from 'components/admin/AdminLayout'

export default function ContentEngine() {
  return (
    <AdminLayout>
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Content Engine.</h1>
        <p className="text-slate-400 font-medium text-sm">Adding new "Joy Logic" to the library.</p>
      </header>

      <div className="max-w-4xl bg-white border-2 border-slate-100 rounded-[3.5rem] p-12 shadow-sm">
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Activity Title</label>
              <input type="text" className="w-full h-16 bg-slate-50 rounded-2xl px-6 font-bold outline-none border-2 border-transparent focus:border-blue-600" />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Video ID (Shorts/YT)</label>
              <input type="text" className="w-full h-16 bg-slate-50 rounded-2xl px-6 font-bold outline-none border-2 border-transparent focus:border-blue-600" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">MDS Clinical Objective (Generator Input)</label>
            <textarea className="w-full h-32 bg-slate-50 rounded-2xl p-6 font-bold outline-none border-2 border-transparent focus:border-blue-600" placeholder="Describe the therapeutic benefit..."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Primary Vibe</label>
                <select className="w-full h-16 bg-slate-50 rounded-2xl px-6 font-black uppercase text-[10px] tracking-widest outline-none">
                  <option>Move It!</option>
                  <option>Brain Power</option>
                  <option>Seated Fun</option>
                </select>
             </div>
             <div className="col-span-2 flex items-end">
                <button className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl">
                  Deploy to Library —
                </button>
             </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}