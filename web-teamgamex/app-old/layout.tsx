import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import '../tailwind.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <header className="flex justify-between items-center p-6 border-b bg-white">
            <div className="text-2xl font-bold tracking-tight">
              TeamGameX<span className="text-blue-600">.</span>
            </div>
            
            <nav>
              {/* This shows only if the user is NOT logged in */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all">
                    Member Login
                  </button>
                </SignInButton>
              </SignedOut>

              {/* This shows only if the user IS logged in */}
              <SignedIn>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600">Admin Dashboard</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </nav>
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}