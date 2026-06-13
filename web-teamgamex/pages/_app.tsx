// web-teamgamex/pages/_app.tsx
import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import './globals.css' // Direct local import for maximum stability

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className="antialiased">
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  )
}

export default MyApp