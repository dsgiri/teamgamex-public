import { SignUp } from "@clerk/nextjs";

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Join the Joy.</h1>
        <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold mt-2">
          Create Facility Manager Account
        </p>
      </header>

      <SignUp 
        routing="hash" 
        signInUrl="/login"
        // Force them to pricing after sign-up to complete the revenue loop
        forceRedirectUrl="/pricing"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-slate-900 hover:bg-blue-600 transition-all text-xs uppercase tracking-widest h-12 rounded-xl',
            card: 'shadow-2xl shadow-slate-200/50 rounded-[2.5rem] border-none p-10',
            headerTitle: 'hidden',
            headerSubtitle: 'hidden'
          }
        }}
      />
    </div>
  );
}