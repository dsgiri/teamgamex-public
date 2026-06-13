import { useUser, SignInButton } from "@clerk/nextjs";
import Script from "next/script";

export default function PricingPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // Show a clean loading state while syncing with Clerk
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="font-black uppercase tracking-widest text-xs animate-pulse">
            Syncing Infrastructure...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-6xl font-black tracking-tighter mb-4">Pricing.</h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            {isSignedIn 
              ? `Active Identity: ${user.primaryEmailAddress?.emailAddress}` 
              : "Identity Verification Required for Checkout"}
          </p>
          <div className="h-px w-12 bg-slate-200"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {!isSignedIn ? (
          /* THE SOFT GATE: Shown only to logged-out users */
          <div className="bg-slate-50 rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200">
            <h2 className="text-3xl font-black mb-4">Member Access Required.</h2>
            <p className="text-slate-500 mb-8 font-bold max-w-md mx-auto leading-relaxed">
              To ensure your facility's subscription is securely linked to your dashboard, please sign in before choosing a plan.
            </p>
            <SignInButton mode="modal" forceRedirectUrl="/pricing">
              <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                Login to View Plans —
              </button>
            </SignInButton>
          </div>
        ) : (
          /* THE REVENUE ENGINE: Shown only after login */
          <>
            {/* Loads the Stripe Table UI */}
            <Script 
              src="https://js.stripe.com/v3/pricing-table.js" 
              strategy="afterInteractive" 
            />
            
            {/* @ts-ignore - Stripe custom components need a TS bypass */}
            <stripe-pricing-table 
              pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
              publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
              // CRITICAL: This connects the payment to your specific user in Supabase
              client-reference-id={user.id} 
            />
          </>
        )}
      </div>
    </div>
  );
}