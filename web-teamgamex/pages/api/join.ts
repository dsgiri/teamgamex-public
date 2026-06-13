// pages/api/join.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Preventive check to stop the crash before it happens
if (!supabaseUrl || !supabaseServiceKey) {
  console.error("CRITICAL: Supabase environment variables are missing.")
}

const supabaseAdmin = createClient(
  supabaseUrl || '', 
  supabaseServiceKey || ''
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check if the client initialized correctly
  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ 
      error: "Infrastructure Error", 
      details: "Database keys are not configured in .env.local" 
    })
  }

  const { name, email } = req.body

  try {
    const { error } = await supabaseAdmin
      .from('subscribers')
      .insert([{ full_name: name, email: email, source: 'join_page' }])

    if (error) throw error
    return res.status(200).json({ message: 'Success' })
  } catch (error: any) {
    return res.status(500).json({ message: error.message })
  }
}