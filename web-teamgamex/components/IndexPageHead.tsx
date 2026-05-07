import Head from 'next/head'
import * as demo from 'lib/demo.data' // Fallback data
import { IndexPageProps } from 'pages/index'
import { toPlainText } from 'next-sanity'

export default function IndexPageHead({ settings }: { settings: IndexPageProps['settings'] }) {
  // 1. Extract values with total safety
  // We use the optional chaining (?.) and "OR" (||) to prevent the "null" crash
  const title = settings?.title || demo.title || 'TeamGameX'
  const description = settings?.description || demo.description || 'Curated team-building activities.'
  
  // 2. Convert Sanity's complex text to a simple string for the browser tab
  const descriptionText = typeof description === 'string' 
    ? description 
    : Array.isArray(description) 
      ? toPlainText(description) 
      : 'Team-building gear and resources.'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={descriptionText} />
      
      {/* Social Media Preview (OpenGraph) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={descriptionText} />
      
      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
    </Head>
  )
}