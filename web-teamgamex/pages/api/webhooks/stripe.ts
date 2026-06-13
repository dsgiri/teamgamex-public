// pages/api/webhooks/stripe.ts
import { buffer } from 'micro'
import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { supabaseAdmin } from 'lib/supabaseAdmin' // Create this with your Service Role Key

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const config = {
  api: {
    bodyParser: false, // Stripe requires the raw body to verify the signature
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    // Handle the specific payment event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const userEmail = session.customer_email
      
      if (userEmail) {
        // Update Supabase using the Service Role Key (Bypassing RLS for admin action)
        const { error } = await supabaseAdmin
          .from('profiles')
          .update({ 
            subscription_status: 'active',
            updated_at: new Date().toISOString() 
          })
          .eq('email', userEmail)

        if (error) console.error('Supabase Update Error:', error)
        else console.log(`Infrastructure Unlock: ${userEmail} is now PRO.`)
      }
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}