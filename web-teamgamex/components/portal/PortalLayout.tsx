import Link from 'next/link'
import { useRouter } from 'next/router'
import { UserButton, SignOutButton } from '@clerk/nextjs'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  
  const menu = [
    { name: 'Dashboard', path: '/portal', icon: '🏠' },
    { name: 'Game Feed', path: '/portal/feed', icon: '🎮' },
    { name: 'Schedule', path: '/portal/calendar', icon: '🗓️' },
    { name: 'MDS Logs', path: '/portal/mds-logs', icon: '📋' },
    { name: 'Billing', path: '/portal/billing', icon: '💳' },
    { name: 'Settings', path: '/portal/settings', icon: '⚙️' },
    { name: 'Profile', path: '/portal/profile', icon: '👤' }
  ]

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* SIDE NAV INFRASTRUCTURE */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-100 flex flex-col transition-all sticky top-0 h-screen">
        
        {/* PORTAL HEADER */}
        <div className="p-8 mb-4">
          <Link href="/portal" className="flex items-center gap-3 group">
             <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black group-hover:bg-blue-600 group-hover:scale-110 transition-all shadow-lg shadow-blue-500/10">X</div>
             <div className="hidden lg:block">
                <h2 className="text-xs font-black tracking-tighter text-slate-900 leading-none uppercase">TGX Portal</h2>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-600 mt-1">Command Center</p>
             </div>
          </Link>
        </div>

        {/* NAVIGATION ENGINE */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
          {menu.map(item => (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                router.pathname === item.path 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* FOOTER: IDENTITY, SYSTEM STATUS & LOGOUT */}
        <div className="p-6 border-t border-slate-50 space-y-6">
            {/* User Profile Info */}
            <div className="flex justify-center lg:justify-start items-center gap-4">
              <UserButton afterSignOutUrl="/" />
              <div className="hidden lg:block">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Active Administrator</p>
                  <p className="text-[10px] font-bold text-slate-900 truncate max-w-[120px]">Facility Console</p>
              </div>
            </div>

            {/* EXPLICIT SYSTEM LOGOUT */}
            <div className="pt-2">
              <SignOutButton signOutCallback={() => router.push('/')}>
                <button className="w-full flex items-center justify-center lg:justify-start gap-4 p-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all group">
                  <span className="text-lg group-hover:rotate-12 transition-transform">🚪</span>
                  <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">Sign Out System</span>
                </button>
              </SignOutButton>
            </div>
            
            {/* Health Monitor */}
            <div className="hidden lg:block pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 <p className="text-[8px] font-black uppercase tracking-widest text-slate-300">Operational Integrity Secure</p>
              </div>
            </div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}