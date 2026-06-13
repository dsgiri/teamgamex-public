import { videoPost } from './videoPost'
import { article } from './article'

// Exporting all schema types to the Sanity Studio
export const schemaTypes = [
  videoPost, 
  article // Now Activity Administrators can create blog and help content
]