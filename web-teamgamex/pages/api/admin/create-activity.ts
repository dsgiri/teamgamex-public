import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client'
import { getAuth } from '@clerk/nextjs/server'

/**
 * THE CONTENT INJECTION ENGINE
 * This endpoint allows the Admin (Dharmendra) to push new 
 * cognitive games and activities directly into Sanity CMS.
 */

// Private client with write permissions
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false, 
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2023-10-16',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1. Method Gate
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // 2. Identity & Permission Gate
  const { sessionClaims } = getAuth(req)
  const userEmail = (sessionClaims as any)?.email
  
  // CRITICAL: Hard-coded security check for authorized administrator
  if (userEmail !== 'hello.dsgiri@gmail.com') {
    return res.status(403).json({ error: 'Unauthorized Infrastructure Access' })
  }

  try {
    const { title, description, youtubeUrl, vibe } = req.body

    // 3. Payload Validation
    if (!title || !youtubeUrl || !vibe) {
      return res.status(400).json({ error: 'Missing required activity fields (title, youtubeUrl, or vibe)' })
    }

    // 4. Sanity Document Creation
    const result = await writeClient.create({
      _type: 'post',
      title,
      description: description || '',
      youtubeUrl,
      // vibe refers to the document ID of the specific category in your Sanity studio
      vibe: { 
        _type: 'reference', 
        _ref: vibe 
      }, 
      publishedAt: new Date().toISOString(),
    })

    // 5. Success Signal
    return res.status(200).json({ 
      success: true, 
      id: result._id,
      message: 'Activity successfully injected into Sanity library'
    })

  } catch (err: any) {
    console.error('Sanity Injection Error:', err)
    return res.status(500).json({ 
      error: 'Failed to create activity', 
      details: err.message 
    })
  }
}