import Link from 'next/link'

/**
 * GLOBAL FOOTER
 * Industrial-grade navigation anchor for TeamGameX.
 * Organizes links into Platform, Resources, and Infrastructure for clear hierarchy.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          
          {/* 1. BRAND IDENTITY */}
          <div className="col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">T</div>
              <span className="text-xl font-black tracking-tighter text-slate-900">TeamGameX.</span>
            </Link>
            <p className="text-[10px] font-black text-slate-400 leading-relaxed uppercase tracking-[0.2em]">
              Industrial-grade <br /> 
              Cognitive Infrastructure <br /> 
              for Senior Care.
            </p>
          </div>

          {/* 2. PLATFORM NAVIGATION */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Platform</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Browse Games</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/blog" className="text-blue-600 hover:text-blue-700 transition-colors">The Journal</Link></li>
            </ul>
          </div>

          {/* 3. RESOURCES & HELP */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Resources</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500">
              <li><Link href="/help" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link href="/support" className="hover:text-blue-600 transition-colors">Support Hub</Link></li>
              <li><Link href="/mds-infrastructure" className="hover:text-blue-600 transition-colors">MDS Logic v1.2</Link></li>
            </ul>
          </div>

          {/* 4. ACCESS & SOCIAL */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Access</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500">
              <li><Link href="/login" className="hover:text-blue-600 transition-colors">Member Login</Link></li>
              <li><Link href="/portal" className="hover:text-blue-600 transition-colors">Activity Administrator</Link></li>
              <li className="pt-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer">𝕏</div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer">in</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* LEGAL & COMPLIANCE FOOTER */}
        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
            <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-slate-900 transition-colors">Disclaimer</Link>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-200">
              © {currentYear} TeamGameX. Professional Build v1.0.4
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-300">Global Infrastructure Online</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}