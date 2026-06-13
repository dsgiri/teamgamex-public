import Link from 'next/link'
import { useRouter } from 'next/router'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'

/**
 * GLOBAL TOPBAR INFRASTRUCTURE
 * Logic: Handles persistent navigation, Identity Verification (Login/Logout), 
 * and branding for Activity Administrators across all pages.
 */
export default function TopBar() {
  const { isSignedIn, isLoaded, user } = useUser()
  const router = useRouter()

  // Helper to highlight active infrastructure zones
  const isActive = (path: string) => router.pathname.startsWith(path)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-5 flex items-center justify-between">
      
      {/* 1. BRAND IDENTITY */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center text-white font-black text-xl transition-transform group-hover:rotate-6 shadow-sm">
          T
        </div>
        <span className="text-xl font-black tracking-tighter text-slate-900">
          TeamGameX<span className="text-blue-600">.</span>
        </span>
      </Link>

      {/* 2. PRIMARY NAVIGATION (Growth & Support) */}
      <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em]">
        <Link 
          href="/blog" 
          className={`transition-colors ${isActive('/blog') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}
        >
          The Journal
        </Link>
        <Link 
          href="/help" 
          className={`transition-colors ${isActive('/help') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}
        >
          Help Center
        </Link>
        <Link 
          href="/support" 
          className={`transition-colors ${isActive('/support') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}
        >
          Support Hub
        </Link>
        <Link 
          href="/pricing" 
          className={`transition-colors ${isActive('/pricing') ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}
        >
          Pricing
        </Link>
      </div>

      {/* 3. IDENTITY & MEMBER ACCESS */}
      <div className="flex items-center gap-4">
        {!isLoaded ? (
          <div className="w-24 h-10 bg-slate-100 animate-pulse rounded-xl" />
        ) : !isSignedIn ? (
          /* LOGGED OUT: Entry Logic */
          <>
            <SignInButton mode="modal">
              <button className="text-[11px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 px-6 py-3 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                Member Login
              </button>
            </SignInButton>
            <Link 
              href="/join" 
              className="hidden sm:block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
            >
              Join the Joy —
            </Link>
          </>
        ) : (
          /* LOGGED IN: Activity Administrator Dashboard Access */
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end border-r pr-6 border-slate-100">
               <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">
                 Activity Administrator
               </span>
               <span className="text-[10px] font-bold text-slate-400 max-w-[120px] truncate">
                 {user.primaryEmailAddress?.emailAddress}
               </span>
            </div>

            <Link 
              href="/portal" 
              className="bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-md"
            >
              Dashboard
            </Link>

            {/* Clerk UserButton handles Native Logout + Profile Logic */}
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10 border-2 border-white shadow-sm",
                  userButtonPopoverCard: "rounded-2xl shadow-2xl border border-slate-50"
                }
              }}
            />
          </div>
        )}
      </div>
    </nav>
  )
}