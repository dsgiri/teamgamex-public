import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { SignOutButton, useUser, useAuth } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isLoaded: isUserLoaded } = useUser()
  const { getToken } = useAuth() // Required to get the Supabase-compatible JWT
  const [primaryRole, setPrimaryRole] = useState<any>(null)
  const [isValidating, setIsValidating] = useState(true)

  useEffect(() => {
    async function fetchClearance() {
      if (!isUserLoaded || !user?.id) return

      try {
        // 1. Get the JWT token from Clerk using the 'supabase' template
        const token = await getToken({ template: 'supabase' })

        // 2. Initialize a secure, token-aware client
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            global: {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          }
        )

        // 3. Query the data (RLS will now pass because of the token)
        const { data, error } = await supabase
          .from('user_roles')
          .select(`
            role_master (
              role_name,
              clearance_level
            )
          `)
          .eq('user_id', user.id)

        if (error) throw error

        if (data && data.length > 0) {
          const roles = data
            .map((d: any) => d.role_master)
            .filter(Boolean)
            .sort((a, b) => b.clearance_level - a.clearance_level)
          
          setPrimaryRole(roles[0] || null)
        }
      } catch (err) {
        console.error("Master Console Sync Error:", err)
      } finally {
        setIsValidating(false)
      }
    }

    fetchClearance()
  }, [user, isUserLoaded, getToken])

  // Nav Items Logic (Filtered by clearance)
  const allNavItems = [
  { name: 'Dashboard', path: '/admin', icon: '📊', minClearance: 60 },
  { name: 'Facility Registry', path: '/admin/facilities', icon: '🏢', minClearance: 80 }, // NEW
  { name: 'Network Waitlist', path: '/admin/subscribers', icon: '👥', minClearance: 60 }, // RENAMED
  { name: 'MDS Logs', path: '/admin/logs', icon: '📝', minClearance: 60 },
  { name: 'Settings', path: '/admin/settings', icon: '⚙️', minClearance: 100 }
];

  const visibleNavItems = isValidating 
    ? allNavItems 
    : allNavItems.filter(item => primaryRole && primaryRole.clearance_level >= item.minClearance)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center font-black">T</div>
            <span className="text-lg font-black tracking-tighter">TGX Admin</span>
          </Link>
          
          <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
             <p className="text-[7px] font-black uppercase tracking-[0.4em] text-blue-400 mb-1">Clearance Protocol</p>
             <p className="text-xs font-black text-white truncate">
                {isValidating ? 'Syncing...' : primaryRole?.role_name || 'Unauthorized'}
             </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-2">
          {visibleNavItems.map((item) => (
            <Link 
              key={item.path} 
              href={isValidating ? '#' : item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                isValidating ? 'opacity-30' :
                router.pathname === item.path ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="text-sm">{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-slate-800">
          <SignOutButton signOutCallback={() => router.push('/')}>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-rose-500">
              Sign Out System —
            </button>
          </SignOutButton>
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}