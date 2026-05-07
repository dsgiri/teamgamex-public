import { createClient, type SanityClient } from 'next-sanity'
// Fallback to direct process.env if the import fails
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vmnp0kg7'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2023-05-03' // Standard for 2026
const useCdn = false // Setting to false ensures we get the freshest data during build

import {
  indexQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  type Settings,
  settingsQuery,
} from './sanity.queries'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  })
  
  if (preview?.token) {
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
    })
  }
  return client
}

export async function getSettings(): Promise<Settings> {
  return await getClient().fetch(settingsQuery)
}

export async function getAllPosts(): Promise<Post[]> {
  return await getClient().fetch(indexQuery)
}

// FIX: This ensures Next.js gets 'slug' instead of 'undefined'
export async function getAllPostsSlugs(): Promise<any[]> {
  const slugs = await getClient().fetch<string[]>(postSlugsQuery)
  // If your file is [slug].tsx, the key MUST be 'slug'
  return slugs.map((slug) => ({ slug }))
}

export async function getPostAndMoreStories(
  slug: string,
  token?: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  return await getClient(token ? { token } : undefined).fetch(
    postAndMoreStoriesQuery,
    { slug }
  )
}