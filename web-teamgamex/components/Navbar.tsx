import Link from 'next/link'
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs'
import Container from './BlogContainer'

/**
 * TeamGameX Navigation Engine
 * High-utility bar for Activity Administrators and public visitors.
 */
export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <Container>
        <div className="flex h-20 items-center justify-between">
          
          {/* LOGO SECTION */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:bg-blue-700 transition-colors">
              T
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900">
              TeamGameX<span className="text-blue-600">.</span>
            </span>
          </Link>

          {/* PUBLIC & GROWTH NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">
              Browse Games
            </Link>
            <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
              The Journal
            </Link>
            <Link href="/help" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
              Help Center
            </Link>
          </div>

          {/* USER & PORTAL SECTION */}
          <div className="flex items-center gap-4">
            {!isSignedIn ? (
              <div className="flex items-center gap-6">
                <Link href="/pricing" className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900">
                  Plans
                </Link>
                <SignInButton mode="modal">
                  <button className="text-[10px] font-black bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                    MEMBER LOGIN —
                  </button>
                </SignInButton>
              </div>
            ) : (
              <div className="flex items-center gap-4 border-l pl-4 border-slate-100">
                {/* Dictionary: Activity Administrator Portal Access */}
                <Link 
                  href="/portal" 
                  className="hidden lg:block text-[10px] font-black text-blue-600 hover:text-slate-900 uppercase tracking-widest transition-colors"
                >
                  Activity Administrator
                </Link>
                
                {/* Quick Action Portal Links */}
                <div className="hidden md:flex items-center gap-4 mr-2">
                  <Link href="/calendar" className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest">
                    Calendar
                  </Link>
                </div>

                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  )
}