import { groq } from 'next-sanity'

// 1. The data fragment: This tells Sanity exactly which fields to send to Next.js
export const postFields = groq`
  _id,
  title,
  description,
  videoUrl,
  postSource,
  playerBenefit,
  shopLink,
  category,
  "postId": postId.current,
  _createdAt,
`

// 2. Homepage Query: Fetches all "videoPost" documents
export const indexQuery = groq`
*[_type == "videoPost"] | order(_createdAt desc) {
  ${postFields}
}
`

// 3. Detail Page Query: Used for individual post pages
export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "videoPost" && postId.current == $postId][0] {
    ${postFields}
  },
  "morePosts": *[_type == "videoPost" && postId.current != $postId] | order(_createdAt desc) [0...2] {
    ${postFields}
  }
}`

// 4. Helper Queries for the client
export const postBySlugQuery = groq`
*[_type == "videoPost" && postId.current == $postId][0] {
  ${postFields}
}
`

export const postSlugsQuery = groq`
*[_type == "videoPost" && defined(postId.current)][].postId.current
`

export const settingsQuery = groq`*[_type == "settings"][0]`

// 5. TypeScript Interfaces: These act as the blueprint for your data
export interface Post {
  _id: string
  title?: string
  description?: string
  videoUrl?: string
  postSource?: string
  playerBenefit?: string
  shopLink?: string
  category?: string
  postId?: string
  _createdAt?: string
}

export interface Settings {
  title?: string
  description?: any[]
}

export interface Author {
  name?: string
  picture?: any
}