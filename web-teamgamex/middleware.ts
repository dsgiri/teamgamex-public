import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  '/', 
  '/pricing',          
  '/login',            
  '/join', 
  '/blog(.*)',         
  '/help(.*)',         
  '/posts(.*)', 
  '/mds-infrastructure', 
  '/privacy', 
  '/terms', 
  '/disclaimer',
  '/api/join',
  '/api/webhooks(.*)' 
]);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  if (!userId) {
    await auth.protect();
    return NextResponse.next();
  }

  // MASTER CONSOLE ACCESS CONTROL
  if (isAdminRoute(request)) {
    try {
      /**
       * Relational Security Check:
       * Queries the user_roles table and joins role_master to verify the 'zone'.
       * Using direct REST call for Edge Middleware compatibility.
       */
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/user_roles?user_id=eq.${userId}&select=role_master(zone)`,
        {
          headers: {
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          },
        }
      );

      const data = await response.json();
      
      // Verification: Does the user have ANY role where zone is 'internal'?
      const hasInternalAccess = data?.some(
        (entry: any) => entry.role_master?.zone === 'internal'
      );

      if (!hasInternalAccess) {
        // Unauthorized access to Master Console; redirecting to Facility Portal
        return NextResponse.redirect(new URL('/portal', request.url));
      }
    } catch (error) {
      console.error("Infrastructure Security Breach/Error:", error);
      return NextResponse.redirect(new URL('/portal', request.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};