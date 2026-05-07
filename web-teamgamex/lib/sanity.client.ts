import { createClient, type SanityClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vmnp0kg7'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2023-05-03'
const useCdn = false

// Add this export to fix the "Attempted import error" in your logs
export const getSanityImageConfig = () => ({ projectId, dataset })

import {
  indexQuery,
  type Post,
  postAndMoreStoriesQuery,
  postSlugsQuery,
  type Settings,
  settingsQuery,
} from './sanity.queries'

export function getClient(preview?: { token: string }): SanityClient {
  return createClient({ projectId, dataset, apiVersion, useCdn })
}

export async function getSettings(): Promise<Settings> {
  return await getClient().fetch(settingsQuery)
}

export async function getAllPosts(): Promise<Post[]> {
  return await getClient().fetch(indexQuery)
}

export async function getAllPostsSlugs(): Promise<any[]> {
  const slugs = await getClient().fetch<string[]>(postSlugsQuery)
  // We split the slug string into an array so Next.js [...slug] can read it
  return slugs.map((slug) => ({ 
    slug: slug.split('/').filter(Boolean) 
  }))
}

export async function getPostAndMoreStories(
  slug: string | string[],
  token?: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  // Join the array back into a string if it's a catch-all path
  const slugString = Array.isArray(slug) ? slug.join('/') : slug
  return await getClient(token ? { token } : undefined).fetch(
    postAndMoreStoriesQuery,
    { slug: slugString }
  )
}