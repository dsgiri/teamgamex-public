import { createClient, type SanityClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './sanity.api'
import {
  indexQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  type Settings,
  settingsQuery,
} from './sanity.queries'

// 1. Setup the main connection function
export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
    })
  }
  return client
}

// 2. Helper functions to fetch specific data points

export async function getSettings(): Promise<Settings> {
  return await getClient().fetch(settingsQuery)
}

export async function getAllPosts(): Promise<Post[]> {
  return await getClient().fetch(indexQuery)
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'postId'>[]> {
  const slugs = await getClient().fetch<string[]>(postSlugsQuery)
  return slugs.map((postId) => ({ postId }))
}

export async function getPostAndMoreStories(
  postId: string,
  token?: string | null
): Promise<{ post: Post; morePosts: Post[] }> {
  return await getClient(token ? { token } : undefined).fetch(
    postAndMoreStoriesQuery,
    { postId }
  )
}