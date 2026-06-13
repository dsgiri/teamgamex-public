// web-teamgamex/pages/_app.tsx
import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import './globals.css' // Direct local import for maximum stability
import AccessibilityWidget from 'components/AccessibilityWidget'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      {/* Google Analytics Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-0PMD2DNSGL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0PMD2DNSGL');
        `}
      </Script>

      <div className="antialiased">
        <Component {...pageProps} />
        <AccessibilityWidget />
      </div>
    </ClerkProvider>
  )
}

export default MyApp