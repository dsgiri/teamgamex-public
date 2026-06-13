import TopBar from './layout/TopBar'
import Footer from './layout/Footer'

interface BlogLayoutProps {
  children: React.ReactNode;
}

/**
 * GLOBAL BLOG LAYOUT
 * This wrapper ensures every page in the TeamGameX infrastructure 
 * maintains the same TopBar (Identity & Navigation) and Footer.
 */
export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* The TopBar is the operational hub for Login/Logout 
        and primary navigation. 
      */}
      <TopBar />
      
      <main className="flex-grow">
        {/* The children represent the unique content of 
           each page (e.g., Blog Index, Help Center). 
        */}
        {children}
      </main>

      {/* The Footer ensures a clean exit with links to 
        Compliance, Terms, and Support Hub. 
      */}
      <Footer />
    </div>
  )
}