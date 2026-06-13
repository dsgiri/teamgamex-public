import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  // FIX: Pointing to /portal (index.tsx) instead of /portal/dashboard
  const redirectPath = (router.query.redirect_url as string) || "/portal";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Welcome Back.</h1>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold mt-2">
          Identity Verification Required
        </p>
      </header>
      
      <SignIn 
        routing="hash" 
        signUpUrl="/join"
        forceRedirectUrl={redirectPath} 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-slate-900 hover:bg-blue-600 transition-all text-xs uppercase tracking-widest h-12 rounded-xl',
            card: 'shadow-2xl shadow-slate-200/50 rounded-[2.5rem] border-none p-10',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden',
            footerActionLink: 'text-blue-600 font-bold hover:text-blue-800'
          }
        }}
      />
    </div>
  );
}