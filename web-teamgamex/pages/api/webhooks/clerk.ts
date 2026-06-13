import { Webhook } from 'svix'
import { buffer } from 'micro'
import { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from 'lib/supabaseAdmin'

// CRITICAL: Disable the default body parser so Svix can verify the raw signature
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests from Clerk
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local')
  }

  // Get the headers for security verification
  const svix_id = req.headers["svix-id"] as string
  const svix_timestamp = req.headers["svix-timestamp"] as string
  const svix_signature = req.headers["svix-signature"] as string

  // If headers are missing, the request is not from Clerk
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Missing svix headers' })
  }

  // Get the raw body as a string
  const payload = (await buffer(req)).toString()
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: any

  // Verify the payload using the secret
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    })
  } catch (err) {
    console.error('Webhook verification failed:', err)
    return res.status(400).json({ error: 'Webhook verification failed' })
  }

  // HANDLE USER CREATION
  // This logic syncs the Clerk User ID to your Supabase Profiles table
  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data
    const email = email_addresses[0]?.email_address
    const fullName = `${first_name || ''} ${last_name || ''}`.trim()

    const { error } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: id,
        email: email,
        admin_name: fullName,
        subscription_status: 'trial', // Default all new signups to trial
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Supabase Sync Error:', error)
      return res.status(500).json({ error: 'Database sync failed' })
    }
    
    // Success log
    console.log(`Identity Sync Complete: ${email || 'No Email Provided'} (ID: ${id})`)
  }

  return res.status(200).json({ response: 'Success' })
}